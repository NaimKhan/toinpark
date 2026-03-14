import {
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  MaxLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsFutureDate } from 'src/common/decorators/is-future-date.decorator';

export enum EventType {
  CONFERENCE = 'CONFERENCE',
  MEETUP = 'MEETUP',
  WORKSHOP = 'WORKSHOP',
  WEBINAR = 'WEBINAR',
  NETWORKING = 'NETWORKING',
  OTHER = 'OTHER',
}

export class CreateCommunityEventDto {
  @ApiProperty({
    description: 'Event title',
    example: 'Annual Tech Conference 2025',
    maxLength: 255,
  })

  @MaxLength(255)
  @IsString({ message: 'Event title must be a string' })
  @IsNotEmpty({ message: 'Event title should not be empty' })
  title: string;

  @ApiPropertyOptional({
    description: 'Event description',
    example: 'Join us for the biggest tech conference of the year',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Event date and time',
    example: '2025-12-31T18:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  @IsFutureDate({ message: 'Event date must be a future date' })
  eventDate?: string;

  @ApiPropertyOptional({
    description: 'Event address',
    example: '123 Tech Street, Silicon Valley, CA 94000',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;

  @ApiPropertyOptional({
    description: 'Google Maps or location link',
    example: 'https://maps.google.com/?q=123+Tech+Street',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  mapLink?: string;

  @ApiPropertyOptional({
    description: 'Event registration or info link',
    example: 'https://techconf.com/register',
    maxLength: 500,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  eventLink?: string;


  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Banner image file (JPEG, PNG, WebP, max 5MB)',
    required: false,  // Add this
  })
  bannerImage?: any;

  @ApiPropertyOptional({
    description: 'Type of event',
    example: EventType.CONFERENCE,
    enum: EventType,
  })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;

  @ApiPropertyOptional({
    description: 'Location name',
    example: 'Tech Convention Center',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  locationName?: string;

  @ApiPropertyOptional({
    description: 'Event location details',
    example: 'Main Hall, 2nd Floor',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  eventLocation?: string;

}