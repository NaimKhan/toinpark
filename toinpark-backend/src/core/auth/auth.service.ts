import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '../../config/config.service';
import { comparePassword, hashPassword } from '../../common/utils/hash.util';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { ChangePasswordRequestDto, RegisterDto, otpRequestModelDto } from './dto/auth.schema';
import { otpObjectDto, UserRegistrationResponseDto, UserResponseDto } from './dto/auth.dto';
import { RedisService } from "../redis/redis.service";
import { ValidationException } from 'src/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { UnverifiedAccountException } from 'src/common/exceptions/unverified-account.exception';
import { NotificationType, User } from '@prisma/client';
import { LoginResponseDto } from './dto/login-response.dto';
import { OtpFor } from 'src/common/enums/all-enum';
import { TransactionService as UserTransctionService } from 'src/modules/transaction/transaction.service';
import { ReferralHistoryService } from 'src/modules/user/referral-history/referral-history.service';
import { isEmpty } from 'class-validator';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../sms/sms.service';
import { EncryptionService } from 'src/common/services/EncryptionService';
import { NotificationService } from '../notification/notification.service';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly transactionService: UserTransctionService,
    private readonly referralService: ReferralHistoryService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
    private readonly cryptoService: EncryptionService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) { }


  /**
   * 
   * @param identifier 
   * @param password 
   * @returns LoginResponseDto
   */
  async login(identifier: string, password: string): Promise<LoginResponseDto> {
    identifier = identifier.startsWith("+") ? identifier.substring(1) : identifier;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phoneNumber: identifier },
          { username: identifier },
        ],
      },
      include: {
        referrer: {
          select: {
            id: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        userProfile: {
          select: {
            firstName: true,
            lastName: true,
          },
        }
      }
    });


    if (!user) {

      this.logger.warn(`Login attempt failed: User not found for identifier ${identifier}`);
      throw new ValidationException({
        identifier: ['Credential Mismatch'],
      });
    }

    if (user.status !== 'ACTIVE') {
      this.logger.warn(`Login attempt failed: User account is ${user.status} for identifier ${identifier}`);
      throw new BadRequestException(`User account is ${user.status}. Please contact support.`);
    }


    if (user.lockoutEnabled === true && user.lockoutEnd > new Date()) {
      this.logger.warn(`Login attempt failed: Account is locked until ${user.lockoutEnd} for identifier ${identifier}`);
      throw new ValidationException({
        password: ['Account is locked. Please try again later.'],
      });
    }


    const isPasswordValid = await comparePassword(password, user.PasswordHashed);
    if (!isPasswordValid) {

      if (user.accessFailedCount <= this.configService.maxWrongPasswordFailCount) {

        await this.prisma.user.update({
          where: { id: user.id },
          data: { accessFailedCount: user.accessFailedCount + 1 },
        });
      }
      else {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { lockoutEnabled: true, lockoutEnd: new Date(Date.now() + this.configService.lockoutDurationMinutes * 60 * 1000) },
        });
      }

      this.logger.warn(`Login attempt failed: max access failed count expired for identifier ${identifier}`);

      throw new ValidationException({
        password: ['Credential Mismatch'],
      });
    }
    else {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { accessFailedCount: 0 },
      });
    }

    let identifierType = identifier.includes("@") ? "email" : "phone";
    let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    if ((identifierType === "email" && !user.emailVerified) || (identifierType === "phone" && !user.phoneVerified)) {
      const otpUniqueKey = await this.sendOtpToUser(userResponseDto, identifierType, OtpFor.VerifiedRegistrationPhoneOrEmail, null, 'Verify your account', 'Your OTP code for verification is');

      this.logger.log(`Login attempt requires verification: Unverified ${identifierType} for identifier ${identifier}`);

      throw new UnverifiedAccountException(
        otpUniqueKey,
        identifierType,
        identifier,
      );
    }

    // Get user role (if exists)
    const roleObj = await this.prisma.roles.findFirst({
      where: {
        userRoles: {
          some: { userId: user.id },
        },
      },
    });

    // Attach role to user (null if no role assigned)
    user.userRole = roleObj?.name || null;

    return this.createLoginToken(user, user.referrer);
  }


  async loginAsUser(userId: string): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        referrer: {
          select: {
            id: true,
            userProfile: { select: { firstName: true, lastName: true } },
          },
        },
        userProfile: { select: { firstName: true, lastName: true } },
      },
    });

    if (!user) {
      throw new ValidationException({ userId: ['User not found'] });
    }

    if (user.status !== 'ACTIVE') {
      throw new BadRequestException(`User account is ${user.status}. Please contact support.`);
    }

    // attach role same as your login()
    const roleObj = await this.prisma.roles.findFirst({
      where: {
        userRoles: { some: { userId: user.id } },
      },
    });

    user.userRole = roleObj?.name || null;

    // return EXACT same response as login
    return this.createLoginToken(user as any, user.referrer);
  }


  /**
   * 
   * @param reqRegisterDto 
   * @returns UserRegistrationResponseDto
   */
  async register(reqRegisterDto: RegisterDto): Promise<UserRegistrationResponseDto> {
    const { identifierType, identifier, password, firstName, lastName } = reqRegisterDto;

    // Determine registration type
    const regType = identifierType.toLowerCase(); // "email" or "phone"
    const isEmail = regType === 'email';
    const isPhone = regType === 'phone';

    // ✅ Normalize phone (if applicable)
    const phone = isPhone
      ? identifier.startsWith('+')
        ? identifier.substring(1)
        : identifier
      : null;

    const email = isEmail ? identifier : null;

    // ✅ Validate uniqueness (custom method)
    await this.validateUniqueEmailOrPhone({ email, phone }, regType);

    let userByReferralCode;
    if (reqRegisterDto.referralCode != null && !isEmpty(reqRegisterDto.referralCode)) {

      userByReferralCode = await this.prisma.user.findFirst({
        where: { referralCode: reqRegisterDto.referralCode }
      });

      if (userByReferralCode == null) {
        this.logger.warn(`Registration attempt failed: Invalid Referral Code - ${reqRegisterDto.referralCode}`);
        throw new BadRequestException('Invalid Referral Code.');
      }
    }

    // ✅ Start transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // 1️⃣ Hash password
      const hashedPassword = await hashPassword(password);

      // 2️⃣ Generate unique identifiers
      const toinAccountNumber = `TOI${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const userReferralCode = `REF${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      // 3️⃣ Find member role
      const memberRole = await tx.roles.findFirst({
        where: { name: 'Member' },
      });

      if (!memberRole) {
        this.logger.error('Member Role not found during registration.');
        throw new BadRequestException('Member Role not found. Please contact admin.');
      }

      // 4️⃣ Create user
      const user = await tx.user.create({
        data: {
          email,
          phoneNumber: phone,
          username: toinAccountNumber,
          PasswordHashed: hashedPassword,
          status: 'ACTIVE',
          toinAccountNumber,
          referralCode: userReferralCode,
          userRole: memberRole.name,
          referrerId: userByReferralCode != null ? userByReferralCode.id : null,
        },
      });

      // 5️⃣ Create user profile
      await tx.userProfile.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
        },
      });

      // 6️⃣ Create TOIN wallet
      await tx.userWallet.create({
        data: {
          walletBalance: 0,
          totalWithdrawals: 0,
          userId: user.id,
        },
      });

      // 7️⃣ Assign role to user
      await tx.userRoles.create({
        data: {
          userId: user.id,
          roleId: memberRole.id,
        },
      });

      // 8️⃣ Populate Referral Hierarchy
      if (userByReferralCode) {
        // Get all ancestors of the referrer
        const ancestors = await tx.referralHierarchy.findMany({
          where: { userId: userByReferralCode.id },
        });

        // Map them to the new user with level + 1
        const hierarchyData = ancestors.map((a) => ({
          userId: user.id,
          ancestorId: a.ancestorId,
          level: a.level + 1,
        }));

        // Add the direct referrer as Level 1
        hierarchyData.push({
          userId: user.id,
          ancestorId: userByReferralCode.id,
          level: 1,
        });

        // Batch insert hierarchy records
        await tx.referralHierarchy.createMany({
          data: hierarchyData,
        });
      }

      return user;
    });

    if (reqRegisterDto.referralCode != null && !isEmpty(reqRegisterDto.referralCode)) {

      const referredUsers = await this.prisma.referralHistory.count({
        where: {
          referralUserId: userByReferralCode.id,
          isActive: true,
        },
      });

      //referredUsers + 1 because the current user is not yet added to referral history
      const totalReferrerCount = (referredUsers ?? 0) + 1;

      const milestones = await this.prisma.referralMilestone.findMany({
        where: { isActive: true },
        orderBy: { sequenceNumber: 'asc' }
      });

      let maxTargetPerson = milestones[milestones.length - 1].targetPerson;
      let referralCountModulus = totalReferrerCount % maxTargetPerson;

      let mileStoneId = null;

      milestones.forEach(milestone => {
        mileStoneId = milestone.id;

        if (milestone.targetPerson == referralCountModulus || (referralCountModulus == 0 && milestone.targetPerson == maxTargetPerson)) {
          this.transactionService.createReferralBonusTransaction(userByReferralCode.id, milestone.toinAmount, `Referral Bonus for referring ${totalReferrerCount} user(s)`)
          return;
        }
      });


      await this.referralService.createReferralHistory(userByReferralCode, result, mileStoneId);

      // Create notification for referrer about new referral
      const notification = await this.notificationService.create({
        userId: userByReferralCode.id,
        type: NotificationType.INFO,
        title: 'New Referral',
        message: `You have a new referral: ${firstName} ${lastName}.`
      });
      await this.notificationGateway.sendToUser(userByReferralCode.id, notification);

    }

    let userResponseDto = plainToInstance(UserResponseDto, result, { excludeExtraneousValues: true });
    // 8️⃣ Send OTP after transaction
    const otpUniqueKey = await this.sendOtpToUser(userResponseDto, regType, OtpFor.VerifiedRegistrationPhoneOrEmail, null, 'Verify your account', 'Your OTP code for verification is');

    // 9️⃣ Transform & return standardized response
    return plainToInstance(UserRegistrationResponseDto, { ...result, regType, otpUniqueKey, }, { excludeExtraneousValues: true });

  }

  /**
   * 
   * @param refreshToken 
   * @returns 
   */
  async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.jwtRefreshSecret,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.status !== 'ACTIVE') {
        throw new BadRequestException('Invalid token');
      }

      return this.createLoginToken(user);
    } catch {
      throw new BadRequestException('Invalid refresh token');
    }
  }


  async resendOtpToUser(otpUniqueKey: string): Promise<string> {
    otpUniqueKey = this.cryptoService.decrypt(otpUniqueKey);
    var splitKey = otpUniqueKey.split("_");
    var userId = splitKey[2];
    var otpFor = splitKey[3];
    var emailOrPhone = splitKey[0].split(":")[1];
    var param: string;
    if (splitKey.length == 5) {
      param = splitKey[4];
    }

    let user = await this.prisma.user.findFirst({
      where: {
        id: userId
      },
    });

    if (!user) {
      this.logger.warn(`Resend OTP attempt failed: User not found for OTP key ${otpUniqueKey}`);
      throw new BadRequestException('User not found');
    }

    if (param == emailOrPhone) {
      if (emailOrPhone.includes("@")) {
        user.email = emailOrPhone;
      } else {
        user.phoneNumber = emailOrPhone;
      }
    }

    let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });

    //get redis data
    const otpData = await this.redisService.get<otpObjectDto>(otpUniqueKey);
    // resend otp
    if (otpData) {
      otpData.resendOtpCount = otpData.resendOtpCount + 1;
      await this.redisService.set(otpUniqueKey, otpData, 300);

      if (otpData.resendOtpCount >= this.configService.maxResendOtpCount) {
        this.logger.warn(`Resend OTP attempt failed: Maximum resend OTP attempts exceeded for key ${otpUniqueKey}`);
        throw new BadRequestException('Maximum resend OTP attempts exceeded');
      }
    }

    return await this.sendOtpToUser(userResponseDto, otpUniqueKey.includes("@") ? "email" : "phone", OtpFor[otpFor], param, 'Verify your account', 'Your OTP code for verification is');
  }


  async registerOtpValidation(requestDto: otpRequestModelDto): Promise<LoginResponseDto> {

    requestDto.otpUniqueKey = this.cryptoService.decrypt(requestDto.otpUniqueKey);

    const otpData = await this.redisService.get<otpObjectDto>(requestDto.otpUniqueKey);

    if (!otpData) {
      this.logger.warn(`OTP validation failed: OTP expired or invalid for key ${requestDto.otpUniqueKey}`);
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

        this.logger.warn(`OTP validation failed: Maximum OTP attempts exceeded for key ${requestDto.otpUniqueKey}`);
        throw new ValidationException({
          otp: ['Maximum OTP attempts exceeded. Please request a new OTP.'],
        })
      }


      this.logger.warn(`OTP validation failed: Invalid OTP for key ${requestDto.otpUniqueKey}`);

      throw new ValidationException({
        otp: ['Invalid OTP. Please try again.'],
      })
    }

    // OTP is correct, proceed to fetch user
    const splitKey = requestDto.otpUniqueKey.split("_");
    const userId = splitKey[2];
    const emailOrPhone = splitKey[0].split(":")[1];

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        OR: [
          { email: emailOrPhone },
          { phoneNumber: emailOrPhone },
        ],
      },
    });

    if (!user) {
      this.logger.warn(`OTP validation failed: User not found for key ${requestDto.otpUniqueKey}`);
      throw new UnauthorizedException('User not found');
    }

    // Update verification based on email or phone
    const updateData = emailOrPhone.includes("@") ? { emailVerified: true, emailVerifiedAt: new Date() } : { phoneVerified: true, phoneVerifiedAt: new Date() };

    await this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    // OTP was valid, optionally delete it from Redis
    await this.redisService.del(requestDto.otpUniqueKey);

    // Grant entry bonus upon successful registration verification
    await this.transactionService.createEntryBonusTransaction(user.id);

    // Create Notification for user about successful verification
    const welcomeNotification = await this.notificationService.create({
      userId: user.id,
      title: 'Account Verified',
      message: 'Your account has been successfully verified. Welcome aboard!',
      type: NotificationType.INFO,
    });

    await this.notificationGateway.sendToUser(user.id, welcomeNotification);

    // Create Notification for user about bonus credited
    const bonusNotification = await this.notificationService.create({
      userId: user.id,
      title: 'Bonus Credited',
      message: 'Your entry bonus has been credited to your wallet. Start exploring our services now!',
      type: NotificationType.INFO,
    });

    await this.notificationGateway.sendToUser(user.id, bonusNotification);

    return this.createLoginToken(user);
  }


  async forgotPassword(identifier: string): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phoneNumber: identifier }],
      },
    });

    if (!user) {
      throw new ValidationException({
        identifier: ['User not found with this email or phone.'],
      });
    }

    const regType = identifier.includes('@') ? 'email' : 'phone';
    let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    return this.sendOtpToUser(userResponseDto, regType, OtpFor.ForgetPassword, null, 'Reset your password', 'Your OTP code for password reset is');
  }



  async resetPassword(dto: { otpUniqueKey: string; otp: string; newPassword: string }): Promise<void> {
    const { otpUniqueKey, otp, newPassword } = dto;

    let otpUniqueKeyDecrypt = this.cryptoService.decrypt(otpUniqueKey);
    const otpData = await this.redisService.get<otpObjectDto>(otpUniqueKeyDecrypt);

    if (!otpData) {
      throw new ValidationException({
        otp: ['OTP expired or invalid. Please request a new OTP.'],
      });
    }

    // ✅ Validate OTP
    if (otpData.otp.toString() !== otp.toString()) {
      otpData.otpFailCount = (otpData.otpFailCount || 0) + 1;
      await this.redisService.set(otpUniqueKey, otpData, 300);

      if (otpData.otpFailCount >= Number(otpData.otpFailCount || 5)) {
        throw new ValidationException({
          otp: ['Maximum OTP attempts exceeded. Please request a new OTP.'],
        });
      }

      throw new ValidationException({
        otp: ['Invalid OTP. Please try again.'],
      });
    }

    // ✅ Extract user info
    const splitKey = otpUniqueKeyDecrypt.split('_');
    const userId = splitKey[2];
    const emailOrPhone = splitKey[0].split(':')[1];

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        OR: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      },
    });

    if (!user) {
      throw new ValidationException({
        identifier: ['User not found.'],
      });
    }

    if (user.status !== 'ACTIVE') {
      throw new BadRequestException(`User account is ${user.status}. Please contact support.`);
    }

    // ✅ Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // ✅ Update user password
    await this.prisma.user.update({
      where: { id: user.id },
      data: { PasswordHashed: hashedPassword },
    });

    // ✅ Remove used OTP
    await this.redisService.del(otpUniqueKey);
  }

  async changePassword(reqModel: ChangePasswordRequestDto, userId: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ValidationException({
        identifier: ['User not found.'],
      });
    }

    if (user.status !== 'ACTIVE') {
      throw new BadRequestException(`User account is ${user.status}. Please contact support.`);
    }

    // ✅ Verify current password
    const isOldPasswordValid = await comparePassword(reqModel.oldPassword, user.PasswordHashed);
    if (!isOldPasswordValid) {
      // increment failed attempts and possibly lock account similar to login behavior
      if (user.accessFailedCount <= this.configService.maxWrongPasswordFailCount) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { accessFailedCount: user.accessFailedCount + 1 },
        });
      } else {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { lockoutEnabled: true, lockoutEnd: new Date(Date.now() + this.configService.lockoutDurationMinutes * 60 * 1000) },
        });
      }

      throw new ValidationException({
        oldPassword: ['Old password is incorrect'],
      });
    }

    // ✅ Ensure new password is different
    if (reqModel.newPassword === reqModel.oldPassword) {
      throw new ValidationException({
        newPassword: ['New password must be different from current password'],
      });
    }

    // ✅ Hash new password
    const hashedPassword = await hashPassword(reqModel.newPassword);

    // ✅ Update user password and reset failed attempts
    await this.prisma.user.update({
      where: { id: user.id },
      data: { PasswordHashed: hashedPassword, accessFailedCount: 0, lockoutEnabled: false },
    });

    // ✅ Return success message
    return { message: 'Change password is successful' };
  }




  async getAllKeysWithValues(): Promise<otpObjectDto[]> {
    const otpList = await this.redisService.getAllKeysWithValues();
    if (otpList == null) {
      throw new ValidationException({ otp: ['OTP expired or invalid. Please request a new OTP.'] });
    }
    return otpList;
  }



  /**
   * Validate email or phone uniqueness.
   */
  private async validateUniqueEmailOrPhone(
    data: { email?: string | null; phone?: string | null },
    regType: string,
  ): Promise<void> {
    const { email, phone } = data;

    const errors: Record<string, string[]> = {};

    if (regType === 'email' && email) {
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        this.logger.warn(`Registration attempt failed: Email already in use - ${email}`);
        errors.identifier = ['Email already in use'];
        throw new ValidationException(errors);
      }
    }

    if (regType === 'phone' && phone) {
      const existingUser = await this.prisma.user.findUnique({ where: { phoneNumber: phone } });
      if (existingUser) {
        this.logger.warn(`Registration attempt failed: Phone number already in use - ${phone}`);
        errors.identifier = ['Phone number already in use'];
        throw new ValidationException(errors);
      }
    }
  }

  /**
   * @param user 
   * @param identifierType 
   * @returns string
   */
  public async sendOtpToUser(user: UserResponseDto, identifierType: string, otpFor: OtpFor, param: string = null, subject: string = 'OTP', body: string = 'Your OTP code is'): Promise<string> {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(`Generated OTP for ${identifierType} verification: ${otp}`);

    // Build unique key
    let otpUniqueKey: string;
    if (identifierType === "phone") {
      otpUniqueKey = `otp:${user.phoneNumber == null ? param : user.phoneNumber}_${Date.now()}_${user.id}_${otpFor}`;
    } else {
      otpUniqueKey = `otp:${user.email == null ? param : user.email}_${Date.now()}_${user.id}_${otpFor}`;
    }
    if (param) {
      otpUniqueKey = `${otpUniqueKey}_${param}`;
    }

    // Create OTP object
    const otpJson: otpObjectDto = {
      id: parseInt(Date.now().toString().slice(-6)),
      key: otpUniqueKey,
      userId: user.id,
      emailOrPhone: identifierType === "phone" ? user.phoneNumber : user.email,
      otp: otp, // number
      otpFailCount: this.configService.otpMaxFailCount || 5,
      otpFor: otpFor,
      resendOtpCount: 0,
      createdAt: new Date(),
    };

    // Save to Redis with dynamic expiration
    await this.redisService.set(otpUniqueKey, otpJson, (this.configService.otpDurationMinutes * 60));

    // SEND OTP EMAIL
    if (identifierType === "email" && user.email) {
      await this.mailService.sendOtpEmail(user.email, otp.toString(), subject, body, this.configService.otpDurationMinutes);
    }

    // SEND OTP SMS
    if (identifierType === "phone" && user.phoneNumber) {
      await this.smsService.sendOtpSms(user.phoneNumber, otp.toString(), body, this.configService.otpDurationMinutes);
    }

    // // Save to Redis with redisServiceExpiration (5 minutes)
    // await this.redisService.set(otpUniqueKey, otpJson, (this.configService.otpDurationMinutes * 60));

    otpUniqueKey = this.cryptoService.encrypt(otpUniqueKey);
    return otpUniqueKey;
  }



  /**
   * @param user 
   * @returns LoginResponseDto
   */
  private async createLoginToken(user: User, referrer: any = null): Promise<LoginResponseDto> {

    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      phone: user.phoneNumber,
      role: user.userRole, // Can be null
      username: user.username
    };

    const expiresIn = this.configService.jwtExpiresIn;
    const refreshExpiresIn = this.configService.jwtRefreshExpiresIn;

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: refreshExpiresIn,
    } as any);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const response = new LoginResponseDto();

    response.accessToken = accessToken;
    response.refreshToken = refreshToken;
    response.expiresIn = expiresIn;
    response.refreshExpiresIn = refreshExpiresIn;
    response.user = {
      id: user.id.toString(),
      email: user.email,
      phone: user.phoneNumber,
      username: user.username,
      role: user.userRole, // Can be null
      referralCode: user.referralCode,
      referredUser: referrer
    };

    this.logger.log(`User ${user.email || user.phoneNumber} logged in successfully.`);

    return response;
  }


  /**
 * @param user 
 * @returns LoginResponseDto
 */
  async logout(user: UserResponseDto): Promise<void> {

    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      phone: user.phoneNumber,
      role: user.userRole, // Can be null
      username: user.username
    };

    const expiresIn = 0;
    const refreshExpiresIn = 0;

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: refreshExpiresIn,
    } as any);

  }



}