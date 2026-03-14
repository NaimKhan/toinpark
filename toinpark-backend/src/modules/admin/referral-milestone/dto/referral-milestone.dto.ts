import { ApiProperty } from '@nestjs/swagger';

export class CreateReferralMilestoneDto {
  @ApiProperty({
    example: 'Bronze Milestone',
    description: 'Referral milestone name (must be unique)',
  })
  referralName: string;

  @ApiProperty({
    example: 1000,
    description: 'TOIN amount reward for this milestone',
  })
  toinAmount: number;

  @ApiProperty({
    example: 10,
    description: 'Target number of referrals required',
  })
  targetPerson: number;

  @ApiProperty({
    example: true,
    description: 'Whether the milestone is active',
    required: false,
    default: true,
  })
  isActive?: boolean;
}

export class UpdateReferralMilestoneDto {
  @ApiProperty({
    example: 'Bronze Milestone',
    description: 'Referral milestone name',
    required: false,
  })
  referralName?: string;

  @ApiProperty({
    example: 1000,
    description: 'TOIN amount reward for this milestone',
    required: false,
  })
  toinAmount?: number;

  @ApiProperty({
    example: 10,
    description: 'Target number of referrals required',
    required: false,
  })
  targetPerson?: number;

  @ApiProperty({
    example: true,
    description: 'Whether the milestone is active',
    required: false,
  })
  isActive?: boolean;
}

export class ReferralMilestoneResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Bronze Milestone' })
  referalName: string;

  @ApiProperty({ example: 1000 })
  toinAmount: number;

  @ApiProperty({ example: 10 })
  tergetPerson: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '1', nullable: true })
  createdBy: string | null;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z', nullable: true })
  updatedAt: Date | null;

  @ApiProperty({ example: '1', nullable: true })
  updatedBy: string | null;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ example: null, nullable: true })
  deletedBy: string | null;
}

export class ApiResponseDto {
  @ApiProperty({ type: ReferralMilestoneResponseDto })
  data: ReferralMilestoneResponseDto;
}

