import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { TicketPriority } from '@prisma/client';

export class CreateTicketDto {
  @ApiProperty({
    example: 'Unable to stake tokens',
    description: 'Subject of the ticket',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  subject: string;

  @ApiProperty({
    example: 'I am getting an error when trying to stake my TOIN tokens...',
    description: 'Detailed description of the issue',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the ticket category',
  })
  @IsString()
  @IsNotEmpty()
  ticketCategoryId: string;

  @ApiProperty({
    enum: TicketPriority,
    example: TicketPriority.MEDIUM,
    description: 'Priority of the ticket',
    required: false,
    default: TicketPriority.MEDIUM,
  })
  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;
}