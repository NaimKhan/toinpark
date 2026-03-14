import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type} from 'class-transformer';

export class ReferralMilestoneResponseDto {
  @ApiProperty({ example: '1' })
  @Transform(({ value }) => value.toString())
  @Expose()
  id: string;

  @ApiProperty({ example: 'Bronze Milestone' })
  @Expose()
  referralName: string;

  @ApiPropertyOptional({ example: 'Reward for inviting 5 users' })
  @Expose()
  description?: string;

  @ApiProperty({ example: 100.5 })
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.d) return parseFloat(value.toString());
    return Number(value);
  })
  toinAmount: number;

  @ApiProperty({ example: 5 })
  @Expose()
  targetPerson: number;

  @ApiProperty({ example: 2 })
  @Expose()
  perUserMilestone: number;

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

  @ApiPropertyOptional({ example: '2025-01-03T00:00:00.000Z' })
  @Expose()
  deletedAt?: Date | null;

  @ApiPropertyOptional({ example: '123' })
  @Transform(({ value }) => value?.toString())
  @Expose()
  deletedBy?: string | null;
}
