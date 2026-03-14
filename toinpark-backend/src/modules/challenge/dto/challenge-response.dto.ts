import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Expose, Transform, Type } from 'class-transformer';

export class ChallengeResponseDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => value.toString())
  id: string;

  @ApiProperty()
  @Expose()
  challengeTitle: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  endDate: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Number)  // Add this
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.d) {
      return parseFloat(value.toString());
    }
    return Number(value);
  })
  rewardToinAmount: number;


  @ApiProperty()
  @Expose()
  postDetails?: string;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt?: Date;
}
