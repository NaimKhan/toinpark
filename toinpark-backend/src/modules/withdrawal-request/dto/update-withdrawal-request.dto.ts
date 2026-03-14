import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { WithdrawalStatus } from '@prisma/client';

export class UpdateWithdrawalRequestDto {
  @ApiPropertyOptional({ description: 'Wallet address' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({ description: 'Withdrawal amount' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ description: 'Currency code' })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  currency?: string;
}