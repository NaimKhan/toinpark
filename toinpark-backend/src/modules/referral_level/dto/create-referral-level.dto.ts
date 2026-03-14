import { IsInt, Min, Max, MinLength, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferralLevelDto {
  @ApiProperty({
    description: 'Unique name for the referral level',
    example: 4,
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  levelNumber: number;

  @ApiProperty({
    description: 'Referral bounce percentage (0-100)',
    example: 10,
    minimum: 0,
    maximum: 100,
  })
  @Min(0)
  @Max(100)
  referralBonusPercentage: number;
}