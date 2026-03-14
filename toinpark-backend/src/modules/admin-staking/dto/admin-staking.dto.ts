import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class AdminStakingDto {
  @ApiProperty({ example: 'ae4b3f3a-ff12-4cb7-9b1e-b53a6c99a211' })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 5000.0 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    return Number(value);
  })
  @IsNotEmpty({ message: 'TOIN amount is requiredsssssss' })
  @Min(1)
  toinAmount: number;

  @ApiProperty({ example: 100.0 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    return Number(value);
  })
  @IsNotEmpty({ message: 'USDT amount is required' })
  usdtAmount: number;

  @ApiProperty({ example: 'Admin stake on behalf of user' })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class AdminUserStakingPackageResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  packageId: string;

  @Expose()
  transactionId: string;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  toinAmount?: number;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  bonusAmount?: number;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  dailyProfitPercent?: number;

  @Expose()
  startDate: Date;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  totalProfit?: number;

  @Expose()
  initialEndDate: Date;

  @Expose()
  recurringProfitDays: number;

  @Expose()
  previousRewardDate: Date;

  @Expose()
  nextRewardDate: Date;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  usdConversionRate?: number;

  @Expose()
  stakedToin: boolean;

  @Expose()
  isBonusDone: boolean;

  @Expose()
  isLevelingBonusDone: boolean;

  @Expose()
  submitForWithdraw: boolean;

  @Expose()
  withdrawalStatus: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  createdBy: string;

  @Expose()
  updatedAt: Date;

  @Expose()
  updatedBy: string;

  @Expose()
  deletedAt: Date;

  @Expose()
  deletedBy: string;

  @Expose()
  stakeCreatedBy: string;

  @Expose()
  packageName?: string;
}

export class AdminStakingFilterDto {
  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'TOIN123456' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class AdminStakingUserDetailsDto {
  @Expose()
  id: string;

  @Expose()
  toinAccountNumber: string;

  @Expose()
  @Transform(({ obj }) => obj?.userProfile?.firstName ?? null)
  firstName: string | null;

  @Expose()
  @Transform(({ obj }) => obj?.userProfile?.lastName ?? null)
  lastName: string | null;
}

export class AdminStakingPackageDetailsDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

export class AdminStakingTransactionDetailsDto {
  @Expose()
  transactionAutoId: string;

  @Expose()
  trxType: string;

  @Expose()
  trxStatus: string;

  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value.toString()) : 0))
  toinAmount: number;

  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value.toString()) : 0))
  usdAmount: number;

  @Expose()
  remark: string;

  @Expose()
  createdAt: Date;
}