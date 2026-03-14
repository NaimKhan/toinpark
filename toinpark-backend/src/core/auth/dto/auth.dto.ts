import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { OtpFor } from 'src/common/enums/all-enum';
import { UserProfileResponseDto } from 'src/modules/user/user-profile/dto/user-profile-response.dto';

export enum IdentifierType {
  Email = 'email',
  Phone = 'phone'
}

export class UserCreateDto {

  @ApiProperty({
    example: 'email',
    description: 'User email address',
  })
  identifierType: IdentifierType;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User phone/email address',
  })
  identifier: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password',
  })
  password: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password',
  })
  passwordConfirmation: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: '',
    description: 'User referral code',
    required: false,
  })
  referralCode?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: '15' })
  @Expose()
  id: string;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  phoneNumber: string | null;

  @ApiProperty({ example: 'jo0hnayyyyyyy@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: false })
  @Expose()
  emailVerified: boolean;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  emailVerifiedAt: Date | null;

  @ApiProperty({ example: false })
  @Expose()
  phoneVerified: boolean;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  phoneVerifiedAt: Date | null;

  @ApiProperty({ example: 'email or phone' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'TOI1253457895' })
  @Expose()
  toinAccountNumber: string;

  @ApiProperty({ example: 'MEMBER' })
  @Expose()
  userRole: string;

  @ApiProperty({ example: 'ACTIVE' })
  @Expose()
  status: string;

  @ApiProperty({ example: false })
  @Expose()
  twoFactorEnabled: boolean;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  twoFactorSecret: string | null;

  @ApiProperty({ example: true })
  @Expose()
  lockoutEnabled: boolean;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  lockoutEnd: Date | null;

  @ApiProperty({ example: 0 })
  @Expose()
  accessFailedCount: number;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  referrerId: string | null;

  @ApiProperty({ example: '164313' })
  @Expose()
  referralCode: string;

  @ApiProperty({ example: 0 })
  @Expose()
  totalReferrals: number;

  @ApiProperty({ example: '0' })
  @Expose()
  walletBalance: string;

  @ApiProperty({ example: '0' })
  @Expose()
  totalEarnings: string;

  @ApiProperty({ example: '0' })
  @Expose()
  totalWithdrawals: string;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  lastLoginAt: Date | null;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  lastLoginIp: string | null;

  @ApiProperty({ example: 0 })
  @Expose()
  loginCount: number;

  @ApiProperty({ example: false })
  @Expose()
  isKycVerified: boolean;

  @ApiProperty({ example: null, nullable: true })
  @Expose()
  kycVerifiedAt: Date | null;

  @ApiProperty({ example: false })
  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserProfileResponseDto)
  @ApiPropertyOptional({ type: () => UserProfileResponseDto })
  userProfile: UserProfileResponseDto

}

export class UserRegistrationResponseDto {
  @Expose()
  @ApiProperty({ example: '15' })
  @Transform(({ value }) => value.toString())
  id: string;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  username: string | null;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  phoneNumber: string | null;

  @Expose()
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: false })
  emailVerified: boolean;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  emailVerifiedAt: Date | null;

  @Expose()
  @ApiProperty({ example: false })
  phoneVerified: boolean;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  phoneVerifiedAt: Date | null;

  @Expose()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'phone or email' })
  regType: string;

  @Expose()
  @ApiProperty({ example: 'otp unique key' })
  otpUniqueKey: string;

  @Expose()
  @ApiProperty({ example: 'otp unique key' })
  userRole: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Request successful' })
  message: string;

  @ApiProperty({ example: "Any type of object or array" })
  data: any;
}

export class RegistrationOtpValidationDto {
  @ApiProperty({
    example: 'OTP unique key',
    description: 'OTP unique key',
  })
  otpUniqueKey: string;

  @ApiProperty({
    example: '6 digit OTP',
    description: 'Otp sent to email or phone',
  })
  otp?: string;

}

export class RegistrationOTPResponseDto {
  @ApiProperty({ example: true })
  OtpSuccess: boolean;

  @ApiProperty({ example: "success or fail" })
  OtpMessage: string;
}

export class RegisterOTPRequestDto {
  @ApiProperty({ example: "Otp unique key" })
  otpUniqueKey: string;

  @ApiProperty({ example: "123456" })
  otp: string;
}

export class reSendRegisterOTPRequestDto {
  @ApiProperty({ example: "Otp unique key" })
  otpUniqueKey: string;
}


export class LoginRequestDto {
  @ApiProperty({ example: "admin@toilabs.com" })
  identifier: string;

  @ApiProperty({ example: "Password@123" })
  password: string;
}


export class ForgotPasswordDto {
  @ApiProperty({ example: "member@example.com/+88018212312" })
  identifier: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: "otp unique key" })
  otpUniqueKey: string;

  @ApiProperty({ example: "123456" })
  otp: string;

  @ApiProperty({ example: "NewPassword@123" })
  newPassword: string;

  @ApiProperty({ example: "NewPassword@123" })
  passwordConfirmation: string
}

export class otpObjectDto {
  @ApiProperty({ example: "464416" })
  @Expose()
  id: number;

  @ApiProperty({ example: "Unique key" })
  @Expose()
  key: string;

  @ApiProperty({ example: "User Id" })
  @Expose()
  userId: string;

  @ApiProperty({ example: "Email or Phone" })
  @Expose()
  emailOrPhone: string;

  @ApiProperty({ example: "123456" })
  @Expose()
  otp: number;

  @ApiProperty({ example: "1 or 2 or 3" })
  @Expose()
  otpFailCount: number;

  @ApiProperty({ example: "Otp for" })
  @Expose()
  otpFor: OtpFor;

  @ApiProperty({ example: "1 or 2 or 3" })
  @Expose()
  resendOtpCount: number;

  @ApiProperty({ example: "2026-01-10T16:56:40.000Z" })
  @Expose()
  createdAt: Date;
}


export class UnverifiedAccountResponseDto {
  @ApiProperty({
    example: false,
    description: 'Indicates account is not verified',
  })
  isVerified: boolean;

  @ApiProperty({
    example: 'Your account is not verified. Please verify your account to continue.',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'otp_abc123xyz',
    description: 'Unique key to resend OTP',
  })
  otpUniqueKey: string;

  @ApiProperty({
    example: 'email', // or 'phone'
    description: 'identifierType method',
  })
  identifierType: IdentifierType;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Masked identifier',
  })
  identifier: string;
}



