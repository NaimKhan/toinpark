import { PaginationQueryDto } from "src/common/dto";
import { ChallengeSortField } from "./challenge-sort-field.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export class ChallengeQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: ChallengeSortField, default: ChallengeSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(ChallengeSortField)
  sortBy?: ChallengeSortField = ChallengeSortField.CREATED_AT

}