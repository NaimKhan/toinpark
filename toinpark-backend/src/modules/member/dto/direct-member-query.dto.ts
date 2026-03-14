import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { MemberSortField } from './member-sort-field.enum';

export class DirectMemberQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 300 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(300)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: [MemberSortField.CREATED_AT],
    default: MemberSortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(MemberSortField)
  sortBy?: MemberSortField = MemberSortField.CREATED_AT;

  @ApiPropertyOptional({ enum: EnumSortOrder, default: EnumSortOrder.DESC })
  @IsOptional()
  @IsEnum(EnumSortOrder)
  sortOrder?: EnumSortOrder = EnumSortOrder.DESC;
}
