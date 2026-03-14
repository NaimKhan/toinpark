import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  MaxLength,
  min,
  Min,
} from 'class-validator';

export class CreateWithdrawalRequestDto {
  @ApiProperty({ description: 'User Staking Package ID', example: 'uuid-v4-string' })
  @IsUUID()
  @IsNotEmpty()
  userStakingPackageId: string;

  @ApiProperty({ description: 'Wallet address', example: '0xe272b4A137802b57C0fE46fC27e54f8782263cb4' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Withdrawal amount', example: 10})
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Currency code', example: 'usdtbsc' })
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  currency: string;
}