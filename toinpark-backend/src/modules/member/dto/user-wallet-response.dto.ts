import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserWalletResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  version: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  walletBalance: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalStakingBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalClaimBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalEntryBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalKycBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalLevelingBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalReferral: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalCommissionBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalStaking: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalChallengeBonus: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalWithdrawals: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalRefund: number;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  totalVoid: number;

}