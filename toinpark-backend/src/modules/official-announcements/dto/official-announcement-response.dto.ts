import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { AudienceType } from '@prisma/client';

export class OfficialAnnouncementResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Transform(({ value }) => value.toString())
  @Expose()
  id: string;

  @ApiPropertyOptional({ example: 'System Maintenance Notice' })
  @Expose()
  title?: string | null;

  @ApiPropertyOptional({ example: 'We will be performing system maintenance...' })
  @Expose()
  message?: string | null;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  @Expose()
  startDate?: Date | null;

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59.000Z' })
  @Expose()
  endDate?: Date | null;

  @ApiProperty({ example: true })
  @Expose()
  isActive: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional({ example: '2025-01-02T00:00:00.000Z' })
  @Expose()
  updatedAt?: Date | null;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Transform(({ value }) => value?.toString())
  @Expose()
  categoryId: string;

  @ApiProperty({ enum: AudienceType, example: AudienceType.MEMBER })
  @Expose()
  audienceType: AudienceType;

  @ApiPropertyOptional({ example: '123' })
  @Transform(({ value }) => value?.toString())
  @Expose()
  createdBy?: string | null;

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

