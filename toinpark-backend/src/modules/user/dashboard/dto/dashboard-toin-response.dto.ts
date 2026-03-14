import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { Expose, Transform, Type } from "class-transformer";
import { PaginationQueryDto } from "src/common/dto";

export class DashboardToinResponseDto {

    @ApiProperty({ example: 'e6953734-9e02-4a72-9677-e24306cfa3e5' })
    @Expose()
    id: string;

    @ApiProperty({ example: '1000.0000' })
    @Expose()
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    walletBalance: number;

    @ApiProperty({ example: '0.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalStakingBonus: number;

    @ApiProperty({ example: '0.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalClaimBonus: number;

    @ApiProperty({ example: '50.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalEntryBonus: number;

    @ApiProperty({ example: '50.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalKycBonus: number;

    @ApiProperty({ example: '50.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalLevelingBonus: number;

    @ApiProperty({ example: '100.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalReferral: number;

    @ApiProperty({ example: '600.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalReward: number;

    @ApiProperty({ example: '100.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalStaking: number;

    @ApiProperty({ example: '100.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalChallengeBonus: number;

    @ApiProperty({ example: '100.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalCommissionBonus: number;

    @ApiProperty({ example: '100.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalWithdrawals: number;

    @ApiProperty({ example: '100.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalRefund: number;

    @ApiProperty({ example: '2025-11-11T04:58:38.437Z' })
    @Expose()
    createdAt: Date;

    @ApiPropertyOptional({ example: null })
    @Transform(({ value }) => value?.toString())
    @Expose()
    createdBy?: string | null;

}

export class DashboardReferralMileStoneResponseDto {
    @ApiProperty({ example: 'f3dbf31a-9e55-4f63-937e-74c5271f9081' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Bronze' })
    @Expose()
    referralName: string;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    toinAmount: number;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    targetPerson: number;

    @ApiProperty({ example: true })
    @Expose()
    isActive: boolean;

    @ApiProperty({ example: '2025-01-01T12:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiPropertyOptional({ example: 'system' })
    @Transform(({ value }) => value ?? null)
    @Expose()
    createdBy?: string | null;

    @ApiPropertyOptional({ example: '2025-01-02T12:00:00.000Z' })
    @Expose()
    updatedAt?: Date | null;

    @ApiPropertyOptional({ example: 'admin' })
    @Transform(({ value }) => value ?? null)
    @Expose()
    updatedBy?: string | null;

    @ApiPropertyOptional({ example: null })
    @Expose()
    deletedAt?: Date | null;

    @ApiPropertyOptional({ example: null })
    @Transform(({ value }) => value ?? null)
    @Expose()
    deletedBy?: string | null;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    perUserMilestone: number;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    sequenceNumber: number;

    @ApiPropertyOptional({ example: 'Reward for inviting 3 friends' })
    @Expose()
    description?: string | null;
}
export class AirDropEventDTO {
    @ApiProperty({ example: 'Bronze' })
    @Expose()
    eventName: string;

    @ApiProperty({ example: '300.0000' })
    // @Type(() => Number)
    // @Transform(({ value }) => {
    //     if (value === null || value === undefined) return 0;
    //     if (typeof value === 'object' && value.d) return parseFloat(value.toString());
    //     return Number(value);
    // })
    // @Expose()
    totalToinAmount: Decimal;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    usesToinAmount: number;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    usesToinPercent: number;

}


export class LeaderboardRow {
    @ApiProperty({ example: 'e6953734-9e02-4a72-9677-e24306cfa3e5' })
    @Expose()
    userId: string;

    @ApiProperty({ example: 'John' })
    @Expose()
    firstName: string | null;

    @ApiProperty({ example: 'Doe' })
    @Expose()
    lastName: string | null;

    @Expose()
    profileImageUrl: string | null;

    @ApiProperty({ example: '300.0000' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.d) return parseFloat(value.toString());
        return Number(value);
    })
    @Expose()
    totalToin: any; // keep as Decimal; or string/number if you convert
}

export class LeaderboardRowResponseDto extends PaginationQueryDto {

}