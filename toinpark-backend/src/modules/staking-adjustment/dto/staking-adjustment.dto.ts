import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { StakingAdjustmentSortField } from './staking-adjustment-sort-field.enum';
import { PaginationQueryDto } from 'src/common/dto';

export class StakingAdjustmentQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: StakingAdjustmentSortField,
    default: StakingAdjustmentSortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(StakingAdjustmentSortField)
  sortBy?: StakingAdjustmentSortField = StakingAdjustmentSortField.CREATED_AT;
}

export class StakingAdjustmentUserDto {
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

export class StakingAdjustmentTransactionDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  transactionAutoId: string;

  @ApiProperty()
  @Expose()
  trxType: string;

  @ApiProperty()
  @Expose()
  trxStatus: string;

  @ApiProperty({ example: 100.00 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  toinAmount: number;

  @ApiProperty({ example: 500.00 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtAmount: number;

  @ApiProperty({ example: 5.00 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtConversionRate: number;

  @ApiProperty()
  @Expose()
  trxNote: string;

  @ApiProperty()
  @Expose()
  trxSuccessDatetime: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}

export class StakingAdjustmentListItemDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  userStakingPackageId: string;

  @ApiProperty({ example: 100.00 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  toinAmount: number;

  @ApiProperty({ example: 500.00 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtAmount: number;

  @ApiProperty({ example: 5.00 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtConversionRate: number;

  @ApiProperty()
  @Expose()
  remark: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: StakingAdjustmentUserDto })
  @Expose()
  @Type(() => StakingAdjustmentUserDto)
  user: StakingAdjustmentUserDto;

  @Expose()
  @Type(() => StakingAdjustmentUserDto)
  @Transform(({ obj }) => obj.creator)
  adjustedBy: StakingAdjustmentUserDto;

  @ApiProperty({ type: StakingAdjustmentTransactionDto })
  @Expose()
  @Type(() => StakingAdjustmentTransactionDto)
  transaction: StakingAdjustmentTransactionDto;
}

export class StakingAdjustmentDeductDto {
  @ApiProperty({ example: 'ae4b3f3a-ff12-4cb7-9b1e-b53a6c99a211' })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'ae4b3f3a-ff12-4cb7-9b1e-b53a6c99a211' })
  @IsNotEmpty({ message: 'User Staking Package ID is required' })
  @IsString()
  userStakingPackageId: string;

  @ApiProperty({ example: 5000 })
  @IsNotEmpty({ message: 'TOIN amount is required' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  toinAmount: number;

  @ApiPropertyOptional({ example: 'Manual adjustment' })
  @IsString()
  @IsOptional()
  remark?: string;
}

export class StakingAdjustmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userStakingPackageId: string;

  @ApiProperty({ example: '100.00' })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  toinAmount: number;

  @ApiProperty({ example: '5000.00' })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtAmount: number;

  @ApiProperty({ example: '5000.00' })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtConversionRate: number;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  remark?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdBy: string;
}

export class PackageDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;
}

export class UserStakingPackageListItemDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  packageId: string;

  @ApiProperty({ example: 1000 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  toinAmount: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.toString)
      return Number(value.toString());
    return Number(value);
  })
  @Expose()
  usdtConversionRate: number;

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: PackageDto })
  @Type(() => PackageDto)
  @Expose()
  package: PackageDto;

  @ApiProperty({ type: StakingAdjustmentTransactionDto })
  @Type(() => StakingAdjustmentTransactionDto)
  @Expose()
  stakingTransaction: StakingAdjustmentTransactionDto;
}
