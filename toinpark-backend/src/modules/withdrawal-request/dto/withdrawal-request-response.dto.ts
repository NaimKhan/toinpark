import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { WithdrawalStatus } from '@prisma/client';
import { UserStakingPackageResponseDto } from '../../user-staking-package/dto/user-staking-package.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';

@Exclude()
export class WithdrawalRequestResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userStakingPackageId: string;

  @Expose()
  @ApiProperty()
  address: string;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  amount: number;

  @Expose()
  @ApiProperty()
  currency: string;

  @Expose()
  @ApiProperty()
  @Type(() => Number)
  platformFee: number;

  @Expose()
  @ApiProperty({ enum: WithdrawalStatus })
  status: WithdrawalStatus;

  @Expose()
  @ApiProperty({ required: false })
  remark?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty({ required: false })
  createdBy?: string;

  @Expose()
  @ApiProperty({ required: false })
  updatedAt?: Date;

  @Expose()
  @ApiProperty({ required: false })
  updatedBy?: string;

  @Expose()
  @ApiProperty({ required: false })
  deletedAt?: Date;

  @Expose()
  @ApiProperty({ required: false })
  deletedBy?: string;

  @Expose()
  @Type(() => UserStakingPackageResponseDto)
  @ApiPropertyOptional({ type: () => UserStakingPackageResponseDto })
  userStakingPackage: UserStakingPackageResponseDto

  @Expose()
  @Type(() => UserResponseDto)
  @ApiPropertyOptional({ type: () => UserResponseDto })
  creator: UserResponseDto


}