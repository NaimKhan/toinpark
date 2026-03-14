import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MediaDto } from 'src/core/storage/dto/media.dto';

export class CountryResponseDto {
  @ApiProperty({ example: 'ce9d9d87-63f0-4279-a509-77df69e8d264' })
  id: string;

  @ApiProperty({ example: 'Bangladesh' })
  name: string;

  @ApiProperty({ example: 'BD' })
  code: string;

  @ApiProperty({ example: '+880', nullable: true })
  phoneCode: string | null;

  @ApiProperty({ example: 'BDT', nullable: true })
  currencyCode: string | null;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-11-09T11:34:29.835Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-09T11:34:29.835Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  createdBy: string | null;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ example: null, nullable: true })
  deletedBy: string | null;

  @ApiProperty({ example: null, nullable: true })
  updatedBy: string | null;
}

export class StateResponseDto {
  @ApiProperty({ example: 'a36b61c2-6eab-4878-88e7-837484d37864' })
  id: string;

  @ApiProperty({ example: 'ce9d9d87-63f0-4279-a509-77df69e8d264' })
  countryId: string;

  @ApiProperty({ example: 'Dhaka' })
  name: string;

  @ApiProperty({ example: 'DHK', nullable: true })
  code: string | null;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-11-09T11:34:29.875Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-09T11:34:29.875Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  createdBy: string | null;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ example: null, nullable: true })
  deletedBy: string | null;

  @ApiProperty({ example: null, nullable: true })
  updatedBy: string | null;
}

export class UserProfileResponseDto {
  @Expose()
  @ApiProperty({ example: '1ef96bb3-8ec2-4fce-9ffc-d708d0bff5da' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'System Admin' })
  fullName: string;

  @Expose()
  @ApiProperty({ example: 'System' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Admin' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'abc@gmail.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: true })
  isEmailVerified: boolean;

  @Expose()
  @ApiProperty({ example: '880175789652' })
  phoneNumber: string;

  @Expose()
  @ApiProperty({ example: false })
  isPhoneNumberVerified: boolean;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  profileImageUrl: string | null;

  
  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  media: MediaDto | null

  @Expose()
  @ApiProperty({ example: 'Head Office', nullable: true })
  addressLine1: string | null;

  @Expose() 
  @ApiProperty({ example: 'Dhaka', nullable: true })
  city: string | null;
  
  @Expose()
  @ApiProperty({ example: '1000', nullable: true })
  zipCode: string | null;

  @Expose()
  @ApiProperty({ example: '5e2be04e-ecbe-47ea-b7a8-7f528dfd0815' })
  userId: string;

  @Expose()
  @ApiProperty({ example: 'TOI1234567890' })
  toinAccountNumber: string;

  @Expose()
  @ApiProperty({ example: 1000.5, description: 'Wallet balance from user_toin table', type: Number })
  walletBalance: number;

  @Expose()
  @ApiProperty({ type: CountryResponseDto })
  country: CountryResponseDto;

  @Expose()
  @ApiProperty({ type: StateResponseDto })
  state: StateResponseDto;

  @Expose()
  @ApiProperty({
    example: 'Member',
    description: 'User role from the roles table',
    enum: ['Member', 'Admin', 'Superadmin'],
    required: false,
  })
  role?: string;
}


