import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  Max,
  MaxLength,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateStakingPackagePlanDto {
  @ApiProperty({
    example: 'Bronze Plan',
    description: 'Name of the staking package plan',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({
    example: 'Entry-level staking package with daily rewards',
    description: 'Description of the staking package plan',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 1.5,
    description: 'Daily profit percentage (e.g., 1.5 for 1.5%)',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  dailyProfitPercent: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Bonus amount for this plan',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  bonusAmount?: number;

  @ApiProperty({
    example: 10000,
    description: 'Maximum TOIN amount allowed for this plan',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  maxToinAmount: number;

  @ApiProperty({
    example: 100,
    description: 'Minimum TOIN amount required for this plan',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  minToinAmount: number;

  @ApiProperty({
    example: 30,
    description: 'Minimum duration in days for staking',
    minimum: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minimumDurationInDays: number;

  @ApiProperty({
    example: 7,
    description: 'Number of days for recurring profit distribution',
    minimum: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  recurringProfitDays: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Total TOIN purchased with USD',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  totalToinPurchasedWithUSD?: number;
}