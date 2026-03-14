import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TicketStatus, TicketPriority } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dto';
import { TicketSortField } from './ticket-sort-field.enum';


export class TicketQueryDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: TicketSortField, default: TicketSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(TicketSortField)
  sortBy?: TicketSortField = TicketSortField.CREATED_AT

  @ApiPropertyOptional({
    enum: TicketStatus,
    description: 'Filter by status',
  })
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @ApiPropertyOptional({
    enum: TicketPriority,
    description: 'Filter by priority',
  })
  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;

  @ApiPropertyOptional({
    description: 'Filter by category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  categoryId?: string;
}