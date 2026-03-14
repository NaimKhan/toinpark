import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';
import { CreateReferralLevelDto } from './create-referral-level.dto';

export class BulkCreateReferralLevelDto {
  @ApiProperty({
    description: 'Array of referral levels to create',
    type: [CreateReferralLevelDto],
    example: [
      {
        levelNumber: 1,
        referralBonusPercentage: 10,
      },
      {
        levelNumber: 2,
        referralBonusPercentage: 5,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one referral level is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateReferralLevelDto)
  levels: CreateReferralLevelDto[];
}

export class UpdateReferralLevelItemDto extends CreateReferralLevelDto {
  @ApiProperty({
    description: 'ID of the referral level to update',
    example: 'uuid-here',
  })
  @IsString()
  @IsNotEmpty({ message: 'ID is required' })
  id: string;
}

export class BulkUpdateReferralLevelDto {
  @ApiProperty({
    description: 'Array of referral levels to update',
    type: [UpdateReferralLevelItemDto],
    example: [
      {
        id: 'uuid-1',
        levelNumber: 1,
        referralBonusPercentage: 15,
      },
      {
        id: 'uuid-2',
        levelNumber: 2,
        referralBonusPercentage: 8,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one referral level is required' })
  @ValidateNested({ each: true })
  @Type(() => UpdateReferralLevelItemDto)
  levels: UpdateReferralLevelItemDto[];
}