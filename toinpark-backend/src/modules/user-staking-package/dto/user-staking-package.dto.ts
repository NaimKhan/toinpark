import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Transform, Expose, Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { StakingPackageResponseDto } from 'src/modules/staking-package-plan/dto/staking-package-plan-response.dto';
import { WithdrawalRequestResponseDto } from 'src/modules/withdrawal-request/dto/withdrawal-request-response.dto';
import { StakingAdjustmentResponseDto } from 'src/modules/staking-adjustment/dto/staking-adjustment.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { TransactionResponseDto } from 'src/modules/transaction/dto/transaction-response.dto';

// Enums
export enum StakeCreatedBy {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export enum WithdrawalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

// Query DTO
export class UserStakingPackageQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: DefaultSortField, default: DefaultSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(DefaultSortField)
  sortBy?: DefaultSortField = DefaultSortField.CREATED_AT

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  packageId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAtFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAtTo?: string;
}


export class UserStakingPackageResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  packageId: string;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  toinAmount?: number;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  usdtAmount?: number;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  bonusAmount?: number;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  dailyProfitPercent?: number;

  @Expose()
  @ApiPropertyOptional()
  startDate?: Date;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  totalProfit?: number;

  @Expose()
  @ApiPropertyOptional()
  initialEndDate?: Date;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  recurringProfitDays?: number;

  @Expose()
  @ApiPropertyOptional()
  previousRewardDate?: Date;

  @Expose()
  @ApiPropertyOptional()
  nextRewardDate?: Date;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  usdConversionRate?: number;

  @Expose()
  @ApiPropertyOptional()
  stakedToin?: boolean;

  @Expose()
  @ApiPropertyOptional()
  isBonusDone?: boolean;

  @Expose()
  @ApiPropertyOptional()
  isLevelingBonusDone?: boolean;

  @Expose()
  @ApiPropertyOptional()
  submitForWithdraw?: boolean;

  @Expose()
  @ApiPropertyOptional()
  withdrawalStatus?: string;

  @Expose()
  @ApiPropertyOptional()
  isActive?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => Number)
  minimumDurationInDays?: number;

  @Expose()
  @ApiPropertyOptional()
  createdAt?: Date;

  @Expose()
  @ApiPropertyOptional()
  createdBy?: string;

  @Expose()
  @ApiPropertyOptional()
  updatedAt?: Date;

  @Expose()
  @ApiPropertyOptional()
  updatedBy?: string;
  
  @Expose()
  @ApiPropertyOptional()
  remarks?: string

  // calculative fields
  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalToinDebitAmount: number

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalToinCreditAmount: number

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalUSDTDebitAmount: number

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalUSDTCreditAmount: number


  @Expose()
  @ApiProperty()
  @Type(() => Number)
  toinBalanceAmount: number

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  usdtBalanceAmount: number

  @Expose()
  @ApiProperty({ enum: StakeCreatedBy })
  stakeCreatedBy: StakeCreatedBy;

  // Relations
  @Expose()
  @Type(() => StakingPackageResponseDto)
  @ApiPropertyOptional({ type: () => StakingPackageResponseDto })
  package?: StakingPackageResponseDto;

  @Expose()
  @Type(() => WithdrawalRequestResponseDto)
  @ApiPropertyOptional({ type: () => [WithdrawalRequestResponseDto] })
  withdrawalRequests?: WithdrawalRequestResponseDto[];

  @Expose()
  @Type(() => StakingAdjustmentResponseDto)
  @ApiPropertyOptional({ type: () => [StakingAdjustmentResponseDto] })
  stakingAdjustments?: StakingAdjustmentResponseDto[];

  @Expose()
  @Type(() => UserResponseDto)
  @ApiPropertyOptional({ type: () => UserResponseDto })
  user?: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  @Transform(({ obj }) => obj.creator)
  @ApiPropertyOptional({ type: () => UserResponseDto })
  stakedBy?: UserResponseDto

  @Expose()
  @Type(() => TransactionResponseDto)
  @ApiPropertyOptional({ type: () => [TransactionResponseDto] })
  transactions?: TransactionResponseDto[];

}