import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTicketCategoryDto {
  @ApiProperty({
    example: 'Technical Support',
    description: 'Name of the ticket category',
    maxLength: 150,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

}