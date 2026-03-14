import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserWalletAddressDto {
  @ApiProperty({
    description: 'Wallet account ID',
    example: '0x123...abc',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  walletAccountId: string;

  @ApiPropertyOptional({
    description: 'Name/Label for the wallet address',
    example: 'My Trust Wallet',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Status of the wallet address',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({
    description: 'Is this the default wallet address',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
