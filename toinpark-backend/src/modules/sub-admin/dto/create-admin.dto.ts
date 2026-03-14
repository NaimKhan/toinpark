import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsPhoneNumber,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CreateAdminDto {
  
    @ApiProperty({
      example: 'john',
      description: 'Sub admin first name',
    })
    @IsOptional()
    @IsString()
    firstName?: string;
    
    @ApiProperty({
      example: 'doe',
      description: 'Sub admin last name',
    })
    @IsOptional()
    @IsString()
    lastName?: string;
  
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Admin email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 'subadminuser',
    description: 'Admin username',
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Admin password (min 8 characters, must contain uppercase, lowercase, number, and special character)',
    minLength: 8,
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message: 'Password must contain uppercase, lowercase, number and special character',
    },
  )
  @IsNotEmpty()
  password: string;

  
  @ApiProperty({
    example: 'Password@123',
    description: 'Password confirmation',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @ValidateIf((o) => o.password !== o.passwordConfirmation)
  @Matches(/^$/, { message: 'Password confirmation does not match password' })
  passwordConfirmation: string;

}