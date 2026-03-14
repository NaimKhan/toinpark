import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ReferralLevelResponseDto {
    @ApiProperty({ example: '1' })
    @Transform(({ value }) => value.toString())
    @Expose()
    id: string;

    @ApiProperty({ example: 'Gold' })
    @Expose()
    levelName: string;

    @ApiPropertyOptional({ example: 120 })
    @Expose()
    totalData?: number;

    @ApiProperty({ example: 10 })
    @Expose()
    referralBonusPercentage: number;

    @ApiProperty({ example: 1 })
    @Expose()
    levelNumber: number;

    @ApiProperty({ example: true })
    @Expose()
    isActive: boolean;

    @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiPropertyOptional({ example: '123' })
    @Transform(({ value }) => value?.toString())
    @Expose()
    createdBy?: string | null;

    @ApiPropertyOptional({ example: '2025-01-02T00:00:00.000Z' })
    @Expose()
    updatedAt?: Date | null;

    @ApiPropertyOptional({ example: '123' })
    @Transform(({ value }) => value?.toString())
    @Expose()
    updatedBy?: string | null;
}
