import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';

export class AirDropEventResponseDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => value.toString())
  id: string;

  @ApiProperty()
  @Expose()
  eventName: string;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.d) {
      return parseFloat(value.toString());
    }
    return Number(value);
  })
  totalAmount: number;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.d) {
      return parseFloat(value.toString());
    }
    return Number(value);
  })
  usedAmount: number;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'object' && value.d) {
      return parseFloat(value.toString());
    }
    return Number(value);
  })
  usdConversionRate: number;

  @ApiProperty()
  @Expose()
  eventStartDate: Date;

  @ApiProperty()
  @Expose()
  eventEndDate: Date;

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
