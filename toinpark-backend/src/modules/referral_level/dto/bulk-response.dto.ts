import { ApiProperty } from '@nestjs/swagger';
import { ReferralLevelResponseDto } from './referral-level-response.dto';

export class BulkOperationErrorDto {
  @ApiProperty({
    description: 'Index of the failed item in the array',
    example: 0,
  })
  index: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Level number 1 already exists',
  })
  message: string;

  @ApiProperty({
    description: 'Field-specific errors',
    example: {
      levelNumber: ['Level number 1 already exists'],
    },
  })
  errors?: Record<string, string[]>;
}

export class BulkReferralLevelResponseDto {
  @ApiProperty({
    description: 'Successfully processed referral levels',
    type: [ReferralLevelResponseDto],
  })
  success: ReferralLevelResponseDto[];

  @ApiProperty({
    description: 'Failed operations with error details',
    type: [BulkOperationErrorDto],
  })
  failed: BulkOperationErrorDto[];

  @ApiProperty({
    description: 'Total number of items processed',
    example: 10,
  })
  totalProcessed: number;

  @ApiProperty({
    description: 'Number of successful operations',
    example: 8,
  })
  successCount: number;

  @ApiProperty({
    description: 'Number of failed operations',
    example: 2,
  })
  failedCount: number;
}