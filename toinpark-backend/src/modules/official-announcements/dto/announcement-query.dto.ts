import { ApiPropertyOptional } from "@nestjs/swagger";
import { AudienceType } from "@prisma/client";
import { IsEnum, IsString, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common/dto";
import { AnnouncementSortField } from "./announcement-sort-field.enum";


export class AnnouncementQueryDto extends PaginationQueryDto {

      @ApiPropertyOptional({ enum: AnnouncementSortField, default: AnnouncementSortField.CREATED_AT })
      @IsOptional()
      @IsEnum(AnnouncementSortField)
      sortBy?: AnnouncementSortField = AnnouncementSortField.CREATED_AT;

      @ApiPropertyOptional({
        description: 'Filter by audience type',
        enum: AudienceType,
      })
      @IsOptional()
      @IsEnum(AudienceType)
      audienceType?: AudienceType;

      @ApiPropertyOptional({
        description: 'Filter by active status',
        example: 'true',
        enum: ['true', 'false'],
      })
      @IsOptional()
      @IsString()
      isActive?: string;
}