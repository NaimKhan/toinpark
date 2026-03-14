import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { EventType } from './create-community-event.dto';
import { CommunityEventSortField } from './community-event-sort-field.enum';

export class CommunityEventQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: CommunityEventSortField, default: CommunityEventSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(CommunityEventSortField)
  sortBy?: CommunityEventSortField = CommunityEventSortField.CREATED_AT;
  
  @ApiPropertyOptional({
    description: 'Filter by event type',
    enum: EventType,
    example: EventType.CONFERENCE,
  })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: 'true',
    enum: ['true', 'false'],
  })
  @IsOptional()
  @IsString()
  isActive?: string;

}


export class FeaturedCommunityEventQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: CommunityEventSortField, default: CommunityEventSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(CommunityEventSortField)
  sortBy?: CommunityEventSortField = CommunityEventSortField.CREATED_AT;


  @ApiPropertyOptional({
    description: 'Filter by event type',
    enum: EventType,
    example: EventType.CONFERENCE,
  })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;
}