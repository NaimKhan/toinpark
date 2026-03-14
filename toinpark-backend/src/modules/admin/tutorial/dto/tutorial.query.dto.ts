import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto/pagination.dto";
import { DefaultSortField } from "src/common/enums/default-sort-field.enum";
import { TutorialSortField } from "./tutorial-sort-field.enum";

export class TutorialQueryDto extends PaginationQueryDto {
  
  @ApiPropertyOptional({ enum: TutorialSortField, default: 'createdAt' })
  @IsOptional()
  @IsEnum(TutorialSortField)
  sortBy?: TutorialSortField = TutorialSortField.CREATED_AT;
  
  @ApiPropertyOptional({ description: 'Filter by category ID or slug', example: '397f137c-3c48-4f74-bdb7-784ee52a744e' })
  @IsOptional()
  @IsString()
  tutorialCategoryId?: string;
}
