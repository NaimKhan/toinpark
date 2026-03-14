import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { ReferralLevelResponseDto } from 'src/modules/referral_level/dto/referral-level-response.dto';
import { AmountTypeEnum } from 'src/common/enums/amount-type-enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { UserStakingPackageResponseDto } from 'src/modules/user-staking-package/dto/user-staking-package.dto';

export class TransactionResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  transactionAutoId: string;

  @Expose()
  @ApiProperty()
  trxType?: TransactionType;

  @Expose()
  @Type(() => Number)
  @ApiProperty()
  toinAmount: number;

  @Expose()
  @Type(() => Number)
  @ApiProperty()
  usdtAmount: number;

  @Expose()
  @Type(() => Number)
  @ApiProperty()
  usdtConversionRate: number;

  @Expose()
  @ApiProperty()
  trxSuccessDatetime?: Date;

  @Expose()
  @ApiProperty()
  trxPaymentGateway?: string;

  @Expose()
  @ApiProperty()
  trxPaymentGatewayReferenceId?: string;

  @Expose()
  @ApiProperty()
  trxPaymentGatewayResponse?: string;

  @Expose()
  @ApiProperty()
  trxStatus?: TransactionStatus;

  @Expose()
  @ApiProperty()
  trxNote?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;
  
  @Expose()
  @ApiProperty()
  createdBy: string

  @Expose()
  @ApiProperty()
  updatedAt?: Date;

  // calculative fields
  @Expose()
  @ApiProperty()
  amountType: AmountTypeEnum;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  toinBalanceAmount: number


  @Expose()
  @ApiProperty()
  @Type(() => Number)
  usdtBalanceAmount: number


  // relationship fields
  @Expose()
  userId: string;
  
  @Expose()
  levelId?: string;

  @Expose()
  userStakingPackageId?: string;

  @Expose()
  stakingAdjustmentId?: string;


  @Expose({ name: 'user' })
  @Type(() => UserResponseDto)
  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;

  @Expose({ name: 'referralLevel' })
  @Type(() => ReferralLevelResponseDto)
  @ApiProperty({ type: () => ReferralLevelResponseDto })
  referralLevel: ReferralLevelResponseDto

  @Expose({ name: 'userStakingPackage' })
  @Type(() => UserStakingPackageResponseDto)
  @ApiProperty({ type: () => UserStakingPackageResponseDto })
  userStakingPackage: UserStakingPackageResponseDto

}
