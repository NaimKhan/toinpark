import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TicketStatus } from '@prisma/client';

export class UpdateTicketStatusDto {
  @ApiProperty({
    enum: TicketStatus,
    example: TicketStatus.OPEN,
    description: 'New status for the ticket',
  })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;
}