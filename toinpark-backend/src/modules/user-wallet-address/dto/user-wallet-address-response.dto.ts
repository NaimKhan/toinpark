import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserWalletAddressResponseDto {
  @ApiProperty({
    description: 'Wallet address ID',
    example: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'uuid',
  })
  @Expose()
  userId: string;
  
  @ApiProperty({
    description: 'Wallet account ID',
    example: '0x123...abc',
  })
  @Expose()
  walletAccountId: string;

  @ApiProperty({
    description: 'Name/Label',
    example: 'My Trust Wallet',
    nullable: true
  })
  @Expose()
  name: string | null;

  @ApiProperty({
    description: 'Status',
    example: true,
  })
  @Expose()
  status: boolean;

  @ApiProperty({
    description: 'Is default',
    example: false,
  })
  @Expose()
  isDefault: boolean;

  @ApiProperty({
    description: 'Created at',
  })
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Updated at',
  })
  @Expose()
  updatedAt?: Date;
}
