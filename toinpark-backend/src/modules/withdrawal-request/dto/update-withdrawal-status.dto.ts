import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WithdrawalStatus } from '@prisma/client';

export class UpdateWithdrawalStatusDto {
  @ApiProperty({ enum: WithdrawalStatus })
  @IsEnum(WithdrawalStatus)
  @IsNotEmpty()
  status: WithdrawalStatus;

  @ApiProperty({ example: 'Note' })
  @IsOptional()
  @IsString()
  remark?: string;
}