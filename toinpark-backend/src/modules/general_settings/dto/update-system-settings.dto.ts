import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  MaxLength,
  Matches,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSettingsDto {
  @ApiPropertyOptional({
    description: 'TOIN conversion rate (e.g., 0.01 means 1 TOIN = $0.01)',
    example: 0.01,
    minimum: 0,
    maximum: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'TOIN convention rate must be a number' })
  @Min(0, { message: 'TOIN convention rate must be at least 0' })
  @Max(1000, { message: 'TOIN convention rate cannot exceed 1000' })
  toinConventionRate: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Favicon image file (PNG, ICO, SVG)',
  })
  favicon?: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Logo image file (PNG, JPG, SVG)',
  })
  logo?: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'PDF file',
  })
  pdf?: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'WhatsApp contact number with country code',
    example: '+8801756307427',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'WhatsApp number must be a valid phone number with country code',
  })
  whatsApp?: string;

  @ApiPropertyOptional({
    description: 'Organization name',
    example: 'TOIN Park',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  organizationName: string;

  @ApiPropertyOptional({
    description: 'Organization Email',
    example: 'info@toilabs.com',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  organizationEmail: string;

  @ApiPropertyOptional({
    description: 'Telegram contact or group link',
    example: '+8801756307427',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  telegram?: string;

  @ApiPropertyOptional({
    description: 'Website title',
    example: 'ToinPark',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  siteTitle: string;

  @ApiPropertyOptional({
    description: 'Airdrop event promotional message',
    example: 'Join our airdrop event to win exciting prizes!',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  airdropEventMessage?: string;


  @ApiPropertyOptional({
    description: 'Entry bonus TOIN amount for new users',
    example: 100,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Entry bonus TOIN must be a number' })
  @Min(0, { message: 'Entry bonus TOIN must be at least 0' })
  entryBonusToin?: number;

  @ApiPropertyOptional({
    description: 'KYC completion bonus TOIN amount',
    example: 50,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'KYC bonus TOIN must be a number' })
  @Min(0, { message: 'KYC bonus TOIN must be at least 0' })
  kycBonusToin?: number;

  @ApiPropertyOptional({
    description: 'Social media connection bonus TOIN amount',
    example: 25,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Social bonus TOIN must be a number' })
  @Min(0, { message: 'Social bonus TOIN must be at least 0' })
  socialBonusToin?: number;

  
  @ApiPropertyOptional({
    description: 'Facebook page URL',
    example: 'https://facebook.com/toinpark',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Facebook URL must be a valid URL' })
  @MaxLength(255)
  facebookUrl?: string;

  @ApiPropertyOptional({
    description: 'YouTube channel URL',
    example: 'https://youtube.com/@toinpark',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'YouTube URL must be a valid URL' })
  @MaxLength(255)
  youtubeUrl?: string;

  @ApiPropertyOptional({
    description: 'LinkedIn profile/company URL',
    example: 'https://linkedin.com/company/toinpark',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'LinkedIn URL must be a valid URL' })
  @MaxLength(255)
  linkedinUrl?: string;

  @ApiPropertyOptional({
    description: 'Instagram profile URL',
    example: 'https://instagram.com/toinpark',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Instagram URL must be a valid URL' })
  @MaxLength(255)
  instagramUrl?: string;

  @ApiPropertyOptional({
    description: 'Minimum USDT withdrawal amount',
    example: 10,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Minimum USDT withdrawal amount must be a number' })
  @Min(0, { message: 'Minimum USDT withdrawal amount must be at least 0' })
  minUSDTWithdrawalAmount?: number;

  @ApiPropertyOptional({
    description: 'Platform withdrawal fee percentage',
    example: 1,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Platform withdrawal fee percentage must be a number' })
  @Min(0, { message: 'Platform withdrawal fee percentage must be at least 0' })
  @Max(100, { message: 'Platform withdrawal fee percentage cannot exceed 100' })
  platformWithdrawalFeePercentage?: number;
}