import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsEmail, MaxLength, MinLength, Matches, IsNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateMemberProfileDto {
  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Member email address',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MinLength(5, { message: 'Email must be at least 5 characters' })
  @MaxLength(64, { message: 'Email must not exceed 64 characters' })
  @Matches(/^(?!.*(.)\1{3,})/, { message: 'Email cannot contain 4 or more continuous repeated characters' })
  email: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Member phone number',
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' })
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'StrongP@ssw0rd!',
    description: 'Member password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)',
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(/^(?!.*(.)\1{3,})/, { message: 'Password cannot contain 4 or more continuous repeated characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol (@$!%*?&#^)',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'John',
    description: 'First name',
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[A-Za-z][A-Za-z\s\-'.]*[A-Za-z]$/, {
    message: "First name must contain only letters, spaces, hyphen (-), apostrophe ('), or dot (.), and cannot start or end with special characters"
  })
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name',
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Matches(/^[A-Za-z][A-Za-z\s\-'.]*[A-Za-z]$/, {
    message: "Last name must contain only letters, spaces, hyphen (-), apostrophe ('), or dot (.), and cannot start or end with special characters"
  })
  lastName?: string;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'Date of birth',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @ApiPropertyOptional({
    example: 'Male',
    description: 'Gender',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @ApiPropertyOptional({
    example: 'Bio description',
    description: 'Bio/About',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    example: '123 Main St',
    description: 'Address line 1',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  addressLine1?: string;

  @ApiPropertyOptional({
    example: 'Apt 4B',
    description: 'Address line 2',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  addressLine2?: string;

  @ApiPropertyOptional({
    example: 'New York',
    description: 'City',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiPropertyOptional({
    example: 'state-uuid',
    description: 'State ID',
  })
  @IsOptional()
  @IsString()
  stateId?: string;

  @ApiPropertyOptional({
    example: 'country-uuid',
    description: 'Country ID',
  })
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({
    example: '10001',
    description: 'Zip/Postal code',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  zipCode?: string;
}