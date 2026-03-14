import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transaction } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { TransactionResponseDto } from 'src/modules/transaction/dto/transaction-response.dto';
import { UserWalletResponseDto } from './user-wallet-response.dto';

export class MemberProfileDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiPropertyOptional()
  @Expose()
  firstName?: string;

  @ApiPropertyOptional()
  @Expose()
  lastName?: string;

  @ApiPropertyOptional()
  @Expose()
  dateOfBirth?: Date;

  @ApiPropertyOptional()
  @Expose()
  gender?: string;

  @ApiPropertyOptional()
  @Expose()
  profileImageUrl?: string;

  @ApiPropertyOptional()
  @Expose()
  bio?: string;

  @ApiPropertyOptional()
  @Expose()
  addressLine1?: string;

  @ApiPropertyOptional()
  @Expose()
  addressLine2?: string;

  @ApiPropertyOptional()
  @Expose()
  city?: string;

  @ApiPropertyOptional()
  @Expose()
  zipCode?: string;

  @ApiPropertyOptional()
  @Expose()
  countryId?: string;

  @ApiPropertyOptional()
  @Expose()
  stateId?: string;
}

export class MemberResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiPropertyOptional()
  @Expose()
  email?: string;

  @ApiPropertyOptional()
  @Expose()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @Expose()
  phoneVerifiedAt?: Date;

  @ApiProperty()
  @Expose()
  emailVerified: boolean;

  @ApiPropertyOptional()
  @Expose()
  emailVerifiedAt?: Date;

  @ApiProperty()
  @Expose()
  emailChangingCount: number;

  @ApiProperty()
  @Expose()
  phoneVerified: boolean;

  @ApiProperty()
  @Expose()
  phoneChangingCount: number;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  userRole: string;

  @ApiProperty()
  @Expose()
  toinAccountNumber: string;

  @ApiProperty()
  @Expose()
  referralCode: string;

  @ApiPropertyOptional()
  @Expose()
  referrerId?: string;

  // calculated field
  @ApiPropertyOptional()
  @Expose()
  sponsorToinAccountNumber?: string; // this will hold the referrer's toinAccountNumber

  @ApiPropertyOptional()
  @Expose()
  sponsorName?: string; // this will hold the referrer's name

  @ApiProperty()
  @Expose()
  totalReferred: number;

  @ApiProperty()
  @Expose()
  totalToinCredit: number

  @ApiProperty()
  @Expose()
  totalToinDebit: number
  
  @ApiProperty()
  @Expose()
  totalUsdtCredit: number

  @ApiProperty()
  @Expose()
  totalUsdtDebit: number

  @ApiProperty()
  @Expose()
  directMemberCount: number;

  @ApiProperty()
  @Expose()
  indirectMemberCount: number;

  @ApiProperty()
  @Expose()
  totalPlatformFeeUsdt: number;

  @ApiProperty()
  @Expose()
  isKycVerified: boolean;

  @ApiPropertyOptional()
  @Expose()
  kycVerifiedAt?: Date;

  @ApiPropertyOptional()
  @Expose()
  activationDate?: Date;

  @ApiPropertyOptional()
  @Expose()
  lastLoginAt?: Date;

  @ApiPropertyOptional()
  @Expose()
  lastLoginIp?: string;

  @ApiProperty()
  @Expose()
  loginCount: number;

  @ApiProperty()
  @Expose()
  twoFactorEnabled: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional()
  @Expose()
  updatedAt?: Date;

  @ApiPropertyOptional({ type: MemberProfileDto })
  @Expose()
  userProfile?: MemberProfileDto;

  // @ApiPropertyOptional({ type: [TransactionResponseDto] })
  // @Type(() => TransactionResponseDto)
  // @Expose({ name: 'userTransaction' })
  // transactions?: TransactionResponseDto[];


  @ApiPropertyOptional({ type: [MemberResponseDto] })
  @Type(() => MemberResponseDto)
  @Expose({ name: 'directMembers' })
  directMembers?: MemberResponseDto[];

  @ApiPropertyOptional({ type: UserWalletResponseDto })
  @Type(() => UserWalletResponseDto)
  @Expose({ name: 'userWallet' })
  userWallet?: UserWalletResponseDto[];

}