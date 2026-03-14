import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export class StakingPackageResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty({ type: 'number' })
  @Expose()
  @Type(() => Number)
  dailyProfitPercent: number;

  @ApiProperty({ type: 'number' })
  @Expose()
  @Type(() => Number)
  bonusAmount: number;


  @ApiProperty({ type: 'number' })
  @Expose()
  @Type(() => Number)
  maxToinAmount: number;

  @ApiProperty({ type: 'number' })
  @Expose()
  @Type(() => Number)
  minToinAmount: number;

  @ApiProperty()
  @Expose()
  minimumDurationInDays: number;

  @ApiProperty()
  @Expose()
  recurringProfitDays: number;

  @ApiProperty({ type: 'number' })
  @Expose()
  @Type(() => Number)
  totalToinPurchasedWithUSD: number;

  @ApiProperty({ type: 'number' })
  @Expose()
  @Type(() => Number)
  totalToinStaked: number;


  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt?: Date;
}