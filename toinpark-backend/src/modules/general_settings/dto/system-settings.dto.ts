import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { MediaDto } from 'src/core/storage/dto/media.dto';

export class SettingItemDto {
  @ApiProperty({
    description: 'Setting key',
    example: 'siteTitle',
  })
  @Expose()
  key: string;

  @ApiProperty({
    description: 'Setting value',
    example: 'ToinPark',
  })
  @Expose()
  value: string;

  @ApiPropertyOptional({
    description: 'Display order',
    example: 1,
  })
  @Expose()
  order?: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00Z',
  })
  @Expose()
  updatedAt: Date;
}

export class SettingsResponseDto {
  @ApiProperty({
    description: 'TOIN conversion rate',
    example: 0.01,
  })
  @Expose()
  @Type(() => Number)
  toinConventionRate: number;

  @ApiProperty({
    description: 'Logo file name or URL',
    example: 'logo.png',
  })
  @Expose()
  logo: string;

  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  logoMedia: MediaDto | null


  @ApiProperty({
    description: 'Favicon file name or URL',
    example: 'favicon.ico',
  })
  @Expose()
  favicon: string;

  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  faviconMedia: MediaDto | null


  @ApiProperty({
    description: 'pdf file name or URL',
    example: 'doc.pdf',
  })
  @Expose()
  pdf: string;

  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  pdfMedia: MediaDto | null


  @ApiProperty({
    description: 'WhatsApp contact number',
    example: '+8801756307427',
  })
  @Expose()
  whatsApp: string;

  @ApiProperty({
    description: 'Organization name',
    example: 'TOIN Park',
  })
  @Expose()
  organizationName: string;

  @ApiProperty({
    description: 'Organization Email',
    example: 'info@toilabs.com',
  })
  @Expose()
  organizationEmail: string;

  @ApiProperty({
    description: 'Telegram contact',
    example: '+8801756307427',
  })
  @Expose()
  telegram: string;

  @ApiProperty({
    description: 'Website title',
    example: 'ToinPark',
  })
  @Expose()
  siteTitle: string;

  @ApiProperty({
    description: 'Airdrop event message',
    example: 'Join our airdrop event to win exciting prizes!',
  })
  @Expose()
  airdropEventMessage: string;

  
  @ApiProperty({
    description: 'Entry bonus TOIN amount for new users',
    example: 100,
    minimum: 0,
  })
  @Type(() => Number)
  @Expose()
  entryBonusToin?: number;
  
  @ApiProperty({
    description: 'KYC completion bonus TOIN amount',
    example: 50,
    minimum: 0,
  })
  @Type(() => Number)
  @Expose()
  kycBonusToin?: number;
  
  @ApiProperty({
    description: 'Social media connection bonus TOIN amount',
    example: 25,
    minimum: 0,
  })
  @Type(() => Number)
  @Expose()
  socialBonusToin?: number;
  
  @ApiProperty({
    description: 'Facebook page URL',
    example: 'https://facebook.com/toinpark',
    maxLength: 255,
  })
  @IsUrl({}, { message: 'Facebook URL must be a valid URL' })
  @Expose()
  facebookUrl?: string;
  
  @ApiProperty({
    description: 'YouTube channel URL',
    example: 'https://youtube.com/@toinpark',
    maxLength: 255,
  })
  @IsUrl({}, { message: 'YouTube URL must be a valid URL' })
  @Expose()
  youtubeUrl?: string;
  
  @ApiProperty({
    description: 'LinkedIn profile/company URL',
    example: 'https://linkedin.com/company/toinpark',
    maxLength: 255,
  })
  @IsUrl({}, { message: 'LinkedIn URL must be a valid URL' })
  @Expose()
  linkedinUrl?: string;

  @ApiProperty({
    description: 'Instagram profile URL',
    example: 'https://instagram.com/toinpark',
    maxLength: 255,
  })
  @IsUrl({}, { message: 'Instagram URL must be a valid URL' })
  @Expose()
  instagramUrl?: string;

  @ApiProperty({
    description: 'Minimum USDT withdrawal amount',
    example: 10,
    minimum: 0,
  })
  @Type(() => Number)
  @Expose()
  minUSDTWithdrawalAmount?: number;

  @ApiProperty({
    description: 'Platform withdrawal fee percentage',
    example: 1,
    minimum: 0,
    maximum: 100,
  })
  @Type(() => Number)
  @Expose()
  platformWithdrawalFeePercentage?: number;
}