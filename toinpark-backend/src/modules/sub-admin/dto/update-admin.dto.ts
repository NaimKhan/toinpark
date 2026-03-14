import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiPropertyOptional({
    example: 'john',
    description: 'Sub admin first name',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'doe',
    description: 'Sub admin last name',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Admin email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'subadminuser',
    description: 'Admin username',
  })
  @IsOptional()
  @IsString()
  userName?: string;
}