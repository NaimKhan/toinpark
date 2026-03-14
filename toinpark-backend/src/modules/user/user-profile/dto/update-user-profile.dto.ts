import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Matches, IsEmail } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({ example: 'John', required: true })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[A-Za-z][A-Za-z\s\-'.]*[A-Za-z]$/, {
    message: "First name must contain only letters, spaces, hyphen (-), apostrophe ('), or dot (.), and cannot start or end with special characters"
  })
  firstName: string;

  @ApiProperty({ example: 'Abraham', required: true })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Matches(/^[A-Za-z][A-Za-z\s\-'.]*[A-Za-z]$/, {
    message: "Last name must contain only letters, spaces, hyphen (-), apostrophe ('), or dot (.), and cannot start or end with special characters"
  })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @MinLength(5, { message: 'Email must be at least 5 characters' })
  @MaxLength(64, { message: 'Email must not exceed 64 characters' })
  @Matches(/^(?!.*(.)\1{3,})/, { message: 'Email cannot contain 4 or more continuous repeated characters' })
  email?: string;

  @ApiProperty({ example: '+8801700000000', required: false })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' })
  phoneNumber?: string;


  @ApiProperty({ example: '123 Greenview Avenue, Apt 4B, Brooklyn, NY 11215', required: false })
  @IsOptional()
  @IsString({ message: 'Address line 1 must be a string' })
  addressLine1?: string;

  @ApiProperty({ example: 'Apt 4B', required: false })
  @IsOptional()
  @IsString({ message: 'Address line 2 must be a string' })
  addressLine2?: string;

  @ApiProperty({ example: 'Brooklyn', required: false })
  @IsOptional()
  @IsString({ message: 'City must be a string' })
  city?: string;

  @ApiProperty({ example: '11215', required: false })
  @IsOptional()
  @IsString({ message: 'Zip code must be a string' })
  zipCode?: string;

  @ApiProperty({ example: 'ce9d9d87-63f0-4279-a509-77df69e8d264', required: false })
  @IsOptional()
  @IsString({ message: 'Country ID must be a string' })
  countryId?: string;

  @ApiProperty({ example: 'a36b61c2-6eab-4878-88e7-837484d37864', required: false })
  @IsOptional()
  @IsString({ message: 'State ID must be a string' })
  stateId?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', required: false })
  @IsOptional()
  @IsString({ message: 'Profile image URL must be a string' })
  profileImageUrl?: string;

  @ApiProperty({ example: 'This is my bio', required: false })
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio?: string;
}


export class UserEmailOrPhoneOTPResponseDto {
  @Expose()
  @ApiProperty({ example: '1ef96bb3-8ec2-4fce-9ffc-d708d0bff5da' })
  uniqueKey: string;

  @Expose()
  @ApiProperty({ example: 'System Admin' })
  identifier: string;

  @Expose()
  @ApiProperty({ example: 'making email or phone' })
  emailOrPhone: string;

}
