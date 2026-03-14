import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';

export class StateQueryDto extends PaginationQueryDto {
  
  @ApiPropertyOptional({ enum: DefaultSortField, default: DefaultSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(DefaultSortField)
  sortBy?: DefaultSortField = DefaultSortField.CREATED_AT

  @ApiPropertyOptional({ description: 'Filter by country ID' })
  @IsOptional()
  @IsUUID()
  countryId?: string;
}

class CountryBasicDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string;
}

export class StateResponseDto {
  @Expose()
  id: string;

  @Expose()
  countryId: string;

  @Expose()
  name: string;

  @Expose()
  code: string | null;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  @Type(() => CountryBasicDto)
  country: CountryBasicDto;
}