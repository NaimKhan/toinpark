import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsEnum,
  Min,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price_amount: number;

  @IsString()
  @IsNotEmpty()
  price_currency: string;

  @IsString()
  @IsNotEmpty()
  pay_currency: string;

  @IsOptional()
  @IsUrl()
  ipn_callback_url?: string;

  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsString()
  order_description?: string;

  @IsOptional()
  @IsUrl()
  success_url?: string;

  @IsOptional()
  @IsUrl()
  cancel_url?: string;

  @IsOptional()
  @IsUrl()
  partially_paid_url?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  payout_extra_id?: number;

  @IsOptional()
  @IsString()
  payout_currency?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fixed_rate?: number;

  @IsOptional()
  @IsBoolean()
  is_fixed_rate?: boolean;

  @IsOptional()
  @IsBoolean()
  is_fee_paid_by_user?: boolean;
}

export class CreateInvoiceDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price_amount: number;

  @IsString()
  @IsNotEmpty()
  price_currency: string;

  @IsOptional()
  @IsString()
  pay_currency?: string;

  @IsOptional()
  @IsUrl()
  ipn_callback_url?: string;

  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsString()
  order_description?: string;

  @IsOptional()
  @IsUrl()
  success_url?: string;

  @IsOptional()
  @IsUrl()
  cancel_url?: string;

  @IsOptional()
  @IsUrl()
  partially_paid_url?: string;

  @IsOptional()
  @IsBoolean()
  is_fixed_rate?: boolean;

  @IsOptional()
  @IsBoolean()
  is_fee_paid_by_user?: boolean;
}

export class GetMinimumAmountDto {
  @IsString()
  @IsNotEmpty()
  currency_from: string;

  @IsOptional()
  @IsString()
  currency_to?: string;
}

export class GetEstimatedPriceDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency_from: string;

  @IsString()
  @IsNotEmpty()
  currency_to: string;
}

export class GetPaymentListDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsEnum(['created_at', 'updated_at'])
  sortBy?: 'created_at' | 'updated_at';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderBy?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  dateFrom?: string;

  @IsOptional()
  @IsString()
  dateTo?: string;
}

class FeeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  depositFee?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  serviceFee?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  withdrawalFee?: number;
}



export class IpnCallbackDto {
  @ApiProperty({ example: 4562717043 })
  @IsNumber()
  payment_id: number;

  @ApiPropertyOptional({ example: 5527143435 })
  @IsOptional()
  @IsNumber()
  invoice_id?: number;

  @ApiProperty({
    example: 'finished',
    enum: ['waiting', 'confirming', 'confirmed', 'sending', 'partially_paid', 'finished', 'failed', 'refunded', 'expired'],
  })
  @IsString()
  payment_status: string;

  @ApiProperty({ example: '0xc505B08a8C58E3FCA755cF40F360e3e2A972bc7A' })
  @IsString()
  pay_address: string;

  @ApiProperty({ example: 26 })
  @IsNumber()
  price_amount: number;

  @ApiProperty({ example: 'usdtbsc' })
  @IsString()
  price_currency: string;

  @ApiProperty({ example: 26 })
  @IsNumber()
  pay_amount: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  actually_paid?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  actually_paid_at_fiat?: number;

  @ApiProperty({ example: 'usdtbsc' })
  @IsString()
  pay_currency: string;

  @ApiPropertyOptional({ example: 'MKUWXB6X_QS-YI-6' })
  @IsOptional()
  @IsString()
  order_id?: string;

  @ApiPropertyOptional({ example: 'Staking: Starter Plan - 2600 TOIN' })
  @IsOptional()
  @IsString()
  order_description?: string;

  @ApiPropertyOptional({ example: 0.00029091 })
  @IsOptional()
  @IsNumber()
  outcome_amount?: number;

  @ApiPropertyOptional({ example: 'btc' })
  @IsOptional()
  @IsString()
  outcome_currency?: string;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  parent_payment_id?: number | null;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  payin_extra_id?: string | null;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  payment_extra_ids?: any | null;

  @ApiPropertyOptional({ example: '5674381329' })
  @IsOptional()
  @IsString()
  purchase_id?: string;

  @ApiPropertyOptional({ type: FeeDto })
  @IsOptional()
  @IsObject()
  fee?: FeeDto;
}


export class PayoutWithdrawalDto {
  @IsString()
  address: string;

  @IsString()
  currency: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  ipn_callback_url?: string;

  @IsOptional()
  @IsNumber()
  fiat_amount?: number;

  @IsOptional()
  @IsString()
  fiat_currency?: string;

  @IsOptional()
  @IsString()
  extra_id?: string;
}

export class CreatePayoutDto {
  @IsOptional()
  @IsString()
  ipn_callback_url?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PayoutWithdrawalDto)
  withdrawals: PayoutWithdrawalDto[];
}
