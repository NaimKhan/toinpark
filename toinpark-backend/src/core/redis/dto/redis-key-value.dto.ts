// src/modules/redis/dto/redis-key-value.dto.ts
import { ApiProperty } from '@nestjs/swagger';

// Define the value structure
export class OtpValueDto {
  @ApiProperty({
    description: 'number',
    example: 256598445,
  })
  id: number;
  @ApiProperty({
    description: 'OTP code',
    example: 838847,
  })
  otp: number;

  @ApiProperty({
    description: 'OTP fail count (can be "*" for unlimited)',
    example: '*',
  })
  otpFailCount: string;

  @ApiProperty({
    description: 'OTP purpose/type identifier',
    example: 0,
  })
  otpFor: number;

  @ApiProperty({
    description: 'Total number of OTP failures',
    example: 0,
  })
  totalOtpFailCount: number;
}

