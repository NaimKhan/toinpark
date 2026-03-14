import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { WithdrawalRequestSortField } from './withdrawal-request-sort-field.enum';
import { WithdrawalStatus } from '@prisma/client';

export class WithdrawalRequestQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: WithdrawalStatus })
  @IsEnum(WithdrawalStatus)
  @IsOptional()
  status?: WithdrawalStatus;

  @ApiPropertyOptional({ description: 'User Staking Package ID' })
  @IsUUID()
  @IsOptional()
  userStakingPackageId?: string;

  @ApiPropertyOptional({ description: 'Currency filter' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({
    enum: WithdrawalRequestSortField,
    default: WithdrawalRequestSortField.CREATED_AT,
  })
  @IsEnum(WithdrawalRequestSortField)
  @IsOptional()
  sortBy?: WithdrawalRequestSortField = WithdrawalRequestSortField.CREATED_AT;

  @ApiPropertyOptional({
    enum: EnumSortOrder,
    default: EnumSortOrder.DESC,
  })
  @IsEnum(EnumSortOrder)
  @IsOptional()
  sortOrder?: EnumSortOrder = EnumSortOrder.DESC;
}