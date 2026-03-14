import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
  Get,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { TutorialService } from './tutorial.service';
import {
  CreateTutorialDto,
  TutorialResponseDto,
  TutorialType,
} from './dto/tutorial.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UploadService } from 'src/common/services/upload.service';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { ValidationException } from 'src/common/exceptions';
import { TutorialQueryDto } from './dto/tutorial.query.dto';

@ApiTags('Tutorials')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('tutorials')
export class TutorialController {
  constructor(
    private readonly tutorialService: TutorialService,
    private readonly uploadService: UploadService
  ) {}

  @Get('list')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tutorials with search & filter' })
  @ApiResponse({ type: PaginatedResponseDto<TutorialResponseDto> })
 
  async findAll(
    @Query() queryDto: TutorialQueryDto
  ): Promise<PaginatedResponseDto<TutorialResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      tutorialCategoryId: queryDto.tutorialCategoryId,
    };

    const { items, totalCount } = await this.tutorialService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors( 
    FileFieldsInterceptor([
      { name: 'videoFile', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ])
  )
  @ApiOperation({ summary: 'Create a new tutorial' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTutorialDto })
  @ApiResponse({
    status: 201,
    description: 'Tutorial created successfully',
    type: TutorialResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createDto: CreateTutorialDto,
    @CurrentUser() user: UserResponseDto,
    @UploadedFiles()
    files?: {
      videoFile?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ): Promise<TutorialResponseDto> {
    const videoFile = files?.videoFile?.[0];
    const thumbnailFile = files?.thumbnail?.[0];

    // Validate: either video file OR source link must be provided
    if (createDto.type === TutorialType.FILE) {
      if (!videoFile) {
        throw new ValidationException({ 'videoFile': ['Video file is required when type is "file"']});
      }
    } else if (createDto.type === TutorialType.LINK) {
      if (!createDto.sourceLink) {
        throw new ValidationException({ 'sourceLink': ['Source link is required when type is "link"']});
      }
    }

     // Validate video file if provided
    if (videoFile) {
      const maxVideoSize = 100 * 1024 * 1024; // 100MB
      if (videoFile.size > maxVideoSize) {
        throw new ValidationException({ 'videoFile': ['Video file size must not exceed 100MB']});
      }
      
      const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm', 'video/x-matroska'];
      if (!allowedVideoTypes.includes(videoFile.mimetype)) {
        throw new ValidationException({ 'videoFile': ['Invalid video format. Allowed: mp4, avi, mov, wmv, webm, mkv']});
      }
    }


    // Validate thumbnail file if provided
    if (thumbnailFile) {
      const maxThumbnailSize = 5 * 1024 * 1024; // 5MB
      if (thumbnailFile.size > maxThumbnailSize) {
        throw new ValidationException({ 'thumbnail': ['Thumbnail size must not exceed 5MB']});
      }

      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
      if (!allowedImageTypes.includes(thumbnailFile.mimetype)) {
        throw new ValidationException({ 'thumbnail': ['Thumbnail must be an image file (jpg, png, webp, gif)']});
      }
    }
    
    let videoPath: string | undefined;
    let thumbnailPath: string | undefined;

    // Upload video file if provided
    if (videoFile && createDto.type === TutorialType.FILE) {
      videoPath = await this.uploadService.uploadVideo(videoFile);
    }

    // Upload thumbnail if provided
    if (thumbnailFile) {
      thumbnailPath = await this.uploadService.uploadThumbnail(thumbnailFile);
    }

    return await this.tutorialService.create(
      createDto,
      user.id,
      videoPath,
      thumbnailPath,
    );
  }


  @Get('featured')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all featured tutorials' })
  @ApiResponse({
    status: 200,
    description: 'Featured tutorials retrieved successfully',
    type: PaginatedResponseDto<TutorialResponseDto>,
  })
  async getFeatured(@Query() queryDto: TutorialQueryDto): Promise<PaginatedResponseDto<TutorialResponseDto>> {
    
    const filters = {
      search: queryDto.search?.trim() || '',
      tutorialCategoryId: queryDto.tutorialCategoryId,
      isFeatured: true,
    };

    const { items, totalCount } = await this.tutorialService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);

  }


  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
     FileFieldsInterceptor([
      { name: 'videoFile', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ])
  )
  @ApiOperation({ summary: 'Update a tutorial' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Tutorial ID' })
  @ApiBody({ type: CreateTutorialDto })
  @ApiResponse({
    status: 200,
    description: 'Tutorial updated successfully',
    type: TutorialResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Tutorial not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateTutorialDto,
    @CurrentUser() user: UserResponseDto,
    @UploadedFiles()
    files?: {
      videoFile?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ): Promise<TutorialResponseDto> {
    const videoFile = files?.videoFile?.[0];
    const thumbnailFile = files?.thumbnail?.[0];

    // Validate type-specific requirements
    if (updateDto.type === TutorialType.LINK && !updateDto.sourceLink) {
      throw new ValidationException({ 'sourceLink': ['Source link is required when type is "link"']});
    }

    // Validate video file if provided
    if (videoFile) {
      const maxVideoSize = 100 * 1024 * 1024; // 100MB
      if (videoFile.size > maxVideoSize) {
        throw new ValidationException({ 'videoFile': ['Video file size must not exceed 100MB']});
      }

      const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm', 'video/x-matroska'];
      if (!allowedVideoTypes.includes(videoFile.mimetype)) {
        throw new ValidationException({ 'videoFile': ['Invalid video format. Allowed: mp4, avi, mov, wmv, webm, mkv']});
      }
    }


    // Validate thumbnail file if provided
    if (thumbnailFile) {
      const maxThumbnailSize = 5 * 1024 * 1024; // 5MB
      if (thumbnailFile.size > maxThumbnailSize) {
        throw new ValidationException({ 'thumbnail': ['Thumbnail size must not exceed 5MB']});
      }

      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
      if (!allowedImageTypes.includes(thumbnailFile.mimetype)) {
        throw new ValidationException({ 'thumbnail': ['Thumbnail must be an image file (jpg, png, webp, gif)']});
      }
    }


    let videoPath: string | undefined;
    let thumbnailPath: string | undefined;

    // Upload new video file if provided
    if (videoFile && updateDto.type === TutorialType.FILE) {
      videoPath = await this.uploadService.uploadVideo(videoFile);
    }

    // Upload new thumbnail if provided
    if (thumbnailFile) {
      thumbnailPath = await this.uploadService.uploadThumbnail(thumbnailFile);
    }

    return await this.tutorialService.update(id, updateDto, user.id, videoPath, thumbnailPath);
  }



  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get tutorial by ID' })
  @ApiResponse({
    status: 200,
    description: 'Airdrop event found',
    type: TutorialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Airdrop event not found' })
  async findOne(@Param('id') id: string): Promise<TutorialResponseDto> {
    return await this.tutorialService.findOne(id);
  }


  @Patch(':id/toggle-featured')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle tutorial featured status' })
  @ApiParam({ name: 'id', description: 'Tutorial ID' })
  @ApiResponse({
    status: 200,
    description: 'Tutorial featured status toggled successfully',
    type: TutorialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tutorial not found' })
  async toggleFeatured(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TutorialResponseDto> {
    return await this.tutorialService.toggleFeatured(id, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a tutorial' })
  @ApiResponse({ type: TutorialResponseDto })
  async delete( @Param('id') id: string, @CurrentUser() user: UserResponseDto): Promise<TutorialResponseDto> {
    return await this.tutorialService.delete(id, user.id);
  }

}
