import { Injectable, HttpStatus, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserProfileDto, UserEmailOrPhoneOTPResponseDto } from './dto/update-user-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { comparePassword, hashPassword } from 'src/common/utils/hash.util';
import { ValidationException, BusinessException } from 'src/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { UploadService } from 'src/common/services/upload.service';
import { AuthService } from 'src/core';
import { OtpFor } from 'src/common/enums/all-enum';
import { otpRequestModelDto } from 'src/core/auth/dto/auth.schema';
import { RedisService } from 'src/core/redis/redis.service';
import { otpObjectDto, UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { TransactionService as UserTransactionService } from 'src/modules/transaction/transaction.service';

import { User } from '@prisma/client';
import { EncryptionService } from 'src/common/services/EncryptionService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserProfileService {
  constructor(private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly transactionService: UserTransactionService,
    private readonly cryptoService: EncryptionService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * Get user profile by user ID with custom response format
   * Includes related country, state, and wallet balance data
   * @param userId - The ID of the user
   * @returns Customized user profile response
   * @throws BusinessException if user profile or wallet not found
   */
  async getUserProfile(userId: string): Promise<UserProfileResponseDto> {
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }

    // Single optimized query: fetch profile + user + wallet + country + state + role
    const userProfile = await this.prismaService.userProfile.findUnique({
      where: { userId },
      include: {
        country: true,
        state: true,
        user: {
          select: {
            email: true,
            emailVerified: true,
            phoneNumber: true,
            phoneVerified: true,
            toinAccountNumber: true,
            userWallet: {
              select: {
                walletBalance: true,
              },
            },
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }

    // Build custom response DTO
    const response: UserProfileResponseDto = {
      id: userProfile.id,
      fullName: `${userProfile.firstName ?? ''} ${userProfile.lastName ?? ''}`.trim(),
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.user.email,
      isEmailVerified: userProfile.user.emailVerified,
      phoneNumber: userProfile.user.phoneNumber,
      isPhoneNumberVerified: userProfile.user.phoneVerified,
      // relative path to full path
      profileImageUrl: userProfile.profileImageUrl,
      media: await this.uploadService.getMediaDetails(userProfile.profileImageUrl),

      addressLine1: userProfile.addressLine1,
      city: userProfile.city,
      zipCode: userProfile.zipCode,
      userId: userProfile.userId,
      toinAccountNumber: userProfile.user.toinAccountNumber,
      walletBalance: userProfile.user.userWallet?.walletBalance
        ? Number(userProfile.user.userWallet.walletBalance)
        : 0,
      country: userProfile.country,
      state: userProfile.state,
      role: userProfile.user.userRoles[0]?.role?.name || null,
    };

    return response;
  }

  /**
   * Check if user profile exists
   * @param userId - The ID of the user
   * @returns Boolean indicating if profile exists
   */
  async userProfileExists(userId: string): Promise<boolean> {
    const profile = await this.prismaService.userProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    return !!profile;
  }

  /**
   * Get user profile with minimal data
   * @param userId - The ID of the user
   * @returns User profile with limited fields for performance
   */
  async getUserProfileMinimal(userId: string) {
    return await this.prismaService.userProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImageUrl: true,
      },
    });
  }

  /**
   * Update user profile by user ID
   * @param userId - The ID of the user
   * @param updateProfileDto - Data to update
   * @returns Updated user profile response
   * @throws BusinessException if user profile not found
   */
  async updateUserProfile(
    userId: string,
    updateProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponseDto> {
    if (!userId) {
      throw new BusinessException('User ID is required', HttpStatus.BAD_REQUEST);
    }

    // Check if profile exists and include user for email/phone comparison
    const existingProfile = await this.prismaService.userProfile.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!existingProfile) {
      throw new BusinessException('User profile not found', HttpStatus.NOT_FOUND);
    }

    // Prepare update data for UserProfile
    const userProfileUpdateData: any = {
      firstName: updateProfileDto.firstName,
      lastName: updateProfileDto.lastName,
      addressLine1: updateProfileDto.addressLine1,
      addressLine2: updateProfileDto.addressLine2,
      city: updateProfileDto.city,
      zipCode: updateProfileDto.zipCode,
      profileImageUrl: updateProfileDto.profileImageUrl,
      bio: updateProfileDto.bio,
      updatedAt: new Date(),
    };

    if (updateProfileDto.countryId && updateProfileDto.countryId.trim() !== '') {
      userProfileUpdateData.countryId = updateProfileDto.countryId;
    }

    if (updateProfileDto.stateId && updateProfileDto.stateId.trim() !== '') {
      userProfileUpdateData.stateId = updateProfileDto.stateId;
    }

    // Prepare update data for User
    const userUpdateData: any = {
      updatedAt: new Date(),
    };

    // Check email uniqueness if provided and different
    if (updateProfileDto.email && updateProfileDto.email !== existingProfile.user?.email) {
      // Check change limit
      const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
      if ((existingProfile.user?.emailChangingCount || 0) >= maxEmailChanges) {
        throw new ValidationException({
          email: ['Email change limit exceeded. Please contact support for assistance.'],
        });
      }

      const emailExists = await this.prismaService.user.findFirst({
        where: {
          email: updateProfileDto.email,
          deletedAt: null,
          id: { not: userId },
        },
      });

      if (emailExists) {
        throw new ValidationException({
          email: ['Email is already registered'],
        });
      }
      userUpdateData.email = updateProfileDto.email;
      userUpdateData.emailChangingCount = (existingProfile.user?.emailChangingCount || 0) + 1;
    }

    // Check phone uniqueness if provided and different
    if (updateProfileDto.phoneNumber && updateProfileDto.phoneNumber !== existingProfile.user?.phoneNumber) {
      // Check change limit
      const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
      if ((existingProfile.user?.phoneChangingCount || 0) >= maxPhoneChanges) {
        throw new ValidationException({
          phoneNumber: ['Phone number change limit exceeded. Please contact support for assistance.'],
        });
      }

      const phoneExists = await this.prismaService.user.findFirst({
        where: {
          phoneNumber: updateProfileDto.phoneNumber,
          deletedAt: null,
          id: { not: userId },
        },
      });

      if (phoneExists) {
        throw new ValidationException({
          phoneNumber: ['Phone number is already registered'],
        });
      }
      userUpdateData.phoneNumber = updateProfileDto.phoneNumber;
      userUpdateData.phoneChangingCount = (existingProfile.user?.phoneChangingCount || 0) + 1;
    }

    // Use transaction to update both UserProfile and User
    const [updatedProfile, updatedUser] = await this.prismaService.$transaction([
      this.prismaService.userProfile.update({
        where: { userId },
        data: userProfileUpdateData,
        include: {
          country: true,
          state: true,
        },
      }),
      this.prismaService.user.update({
        where: { id: userId },
        data: userUpdateData,
        select: {
          email: true,
          emailVerified: true,
          phoneNumber: true,
          phoneVerified: true,
          toinAccountNumber: true,
          userWallet: { select: { walletBalance: true } },
        },
      }),
    ]);

    // Build custom response DTO
    const response: UserProfileResponseDto = {
      id: updatedProfile.id,
      fullName: `${updatedProfile.firstName ?? ''} ${updatedProfile.lastName ?? ''}`.trim(),
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      email: updatedUser.email,
      isEmailVerified: updatedUser.emailVerified,
      phoneNumber: updatedUser.phoneNumber,
      isPhoneNumberVerified: updatedUser.phoneVerified,
      profileImageUrl: updatedProfile.profileImageUrl,
      media: await this.uploadService.getMediaDetails(updatedProfile?.profileImageUrl),
      addressLine1: updatedProfile.addressLine1,
      city: updatedProfile.city,
      zipCode: updatedProfile.zipCode,
      userId: updatedProfile.userId,
      toinAccountNumber: updatedUser.toinAccountNumber,
      walletBalance: updatedUser.userWallet?.walletBalance
        ? Number(updatedUser.userWallet.walletBalance)
        : 0,
      country: updatedProfile.country,
      state: updatedProfile.state,
    };

    return response;
  }

  /**
   * Change user password
   * 
   * Validation flow:
   * 1. DTO validators check format and matching
   * 2. Service validates business rules (current password correct, new password different)
   * 3. Password is hashed and saved to database
   * 
   * Throws ValidationException for:
   * - Current password incorrect
   * - New password same as current password
   * 
   * Throws BusinessException for:
   * - User not found (404)
   * 
   * @param userId - The ID of the user
   * @param changePasswordDto - Current and new password data (validated by DTO)
   * @returns Promise<void>
   * @throws ValidationException if validation fails
   * @throws BusinessException if user not found
   */
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    if (!userId) {
      throw new BusinessException('User ID is required', HttpStatus.BAD_REQUEST);
    }

    // Fetch user with password hash
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        PasswordHashed: true,
      },
    });

    if (!user) {
      throw new BusinessException('User not found', HttpStatus.NOT_FOUND);
    }

    // Verify current password is correct
    const isCurrentPasswordValid = await comparePassword(
      changePasswordDto.currentPassword,
      user.PasswordHashed,
    );

    if (!isCurrentPasswordValid) {
      throw new ValidationException({
        currentPassword: ['Current password is incorrect'],
      });
    }

    // Check if new password is the same as current password
    const isNewPasswordSame = await comparePassword(changePasswordDto.newPassword, user.PasswordHashed);

    if (isNewPasswordSame) {
      throw new ValidationException({
        newPassword: ['New password must be different from current password'],
      });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(changePasswordDto.newPassword);

    // Update user password
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        PasswordHashed: hashedNewPassword,
        updatedAt: new Date(),
      },
    });
  }



  /**
   *  Upload user profile image
   * @param userId 
   * @param profileImageUrl 
   * @returns UserProfileResponseDto
   */
  async uploadProfileImage(userId: string, profileImageUrl: string): Promise<UserProfileResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId, deletedAt: null },
      include: {
        userProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete old profile image if exists
    if (user.userProfile?.profileImageUrl) {
      try {
        await this.uploadService.deleteFile(
          user.userProfile.profileImageUrl,
        );
      } catch (error) {
        console.error('Failed to delete old profile image:', error);
      }
    }

    // Update or create profile with new image URL
    let updatedUser;

    if (user.userProfile) {
      updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          userProfile: {
            update: {
              profileImageUrl,
              updatedBy: userId,
            },
          },
        },
        include: {
          userProfile: {
            include: {
              country: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
              state: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      });
    } else {
      updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          userProfile: {
            create: {
              profileImageUrl,
              createdBy: userId,
            },
          },
        },
        include: {
          userProfile: {
            include: {
              country: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
              state: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      });
    }

    let updatedUserDto = plainToInstance(UserProfileResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
    updatedUserDto.media = await this.uploadService.getMediaDetails(updatedUser.userProfile?.profileImageUrl);

    return updatedUserDto;
  }


  async deleteProfileImage(userId: string): Promise<UserProfileResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId, deletedAt: null },
      include: {
        userProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.userProfile?.profileImageUrl) {
      throw new BadRequestException('No profile image to delete');
    }

    // Delete the image file
    await this.uploadService.deleteFile(
      user.userProfile.profileImageUrl,
    );

    // Update profile to remove image URL
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        userProfile: {
          update: {
            profileImageUrl: null,
            updatedBy: userId,
          },
        },
      },
    });

    return plainToInstance(UserProfileResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }



  async verifyProfilePhoneOrEmail(emailOrPhone: string, userId: string): Promise<UserEmailOrPhoneOTPResponseDto> {

    const user = await this.prismaService.user.findFirst({
      where: { id: userId }
    });

    if (!user) {
      throw new ValidationException({ identifier: ['User not found.'] });
    }

    // Check change limits early
    if (emailOrPhone.includes('@')) {
      const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
      if ((user.emailChangingCount || 0) >= maxEmailChanges) {
        throw new ValidationException({
          identifier: ['Email change limit exceeded. Please contact support for assistance.'],
        });
      }
    } else {
      const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
      if ((user.phoneChangingCount || 0) >= maxPhoneChanges) {
        throw new ValidationException({
          identifier: ['Phone number change limit exceeded. Please contact support for assistance.'],
        });
      }
    }

    // if (!emailOrPhone.includes('@')) {
    //   if (!emailOrPhone.startsWith('88')) {
    //     emailOrPhone = '88' + emailOrPhone;
    //   }
    // }

    const uniqueEmailOrPhone = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      },
    });

    if (uniqueEmailOrPhone) {
      throw new ValidationException({ identifier: [`User is found with this ${(emailOrPhone.includes('@') ? 'email' : 'phone')}.`] });
    }
    // if we get email then we send otp to Phone else we send otp to email for cross verification
    let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    const regType = emailOrPhone.includes('@') ? 'phone' : 'email';
    let key = await this.authService.sendOtpToUser(userResponseDto, regType, OtpFor.VerifiedProfilePhoneOrEmail, emailOrPhone);
    return {
      uniqueKey: key,
      identifier: regType,
      emailOrPhone: this.cryptoService.maskValue(emailOrPhone.includes('@') ? user.phoneNumber : user.email, regType),
    } as UserEmailOrPhoneOTPResponseDto;
  }

  async otpValidationForProfilePhoneOrEmail(requestDto: otpRequestModelDto): Promise<UserEmailOrPhoneOTPResponseDto> {

    requestDto.otpUniqueKey = this.cryptoService.decrypt(requestDto.otpUniqueKey);

    const { user, param } = await this.verifyProfileOTP(requestDto);

    const regType = param.includes('@') ? 'email' : 'phone';
    if (param.includes('@')) {
      user.email = param;
    } else {
      user.phoneNumber = param;
    }

    let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    let key = await this.authService.sendOtpToUser(userResponseDto, regType, OtpFor.VerifiedProfilePhoneOrEmail, param);
    return {
      uniqueKey: key,
      identifier: regType,
      emailOrPhone: this.cryptoService.maskValue(param, regType),
    } as UserEmailOrPhoneOTPResponseDto;

  }


  async verifyProfilePhoneOrEmailCrossChecking(requestDto: otpRequestModelDto): Promise<string> {

    requestDto.otpUniqueKey = this.cryptoService.decrypt(requestDto.otpUniqueKey);

    const { user, param } = await this.verifyProfileOTP(requestDto);
    
    // OTP was valid, optionally delete it from Redis
    await this.redisService.del(requestDto.otpUniqueKey);

    if (param.includes("@")) {
      const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
      if ((user.emailChangingCount || 0) >= maxEmailChanges) {
        throw new ValidationException({
          emailOrPhone: ['Email change limit exceeded. Please contact support for assistance.'],
        });
      }
    }
    else {
      const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
      if ((user.phoneChangingCount || 0) >= maxPhoneChanges) {
        throw new ValidationException({
          emailOrPhone: ['Phone change limit exceeded. Please contact support for assistance.'],
        });
      }
    }

    if (!user.isKycVerified) {

      await this.transactionService.createKYCBonusTransaction(user.id);

      await this.prismaService.user.update({
        where: { id: user.id },
        data: { isKycVerified: true },
      });

      return "KYC is Completed";
    } else {
      if (param.includes('@')) {
        await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            email: param,
            emailChangingCount: user.emailChangingCount + 1,
          },
        });
      } else {
        await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            phoneNumber: param,
            phoneChangingCount: user.phoneChangingCount + 1,
          },
        });
      }


      return `${param.includes('@') ? 'Email' : 'Phone'} is changed successfully`;
    }
  }


  async verifyProfileOTP(requestDto: otpRequestModelDto): Promise<{ user: User, param: string }> {
    // OTP is correct, proceed to fetch user
    const splitKey = requestDto.otpUniqueKey.split("_");
    const emailOrPhone = splitKey[0].split(":")[1];
    const userId = splitKey[2];
    const otpFor = splitKey[3];
    const param = splitKey[4];

    const otpData = await this.redisService.get<otpObjectDto>(requestDto.otpUniqueKey);

    if (!otpData) {
      throw new ValidationException({
        otp: ['OTP has expired or is invalid. Please request a new OTP.'],
      });
    }

    // Convert otpFailCount to number for comparison
    const maxFailCount = Number(otpData.otpFailCount || 5);


    // OTP mismatch
    if (otpData.otp.toString() !== requestDto.otp.toString()) {
      otpData.otpFailCount = (otpData.otpFailCount || 0) + 1;

      // Save updated fail count back to Redis
      await this.redisService.set(requestDto.otpUniqueKey, otpData, 300);

      if (otpData.otpFailCount >= maxFailCount) {

        throw new ValidationException({
          otp: ['Maximum OTP attempts exceeded. Please request a new OTP.'],
        })
      }

      throw new ValidationException({
        otp: ['Invalid OTP. Please try again.'],
      })
    }

    let user = await this.prismaService.user.findFirst({
      where: {
        id: userId
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (emailOrPhone == param) {

      user = await this.prismaService.user.findFirst({
        where: {
          id: userId,
          OR: [
            { email: param },
            { phoneNumber: param },
          ],
        },
      });

      if (user) {
        throw new UnauthorizedException(`User already exists with this ${param.includes('@') ? 'email' : 'phone'}`);
      }

      if (param.includes('@')) {
        user = await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            email: param,
            emailVerified: true,
            emailVerifiedAt: new Date(),
          }
        });
      }
      else {
        user = await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            phoneNumber: param,
            phoneVerified: true,
            phoneVerifiedAt: new Date(),
          }
        });
      }
    }
    return { user, param };
  }







}

