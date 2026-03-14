import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AudienceType } from '@prisma/client';

export class CreateOfficialAnnouncementDto {
  @ApiProperty({ 
    description: 'Title of the announcement', 
    example: 'System Maintenance Notice',
    minLength: 1,
    maxLength: 255,
  })
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @ApiPropertyOptional({ 
    description: 'Message content of the announcement', 
    example: 'We will be performing system maintenance on...',
    minLength: 1,
  })
  @MinLength(1)
  @IsNotEmpty({ message: 'Message should not be empty' })
  message: string;

  @ApiPropertyOptional({ 
    description: 'Start date of the announcement', 
    example: '2025-01-01T00:00:00Z' 
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ 
    description: 'End date of the announcement', 
    example: '2025-12-31T23:59:59Z' 
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ 
    description: 'Category ID for the announcement',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId: string;

  @ApiProperty({ 
    description: 'Audience type for the announcement',
    enum: AudienceType,
    example: AudienceType.MEMBER
  })
  @IsEnum(AudienceType, { message: 'Audience type must be MEMBER or SYSTEM_USER' })
  @IsNotEmpty({ message: 'Audience type is required' })
  audienceType: AudienceType;
}

