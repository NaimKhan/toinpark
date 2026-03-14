import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MediaDto {
  @ApiProperty({
    description: 'Full URL to access the file',
    example: 'http://localhost:3000/uploads/events/1234-abc.jpg',
  })
  @Expose()
  url: string;

  @ApiProperty({
    description: 'Generated filename',
    example: '1234567890-abc123.jpg',
  })
  @Expose()
  filename: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 1024000,
  })
  @Expose()
  size: number;

  @ApiProperty({
    description: 'MIME type of the file',
    example: 'image/jpeg',
  })
  @Expose()
  mimeType: string;

  @ApiProperty({
    description: 'File extension',
    example: 'jpg',
  })
  @Expose()
  extension: string;

  @ApiPropertyOptional({
    description: 'File creation timestamp',
  })
  @Expose()
  createdAt?: Date;
}