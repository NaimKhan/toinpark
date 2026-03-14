import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAirDropEventDto {
  @ApiProperty({ description: 'Name of the AirDrop event', example: 'New Year Giveaway' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty({ message: 'Event name is required' })
  eventName: string;

  @ApiProperty({ description: 'Total amount allocated for the event', example: 10000.50 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalAmount: number;

  @ApiProperty({ description: 'USD conversion rate', example: 0.123456 })
  @IsNumber({ maxDecimalPlaces: 6 })
  @Min(0)
  usdConversionRate: number;

  @ApiProperty({ description: 'AirDrop event start date', example: '2025-12-01T00:00:00Z' })
  @IsDateString()
  eventStartDate: string;

  @ApiProperty({ description: 'AirDrop event end date', example: '2026-01-01T00:00:00Z' })
  @IsDateString()
  eventEndDate: string;
}
