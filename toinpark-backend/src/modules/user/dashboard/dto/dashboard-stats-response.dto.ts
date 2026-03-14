// src/modules/dashboard/dto/dashboard-stats-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AmountDto {
  @ApiProperty({ example: '1000.00', description: 'Amount in TOIN' })
  @Expose()
  toinAmount: number;

  @ApiProperty({ example: '500.00', description: 'Amount in USDT' })
  @Expose()
  usdtAmount: number;
}

export class WithdrawalAmountDto {
  @ApiProperty({ example: '100.00', description: 'Pending withdrawal amount' })
  @Expose()
  pending: number;

  @ApiProperty({ example: '500.00', description: 'Approved withdrawal amount' })
  @Expose()
  approved: number;

  @ApiProperty({ example: '600.00', description: 'Total withdrawal amount' })
  @Expose()
  total: number;
}

export class DashboardStatsResponseDto {
  @ApiProperty({ example: 1500, description: 'Total registered users count' })
  @Expose()
  totalRegisteredUsers: number;

  @ApiProperty({ type: AmountDto, description: 'Total investment amount' })
  @Expose()
  @Type(() => AmountDto)
  totalInvestmentAmount: AmountDto;

  @ApiProperty({ type: AmountDto, description: 'Level income from referrals' })
  @Expose()
  @Type(() => AmountDto)
  levelIncome: AmountDto;

  @ApiProperty({ type: AmountDto, description: 'ROI level income from staking rewards' })
  @Expose()
  @Type(() => AmountDto)
  roiLevelIncome: AmountDto;

  @ApiProperty({ type: WithdrawalAmountDto, description: 'Total withdrawal amounts' })
  @Expose()
  @Type(() => WithdrawalAmountDto)
  totalWithdrawalAmount: WithdrawalAmountDto;
}


export class MonthlyUserRegistrationDto {
  @ApiProperty({ example: 2024, description: 'Year' })
  @Expose()
  year: number;

  @ApiProperty({ example: 1, description: 'Month (1-12)' })
  @Expose()
  month: number;

  @ApiProperty({ example: 'January', description: 'Month name' })
  @Expose()
  monthName: string;

  @ApiProperty({ example: 150, description: 'Number of users registered' })
  @Expose()
  count: number;
}

export class UserRegistrationGraphResponseDto {
  @ApiProperty({ type: [MonthlyUserRegistrationDto], description: 'Monthly registration data' })
  @Expose()
  @Type(() => MonthlyUserRegistrationDto)
  data: MonthlyUserRegistrationDto[];

  @ApiProperty({ example: 1500, description: 'Total users in the period' })
  @Expose()
  totalUsers: number;
}