import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Expose, Transform, Type } from 'class-transformer';

export class StakingPackagePlanResponseDto {
    @ApiProperty({ example: 'ae4b3f3a-ff12-4cb7-9b1e-b53a6c99a211' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Starter Plan' })
    @Expose()
    name: string;

    @ApiPropertyOptional({ example: 'This plan gives 2% daily profit' })
    @Expose()
    description?: string | null;

    @ApiProperty({ example: '2.50' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    dailyProfitPercent: number | null;

    @ApiProperty({ example: '100.00' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    bonusAmount: number | null;

    @ApiProperty({ example: true })
    @Expose()
    isActive: boolean;

    @ApiProperty({ example: '2025-01-01T10:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiPropertyOptional({ example: 'system' })
    @Transform(({ value }) => value?.toString())
    @Expose()
    createdBy?: string | null;

    @ApiPropertyOptional({ example: '2025-01-05T12:00:00.000Z' })
    @Expose()
    updatedAt?: Date | null;

    @ApiPropertyOptional({ example: 'admin' })
    @Transform(({ value }) => value?.toString())
    @Expose()
    updatedBy?: string | null;

    @ApiPropertyOptional({ example: null })
    @Expose()
    deletedAt?: Date | null;

    @ApiPropertyOptional({ example: null })
    @Transform(({ value }) => value?.toString())
    @Expose()
    deletedBy?: string | null;

    @ApiProperty({ example: '5000.00' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    maxToinAmount: number;

    @ApiProperty({ example: '100.00' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    minToinAmount: number;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    minimumDurationInDays: number | null;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    recurringProfitDays: number | null;

    @ApiProperty({ example: '0.00' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    totalToinPurchasedWithUSD: number;
}

export class UserStakingPackageDTO {
  id                  : String    
  userId              : String    
  packageId           : String    
  transactionId       : String   
  toinAmount          : Decimal  
  bonusAmount         : Decimal  
  dailyProfitPercent  : Decimal  
  startDate           : Date 
  totalProfit         : Decimal  
  initialEndDate      : Date 
  recurringProfitDays : number      
  previousRewardDate  : Date 
  nextRewardDate      : Date 
  usdConversionRate   : Decimal  
  stakedToin          : Boolean  
  isBonusDone         : Boolean  
  isLevelingBonusDone : Boolean  
  submitForWithdraw   : Boolean  
  withdrawalStatus    : String   
  isActive            : Boolean  
  createdAt           : Date 
  createdBy           : String   
  updatedAt           : Date 
  updatedBy           : String   
  deletedAt           : Date 
  deletedBy           : String   
}
