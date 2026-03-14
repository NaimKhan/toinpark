
import { PaginationQueryDto } from 'src/common/dto';
import { LevelSortField } from './level-sort-field.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class ReferralLevelQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: LevelSortField, default: LevelSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(LevelSortField)
  sortBy?: LevelSortField = LevelSortField.CREATED_AT

}