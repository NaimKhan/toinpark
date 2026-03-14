import { ApiProperty } from '@nestjs/swagger';

export class UploadProfileImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profile image file (jpg, jpeg, png, webp)',
    required: false,
  })
  profileImage?: Express.Multer.File;
}