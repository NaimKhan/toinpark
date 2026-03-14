// transaction-response.dto.ts
import { Expose, Type, Transform } from 'class-transformer';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { AmountTypeEnum } from 'src/common/enums/amount-type-enum';
import { MediaDto } from 'src/core/storage/dto/media.dto';

/* =========================================================
   ✅ Reusable Decimal → number transformer (GLOBAL USE)
========================================================= */
export const ToNumber = (defaultValue = 0) =>
    Transform(({ value }) => {
        if (value === null || value === undefined || value === '') return defaultValue;

        // Prisma Decimal or Decimal-like
        if (typeof value === 'object' && typeof value.toString === 'function') {
            const n = Number(value.toString());
            return Number.isFinite(n) ? n : defaultValue;
        }

        const n = Number(value);
        return Number.isFinite(n) ? n : defaultValue;
    });

/* =========================================================
   Country DTO
========================================================= */
export class CountryDto {
    @Expose() id: string;
    @Expose() code: string;
    @Expose() name: string;
}

/* =========================================================
   User Profile DTO
========================================================= */
export class UserProfileDto {
    @Expose() id: string;

    @Expose() firstName?: string | null;
    @Expose() lastName?: string | null;

    @Expose() dateOfBirth?: Date | null;
    @Expose() gender?: string | null;

    @Expose() profileImageUrl?: string | null;
    @Expose() media?: MediaDto | null;
    @Expose() bio?: string | null;

    @Expose() addressLine1?: string | null;
    @Expose() addressLine2?: string | null;
    @Expose() city?: string | null;

    @Expose() stateId?: string | null;
    @Expose() countryId?: string | null;

    @Expose() zipCode?: string | null;

    @Expose() userId: string;

    @Expose({ name: 'country' })
    @Type(() => CountryDto)
    country?: CountryDto | null;
}

/* =========================================================
   User DTO
========================================================= */
export class TransactionUserDto {
    @Expose() id: string;

    @Expose() phoneNumber?: string | null;
    @Expose() email?: string | null;

    @Expose() emailVerified?: boolean;
    @Expose() emailVerifiedAt?: Date | null;

    @Expose() phoneVerified?: boolean;
    @Expose() phoneVerifiedAt?: Date | null;

    @Expose() username: string;
    @Expose() userRole?: string | null;
    @Expose() status?: string;

    @Expose() twoFactorEnabled?: boolean;
    @Expose() twoFactorSecret?: string | null;

    @Expose() lockoutEnabled?: boolean;
    @Expose() lockoutEnd?: Date | null;

    @Expose() accessFailedCount?: number;

    @Expose() referrerId?: string | null;
    @Expose() referralCode?: string;

    @Expose() lastLoginAt?: Date | null;
    @Expose() lastLoginIp?: string | null;

    @Expose() loginCount?: number;

    @Expose() isKycVerified?: boolean;
    @Expose() kycVerifiedAt?: Date | null;


    @Expose() toinAccountNumber?: string;
    @Expose() totalReferred?: number;

    @Expose()
    @Type(() => UserProfileDto)
    userProfile?: UserProfileDto | null;
}

/* =========================================================
   Referral Level DTO
========================================================= */
export class ReferralLevelDto {
    @Expose() id: string;
    @Expose() levelName: string;
    @Expose() referralBonusPercentage: number;
    @Expose() levelNumber: number;
}

/* =========================================================
   Staking Package DTO
========================================================= */
export class StakingPackagePlanDto {
    @Expose() id: string;
    @Expose() name: string;
    @Expose() description?: string | null;
}

/* =========================================================
   Referrer Transaction DTO (Self Join)
========================================================= */
export class ReferrerTransactionDto {
    @Expose() id: string;
    @Expose() transactionAutoId: string;
    @Expose() trxReferenceId?: string | null;

    @Expose() userId: string;
    @Expose() stakeId?: string | null;

    @Expose() trxType?: TransactionType | null;
    @Expose() trxStatus?: TransactionStatus | null;

    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) {
            return parseFloat(value.toString());
        }
        return Number(value);
    })
    toinAmount: number;

    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) {
            return parseFloat(value.toString());
        }
        return Number(value);
    })
    usdAmount: number;

    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) {
            return parseFloat(value.toString());
        }
        return Number(value);
    })
    usdConversionRate: number;

    @Expose() trxSuccessDatetime?: Date | null;

    @Expose() trxPaymentGateway?: string | null;
    @Expose() trxPaymentGatewayReferenceId?: string | null;
    @Expose() trxPaymentGatewayResponse?: string | null;

    @Expose() trxNote?: string | null;

    @Expose() isActive?: boolean;

    @Expose() createdAt?: Date;
    @Expose() createdBy?: string | null;

    @Expose() updatedAt?: Date | null;
    @Expose() updatedBy?: string | null;

    @Expose() deletedAt?: Date | null;
    @Expose() deletedBy?: string | null;

    @Expose() trxInitiateDatetime?: Date | null;
    @Expose() trxMessage?: string | null;

    @Expose() isLevelingBonusCalculated?: boolean;
    @Expose() levelName?: string | null;
    @Expose() referredUser?: string | null;

    @Expose({ name: 'transactionUser' })
    @Type(() => TransactionUserDto)
    user?: TransactionUserDto | null;
}

/* =========================================================
   Main Transaction Response DTO
========================================================= */
export class ReferenceTransactionResponseDto {
    @Expose() id: string;

    @Expose() transactionAutoId: string;
    @Expose() trxReferenceId?: string | null;

    @Expose() userId: string;
    @Expose() stakeId?: string | null;

    @Expose() trxType?: TransactionType | null;

    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) {
            return parseFloat(value.toString());
        }
        return Number(value);
    })
    toinAmount: number;

    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) {
            return parseFloat(value.toString());
        }
        return Number(value);
    })
    usdAmount: number;

    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) {
            return parseFloat(value.toString());
        }
        return Number(value);
    })
    usdConversionRate: number;

    @Expose() trxSuccessDatetime?: Date | null;

    @Expose() trxPaymentGateway?: string | null;
    @Expose() trxPaymentGatewayReferenceId?: string | null;
    @Expose() trxPaymentGatewayResponse?: string | null;

    @Expose() trxStatus?: TransactionStatus | null;
    @Expose() trxNote?: string | null;

    @Expose() isActive?: boolean;

    @Expose() createdAt?: Date;
    @Expose() createdBy?: string | null;

    @Expose() updatedAt?: Date | null;
    @Expose() updatedBy?: string | null;

    @Expose() deletedAt?: Date | null;
    @Expose() deletedBy?: string | null;

    @Expose() trxInitiateDatetime?: Date | null;
    @Expose() trxMessage?: string | null;

    @Expose() isLevelingBonusCalculated?: boolean;
    @Expose() levelName?: string | null;
    @Expose() referredUser?: string | null;
    @Expose() remark?: string | null;

    // Computed
    @Expose() amountType?: AmountTypeEnum;

    /** Relations */
    @Expose({ name: 'transactionUser' })
    @Type(() => TransactionUserDto)
    user?: TransactionUserDto | null;

    @Expose()
    @Type(() => ReferralLevelDto)
    transactionLeveling?: ReferralLevelDto | null;

    @Expose()
    @Type(() => StakingPackagePlanDto)
    transactionStakingPackage?: StakingPackagePlanDto | null;

    /** 🔁 Self Join */
    @Expose()
    @Type(() => ReferrerTransactionDto)
    referrerTransaction?: ReferrerTransactionDto | null;
}
