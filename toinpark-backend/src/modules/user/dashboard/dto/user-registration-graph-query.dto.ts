// src/modules/dashboard/dto/user-registration-graph-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UserRegistrationGraphQueryDto {
  @ApiPropertyOptional({ 
    example: '2024-01-01', 
    description: 'Start date (will be normalized to start of the month)' 
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ 
    example: '2024-12-31', 
    description: 'End date (will be normalized to end of the month)' 
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}