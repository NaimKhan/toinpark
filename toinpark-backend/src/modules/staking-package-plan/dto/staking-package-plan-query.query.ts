import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common/dto";
import { DefaultSortField } from "src/common/enums/default-sort-field.enum";


export class StakingPackagePlanQuery extends PaginationQueryDto {
    
    @ApiPropertyOptional({ enum: DefaultSortField, default: DefaultSortField.CREATED_AT })
    @IsOptional()
    @IsEnum(DefaultSortField)
    sortBy?: DefaultSortField = DefaultSortField.CREATED_AT
}