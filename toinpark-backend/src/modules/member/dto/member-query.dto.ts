import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { UserStatus } from '@prisma/client';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { MemberSortField } from './member-sort-field.enum';

export class MemberQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: MemberSortField, default: MemberSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(MemberSortField)
  sortBy?: MemberSortField = MemberSortField.CREATED_AT

  @ApiPropertyOptional({ enum: EnumSortOrder, default: EnumSortOrder.DESC })
  @IsOptional()
  @IsEnum(EnumSortOrder)
  sortOrder?: EnumSortOrder = EnumSortOrder.DESC;

  @ApiPropertyOptional({
    description: 'Filter by user status',
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;


  @ApiPropertyOptional({
    description: 'Filter by email verification status',
    type: Boolean,
  })
  @IsOptional()
  @Type(() => Boolean)
  emailVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by phone verification status',
    type: Boolean,
  })
  @IsOptional()
  @Type(() => Boolean)
  phoneVerified?: boolean;


@ApiPropertyOptional({
    description: 'Filter members joined from this date (ISO 8601 format)',
    example: '2024-01-01',
    type: String,
  })
  @IsOptional()
  @IsDateString()
  joinedFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter members joined until this date (ISO 8601 format)',
    example: '2025-12-31',
    type: String,
  })
  @IsOptional()
  @IsDateString()
  joinedTo?: string;

}