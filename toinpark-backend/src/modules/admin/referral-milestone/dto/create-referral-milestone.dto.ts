import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  MaxLength,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReferralMilestoneDto {
  @ApiProperty({
    description: 'Unique name for the referral milestone',
    example: 'Bronze Milestone',
    maxLength: 100,
  })
  @IsString({ message: 'Referral name must be a string' })
  @IsNotEmpty({ message: 'Referral name should not be empty' })
  @MaxLength(100)
  referralName: string;

  @ApiPropertyOptional({
    description: 'Optional description of the milestone',
    example: 'Reward for inviting 5 users and achieving 100 tokens',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Required token amount to reach milestone',
    example: 100.5,
  })
  @IsNumber({}, { message: 'Toin amount must be a valid number' })
  @Min(1)
  toinAmount: number;

  @ApiProperty({
    description: 'Target number of referred persons',
    example: 5,
  })
  @IsNumber({}, { message: 'Target person must be a valid number' })
  @IsInt()
  @Min(1)
  targetPerson: number;

  @ApiProperty({
    description: 'Milestone per user',
    example: 2,
  })
  @IsNumber({}, { message: 'Per user milestone must be a valid number' })
  @Min(0)
  perUserMilestone: number;

  @ApiPropertyOptional({
    description: 'Whether the milestone is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive?: boolean;
}
