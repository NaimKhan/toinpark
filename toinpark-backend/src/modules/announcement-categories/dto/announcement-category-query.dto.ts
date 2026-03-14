import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto";
import { DefaultSortField } from "src/common/enums/default-sort-field.enum";

export class AnnouncementCategoryQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: DefaultSortField, default: DefaultSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(DefaultSortField)
  sortBy?: DefaultSortField = DefaultSortField.CREATED_AT;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: 'true',
    enum: ['true', 'false'],
  })
  @IsOptional()
  @IsString()
  isActive?: string;
}