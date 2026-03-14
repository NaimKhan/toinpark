import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedResponseDto } from 'src/common/dto';
import { ReferralLevelResponseDto } from './referral-level-response.dto';

export class MemberReferralLevelPaginatedResponseDto extends PaginatedResponseDto<ReferralLevelResponseDto> {
  @ApiProperty({
    description: 'Total aggregated number of referral members across all levels',
    example: 120,
  })
  @Expose()
  totalReferralMembers: number;

  constructor(
    items: ReferralLevelResponseDto[],
    total: number,
    page: number,
    limit: number,
    totalReferralMembers: number,
  ) {
    super(items, total, page, limit);
    this.totalReferralMembers = totalReferralMembers;
  }
}
