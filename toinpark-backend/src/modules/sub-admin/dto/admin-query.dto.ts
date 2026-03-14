import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { UserStatus } from '@prisma/client';

export class AdminQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by admin status',
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    description: 'Filter by admin role',
    enum: ['Admin', 'SuperAdmin'],
  })
  @IsOptional()
  @IsEnum(['Admin', 'SuperAdmin'])
  userRole?: 'Admin' | 'SuperAdmin';

}