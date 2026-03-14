import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto';

export class UserWalletAddressQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by User ID (Admin only)',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
