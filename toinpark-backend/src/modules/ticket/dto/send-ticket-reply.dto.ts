import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class SendTicketReplyDto {
  @ApiProperty({
    example: 'Thank you for reporting this issue. We are looking into it.',
    description: 'Reply message content',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  message: string;
}