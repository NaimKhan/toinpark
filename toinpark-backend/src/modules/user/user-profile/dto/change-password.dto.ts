import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'src/common/decorators';

/**
 * Change Password DTO
 * 
 * Validates password change requests with Laravel-style validation messages
 * 
 * Validation Rules:
 * - currentPassword: Required, string, 6+ characters
 * - newPassword: Required, string, 8+ characters, must be different from current password
 * - confirmPassword: Required, must match newPassword exactly
 * 
 * Error Response (422):
 * {
 *   "success": false,
 *   "statusCode": 422,
 *   "message": "Validation failed",
 *   "errors": {
 *     "currentPassword": ["Current password is required"],
 *     "newPassword": ["New password must be at least 8 characters"],
 *     "confirmPassword": ["Confirmation does not match"]
 *   }
 * }
 */
export class ChangePasswordDto {
  @ApiProperty({
    example: 'CurrentPassword123!',
    description: 'Current password for verification (minimum 6 characters)',
  })
  @IsNotEmpty({ message: 'Current password is required' })
  @IsString({ message: 'Current password must be a string' })
  @MinLength(6, { message: 'Current password must be at least 6 characters' })
  currentPassword: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description:
      'New password (minimum 8 characters, must include uppercase, lowercase, and number)',
  })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString({ message: 'New password must be a string' })
  @MinLength(8, { message: 'New password must be at least 8 characters' })
  @MaxLength(128, { message: 'New password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'New password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  newPassword: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description: 'Confirm new password (must match newPassword field exactly)',
  })
  @IsNotEmpty({ message: 'Confirmation password is required' })
  @IsString({ message: 'Confirmation password must be a string' })
  @Match('newPassword', { message: 'Confirmation does not match' })
  confirmPassword: string;
}

