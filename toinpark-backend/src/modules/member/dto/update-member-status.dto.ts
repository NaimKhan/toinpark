import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class UpdateMemberStatusDto {
  @ApiProperty({
    enum: UserStatus,
    description: 'New status for the member',
    example: UserStatus.ACTIVE,
  })
  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;
}