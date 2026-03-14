import { PaginationQueryDto } from 'src/common/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';

export enum LevelMemberSortField {
  CREATED_AT = 'createdAt',
}

export class LevelMemberQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: LevelMemberSortField, default: LevelMemberSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(LevelMemberSortField)
  sortBy?: LevelMemberSortField = LevelMemberSortField.CREATED_AT;

  @ApiPropertyOptional({ enum: EnumSortOrder, default: EnumSortOrder.DESC })
  @IsOptional()
  @IsEnum(EnumSortOrder)
  sortOrder?: EnumSortOrder = EnumSortOrder.DESC;
}
