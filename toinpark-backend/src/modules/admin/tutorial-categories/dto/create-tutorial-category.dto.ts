import { IsString, IsOptional, MinLength, MaxLength, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTutorialCategoryDto {
  @ApiProperty({
    description: 'Unique name for the tutorial category',
    example: 'Web Development',
    minLength: 1,
    maxLength: 150,
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MinLength(1)
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({
    description: 'Description for the tutorial category',
    example: 'Category for web-related tutorials',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether the category is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive?: boolean;
}
