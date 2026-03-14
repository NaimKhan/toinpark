import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MemberResponseDto } from './member-response.dto';
import { PaginationMeta } from 'src/common/dto';

export class ParentMemberInfoDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @Expose()
  toinAccountNumber: string;
}

export class DirectMemberPaginatedResponseDto {
  @ApiProperty({ type: [MemberResponseDto] })
  @Expose()
  items: MemberResponseDto[];

  @ApiProperty({
    example: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    }
  })
  @Expose()
  meta: PaginationMeta;

  @ApiProperty({
    example: {
      fullName: 'Parent Name',
      toinAccountNumber: 'TOIN654321'
    }
  })
  @Expose()
  memberInfo: ParentMemberInfoDto;

  constructor(items: MemberResponseDto[], total: number, page: number, limit: number, memberInfo: ParentMemberInfoDto) {
    this.items = items;
    this.meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrevious: page > 1,
    };
    this.memberInfo = memberInfo;
  }
}
