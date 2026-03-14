import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Put,
  Post,
  UseGuards,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  UsePipes,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthResponseDto, RegisterOTPRequestDto, UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { CurrentUser, Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserProfileService } from './user-profile.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProfileImageDto } from './dto/upload-profile-image.dto';
import { UploadService } from '../../../common/services/upload.service';
import { ZodValidationPipe } from 'src/common/pipes';
import { otpRequestModelDto, RegisterOTPRequestSchema } from 'src/core/auth/dto/auth.schema';

@ApiTags('User Profile')
@Controller('user-profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService,
    private readonly uploadService: UploadService) { }

  /**
   * Get current user's profile information with custom response format
   * @param user - Current authenticated user
   * @returns Customized user profile with wallet balance and related data
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserProfileResponseDto,
  })
  async getProfile(@CurrentUser() user: UserResponseDto): Promise<UserProfileResponseDto> {
    return await this.userProfileService.getUserProfile(user.id);
  }

  /**
   * Update current user's profile information
   * @param user - Current authenticated user
   * @param updateProfileDto - Profile data to update
   * @returns Updated user profile
   */
  @Patch()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update User Profile' })
  @ApiBody({ type: UpdateUserProfileDto })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    type: UserProfileResponseDto,
  })
  async updateProfile(
    @CurrentUser() user: UserResponseDto,
    @Body() updateProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponseDto> {
    return await this.userProfileService.updateUserProfile(user.id, updateProfileDto);
  }


  /**
   * Change current user's password
   * 
   * Response format (wrapped by TransformInterceptor):
   * Success (200):
   * {
   *   "success": true,
   *   "statusCode": 200,
   *   "message": "Password changed successfully",
   *   "data": null,
   *   "timestamp": "2025-11-12T11:49:49.792Z"
   * }
   * 
   * Validation Error (422):
   * {
   *   "success": false,
   *   "statusCode": 422,
   *   "message": "Validation failed",
   *   "errors": {
   *     "currentPassword": ["Current password is incorrect"],
   *     "newPassword": ["New password must be at least 8 characters"]
   *   }
   * }
   * 
   * Note: The TransformInterceptor wraps all responses with success, statusCode, and timestamp.
   *       Controller returns the data directly, which becomes the 'data' field.
   * 
   * @param user - Current authenticated user
   * @param changePasswordDto - Current and new password data
   * @returns Response data (will be wrapped by TransformInterceptor)
   */
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change User Password' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Password changed successfully',
        data: null,
        timestamp: '2025-11-12T11:49:49.792Z',
      },
    },
  })
  async changePassword(@CurrentUser() user: UserResponseDto, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.userProfileService.changePassword(user.id, changePasswordDto);
  }


  /**
  * Upload or update profile picture
  * @param user - Current authenticated user
  * @param profileImage - Uploaded image file
  * @returns Updated user profile with new image URL
  */
  @Post('upload-profile-image')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiOperation({ summary: 'Upload Profile Picture' })
  @ApiBody({ type: UploadProfileImageDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Profile image uploaded successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async uploadProfileImage(
    @CurrentUser() user: UserResponseDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    profileImage?: Express.Multer.File,
  ): Promise<string> {
    let profileImageUrl: string | undefined;

    if (profileImage) {
      profileImageUrl = await this.uploadService.uploadProfileImage(
        profileImage,
      );
    }

    await this.userProfileService.uploadProfileImage(
      user.id,
      profileImageUrl,
    );

    return "Profile image uploaded successfully";
  }


  /**
   * Delete current user's profile picture
   * @param user - Current authenticated user
   * @returns Updated user profile without image
   */
  @Delete('profile-image')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete Profile Picture' })
  @ApiResponse({
    status: 200,
    description: 'Profile image deleted successfully',
  })
  async deleteProfileImage(
    @CurrentUser() user: UserResponseDto,
  ): Promise<string> {
    await this.userProfileService.deleteProfileImage(user.id);

    return "Profile image deleted successfully";
  }


  @Get('phone-or-email-otp-verify/:emailOrPhone')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER)
  @ApiOperation({ summary: 'Profile OTP Validation' })
  @ApiResponse({ type: AuthResponseDto })
  async verifyKycProfilePhoneOrEmail(@Param('emailOrPhone') emailOrPhone: string, @CurrentUser() user: UserResponseDto): Promise<any> {
    return await this.userProfileService.verifyProfilePhoneOrEmail(emailOrPhone, user.id);
  }



  @Post('phone-or-email-1st-otp-validation')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER)
  @ApiOperation({ summary: 'Profile OTP Validation' })
  @ApiBody({ type: RegisterOTPRequestDto })
  @ApiResponse({ type: AuthResponseDto })
  @UsePipes(new ZodValidationPipe(RegisterOTPRequestSchema))
  async profileOTPValidation(@Body() otpRequestModel: otpRequestModelDto): Promise<any> {
    return await this.userProfileService.otpValidationForProfilePhoneOrEmail(otpRequestModel);
  }


  @Post('phone-or-email-2nd-otp-validation-cross-check')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER)
  @ApiOperation({ summary: 'Profile OTP Validation' })
  @ApiBody({ type: RegisterOTPRequestDto })
  @ApiResponse({ type: AuthResponseDto })
  @UsePipes(new ZodValidationPipe(RegisterOTPRequestSchema))
  async profileOTPValidationCrossCheck(@Body() otpRequestModel: otpRequestModelDto): Promise<any> {
    return await this.userProfileService.verifyProfilePhoneOrEmailCrossChecking(otpRequestModel);
  }

}

