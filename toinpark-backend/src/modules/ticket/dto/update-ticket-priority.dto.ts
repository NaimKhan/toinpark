import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TicketPriority } from '@prisma/client';

export class UpdateTicketPriorityDto {
  @ApiProperty({
    enum: TicketPriority,
    example: TicketPriority.HIGH,
    description: 'New priority for the ticket',
  })
  @IsEnum(TicketPriority)
  @IsNotEmpty()
  priority: TicketPriority;
}