import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { MediaDto } from 'src/core/storage/dto/media.dto';

export class CreatorDto {
  @ApiProperty({ example: '1' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  id: string;

  @ApiProperty({ example: 'john_doe' })
  @Expose()
  username: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @Expose()
  email?: string;
}

export class CommunityEventResponseDto {
  @ApiProperty({ example: '1', description: 'Event ID' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  id: string;

  @ApiPropertyOptional({ example: 'Annual Tech Conference 2025' })
  @Expose()
  title?: string;

  @ApiPropertyOptional({ example: 'Join us for the biggest tech conference' })
  @Expose()
  description?: string;

  @ApiPropertyOptional({ example: '2025-12-31T18:00:00.000Z' })
  @Expose()
  eventDate?: Date;

  @ApiPropertyOptional({ example: '123 Tech Street, Silicon Valley' })
  @Expose()
  address?: string;

  @ApiPropertyOptional({ example: 'https://maps.google.com/?q=123+Tech+Street' })
  @Expose()
  mapLink?: string;

  @ApiPropertyOptional({ example: 'https://techconf.com/register' })
  @Expose()
  eventLink?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/events/banner.jpg' })
  @Expose()
  bannerImageUrl?: string;

  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  media: MediaDto | null

  @ApiPropertyOptional({ example: 'CONFERENCE' })
  @Expose()
  eventType?: string;

  @ApiProperty({ example: false })
  @Expose()
  isFeatured: boolean;

  @ApiPropertyOptional({ example: 'Tech Convention Center' })
  @Expose()
  locationName?: string;

  @ApiPropertyOptional({ example: 'Main Hall, 2nd Floor' })
  @Expose()
  eventLocation?: string;

  @ApiProperty({ example: true })
  @Expose()
  isActive: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional({ example: '123' })
  @Expose()
  @Transform(({ value }) => value?.toString() || null)
  createdBy?: string | null;

  @ApiPropertyOptional({ example: '2025-01-02T00:00:00.000Z' })
  @Expose()
  updatedAt?: Date | null;

  @ApiPropertyOptional({ example: '123' })
  @Expose()
  @Transform(({ value }) => value?.toString() || null)
  updatedBy?: string | null;

  @ApiPropertyOptional({ example: '2025-01-03T00:00:00.000Z' })
  @Expose()
  deletedAt?: Date | null;

  @ApiPropertyOptional({ example: '123' })
  @Expose()
  @Transform(({ value }) => value?.toString() || null)
  deletedBy?: string | null;

  @ApiPropertyOptional({ type: CreatorDto })
  @Expose()
  @Type(() => CreatorDto)
  Creator?: CreatorDto | null;
}