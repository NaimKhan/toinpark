import { IsString, IsOptional, IsBoolean, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnnouncementCategoryDto {
  @ApiProperty({
    description: 'Name of the announcement category',
    example: 'System Updates',
    minLength: 1,
    maxLength: 255,
  })
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the announcement category',
    example: 'Category for system-related announcements',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Active status of the announcement category',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

