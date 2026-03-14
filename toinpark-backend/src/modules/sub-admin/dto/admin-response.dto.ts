import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AdminProfileDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiPropertyOptional()
  @Expose({ name: 'firstname' })
  firstName?: string;

  @ApiPropertyOptional()
  @Expose({ name: 'lastname' })
  lastName?: string;

  @ApiPropertyOptional()
  @Expose()
  gender?: string;

  @ApiPropertyOptional()
  @Expose()
  addressLine1?: string;

  @ApiPropertyOptional()
  @Expose()
  city?: string;

  @ApiPropertyOptional()
  @Expose()
  countryId?: string;

  @ApiPropertyOptional()
  @Expose()
  stateId?: string;
}

export class AdminResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose({ name: 'username' })
  userName: string;

  @ApiPropertyOptional()
  @Expose()
  email?: string;

  @ApiPropertyOptional()
  @Expose()
  phoneNumber?: string;

  @ApiProperty()
  @Expose()
  emailVerified: boolean;

  @ApiProperty()
  @Expose()
  phoneVerified: boolean;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  userRole: string;

  @ApiProperty()
  @Expose()
  toinAccountNumber: string;

  @ApiPropertyOptional()
  @Expose()
  lastLoginAt?: Date;

  @ApiPropertyOptional()
  @Expose()
  lastLoginIp?: string;

  @ApiProperty()
  @Expose()
  loginCount: number;

  @ApiProperty()
  @Expose()
  twoFactorEnabled: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional()
  @Expose()
  updatedAt?: Date;

  @ApiPropertyOptional({ type: AdminProfileDto })
  @Expose()
  userProfile?: AdminProfileDto;
}