import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserDataDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: '+8801712345678',
    description: 'User phone number',
    required: false,
  })
  @Expose()
  phone?: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username',
  })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'REF12345',
    description: 'Code referral',
  })
  @Expose()
  referralCode: string;

  @ApiProperty({
    example: 'MEMBER',
    description: 'User role',
    enum: ['MEMBER', 'ADMIN', 'SUPERADMIN'],
    required: false,
  })
  @Expose()
  role?: string;

  @ApiProperty({
    example: 'Referrer',
    description: 'Refer User Info',
    required: false,
  })
  @Expose()
  referredUser?: any;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT access token (expires in 15 minutes)',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    example: 3600,
    description: 'Access token expiration time in seconds',
  })
  @Expose()
  expiresIn: number
  
  @ApiProperty({
    example: 604800,
    description: 'Refresh token expiration time in seconds',
  })
  @Expose()
  refreshExpiresIn: number

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ',
    description: 'JWT refresh token (expires in 7 days)',
  })
  @Expose()
  refreshToken: string;

  @ApiProperty({
    type: UserDataDto,
    description: 'User information',
  })
  @Expose()
  @Type(() => UserDataDto)
  user: UserDataDto;
}