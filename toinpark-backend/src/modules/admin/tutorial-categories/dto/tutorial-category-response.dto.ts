import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TutorialCategoryResponseDto {
  @ApiProperty({ example: '1' })
  @Transform(({ value }) => value.toString())
  @Expose()
  id: string;

  @ApiProperty({ example: 'Web Development' })
  @Expose()
  name: string;

  @ApiPropertyOptional({ example: 'Category for web-related tutorials' })
  @Expose()
  description?: string;

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
