import { ApiProperty } from '@nestjs/swagger';
import { TutorialCategoryResponseDto } from '../../tutorial-categories/dto/tutorial-category-response.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { MediaDto } from 'src/core/storage/dto/media.dto';

export enum TutorialType {
  LINK = 'link',
  FILE = 'file',
}

export class CreateTutorialDto {
  @ApiProperty({
    example: '1',
    description: 'ID of the tutorial category this tutorial belongs to',
  })
  @IsNotEmpty({ message: 'Tutorial category ID is required' })
  tutorialCategoryId: string;

  @ApiProperty({
    example: 'Mastering Staking',
    description: 'Title of the tutorial',
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    example: 'A complete guide to staking.',
    description: 'Detailed description of the tutorial',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TutorialType,
    example: TutorialType.LINK,
    description: 'Type of the tutorial (either "link" or "file")',
  })
  @IsEnum(TutorialType)
  @IsNotEmpty({ message: 'Tutorial type is required' })
  type: TutorialType;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Video file if type is "file"',
    required: false,
  })
  @IsOptional()
  videoFile?: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Thumbnail image for the tutorial',
    required: false,
  })
  @IsOptional()
  thumbnail?: any;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'External video or resource link (e.g., YouTube, Vimeo)',
    required: false,
  })
  @IsString()
  @IsOptional()
  sourceLink?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the tutorial is featured',
    required: false,
    default: false,
  })
  @Type(() => Boolean)
  @IsOptional()
  isFeatured?: boolean;
}

export class TutorialResponseDto {
  @Expose()
  @ApiProperty({ example: '807eabe4-f636-46f4-83b7-d7e10fe14c76' })
  id: string;

  @Expose()
  @ApiProperty({ example: '807eabe4-f636-46f4-83b7-d7e10fe14c76' })
  tutorialCategoryId: string;

  @Expose()
  @ApiProperty({ example: 'Mastering Staking' })
  title: string;

  @Expose()
  @ApiProperty({
    example: 'A complete guide to Staking',
    nullable: true,
  })
  description: string | null;

  @Expose()
  @ApiProperty({ enum: ['link', 'file'], example: 'link' })
  type: string;

  @Expose({ toClassOnly: true })
  filePath: string | null;

  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  videoMedia: MediaDto | null

  @Expose({ toClassOnly: true })
  thumbnailPath: string | null;

  @Expose()
  @ApiProperty({ type: MediaDto, nullable: true })
  thumbnailMedia: MediaDto | null

  @Expose()
  @ApiProperty({
    example: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    nullable: true,
  })
  sourceLink: string | null;

  @Expose()
  @ApiProperty({ example: true })
  isFeatured: boolean;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ example: '2025-10-29T09:46:55.799Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '807eabe4-f636-46f4-83b7-d7e10fe14c76', nullable: true })
  createdBy: string | null;

  @Expose()
  @ApiProperty({ example: '2025-10-29T10:00:00.000Z', nullable: true })
  updatedAt: Date | null;

  @Expose()
  @ApiProperty({ example: '807eabe4-f636-46f4-83b7-d7e10fe14c76', nullable: true })
  updatedBy: string | null;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;

  @Expose()
  @ApiProperty({ example: null, nullable: true })
  deletedBy: string | null;

  @Expose()
  @ApiProperty({ type: TutorialCategoryResponseDto, nullable: true })
  category: TutorialCategoryResponseDto | null;
}

