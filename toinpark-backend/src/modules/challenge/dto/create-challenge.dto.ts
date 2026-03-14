import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateChallengeDto {
  @ApiProperty({ description: 'Title of the challenge', example: 'Run 5km daily' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty({ message: 'Challenge title is required' })
  challengeTitle: string;

  @ApiProperty({ description: 'Challenge description', example: 'Daily running goal' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Challenge start date', example: '2025-12-01T00:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Challenge end date', example: '2026-01-01T00:00:00Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Reward token amount', example: 50.25 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  rewardToinAmount: number;

  @ApiProperty({ description: 'Post details', required: false })
  @IsOptional()
  @IsString()
  postDetails?: string;
}
