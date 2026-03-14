import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, Transform } from 'class-transformer';
import { TicketStatus, TicketPriority } from '@prisma/client';

class TicketCategoryDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  isActive: boolean;
}

class CreatorDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  toinAccountNumber: string;

  @Expose()
  @Transform(({ obj }) => obj.userProfile?.firstName)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.userProfile?.lastName)
  lastName: string;
}

class MessageSenderDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}

class TicketMessageDto {
  @Expose()
  id: string;

  @Expose()
  message: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => MessageSenderDto)
  sender: MessageSenderDto;
}

export class TicketResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'TCK-2025-C69398' })
  @Expose()
  ticketNo: string;

  @ApiProperty({ example: 'Unable to stake tokens' })
  @Expose()
  subject: string;

  @ApiProperty({ example: 'I am getting an error...' })
  @Expose()
  description: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  ticketCategoryId: string;

  @ApiProperty({ enum: TicketStatus, example: TicketStatus.OPEN })
  @Expose()
  status: TicketStatus;

  @ApiProperty({ enum: TicketPriority, example: TicketPriority.MEDIUM })
  @Expose()
  priority: TicketPriority;

  @ApiProperty({ example: '2024-11-13T10:00:00.000Z', required: false })
  @Expose()
  responsedAt?: Date;

  @ApiProperty({ example: '2024-11-13T10:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  createdBy: string;

  @ApiProperty({ example: '2024-11-13T10:00:00.000Z', required: false })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @Expose()
  updatedBy?: string;

  @ApiProperty({ type: TicketCategoryDto })
  @Expose()
  @Type(() => TicketCategoryDto)
  category: TicketCategoryDto;

  @ApiProperty({ type: CreatorDto })
  @Expose()
  @Type(() => CreatorDto)
  creator: CreatorDto;

  @ApiProperty({ type: [TicketMessageDto], required: false })
  @Expose()
  @Type(() => TicketMessageDto)
  messages?: TicketMessageDto[];
}