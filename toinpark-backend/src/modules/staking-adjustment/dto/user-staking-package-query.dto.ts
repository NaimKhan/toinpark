import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { UserStakingPackageSortField } from './user-staking-package-sort-field.enum';

export class UserStakingPackageQueryDto {
  @ApiPropertyOptional({
    enum: UserStakingPackageSortField,
    default: UserStakingPackageSortField.CREATED_AT,
  })
  @IsEnum(UserStakingPackageSortField)
  @IsOptional()
  sortBy?: UserStakingPackageSortField = UserStakingPackageSortField.CREATED_AT;

  @ApiPropertyOptional({
    enum: EnumSortOrder,
    default: EnumSortOrder.DESC,
  })
  @IsEnum(EnumSortOrder)
  @IsOptional()
  sortOrder?: EnumSortOrder = EnumSortOrder.DESC;
}
