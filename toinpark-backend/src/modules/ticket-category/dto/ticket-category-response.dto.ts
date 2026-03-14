import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TicketCategoryResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Technical Support' })
  @Expose()
  name: string;

  @ApiProperty({ example: true })
  @Expose()
  isActive: boolean;

  @ApiProperty({ example: '2024-11-13T10:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @Expose()
  createdBy?: string;

  @ApiProperty({ example: '2024-11-13T10:00:00.000Z', required: false })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @Expose()
  updatedBy?: string;
}