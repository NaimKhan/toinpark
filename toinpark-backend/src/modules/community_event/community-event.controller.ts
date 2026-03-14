import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { CommunityEventService } from './community-event.service';
import { CreateCommunityEventDto } from './dto/create-community-event.dto';
import { UpdateCommunityEventDto } from './dto/update-community-event.dto';
import { CommunityEventResponseDto } from './dto/community-event-response.dto';
import { CommunityEventQueryDto, FeaturedCommunityEventQueryDto } from './dto/community-event-query.dto';
import { PaginatedResponseDto } from 'src/common/dto';
import { UploadService } from 'src/common/services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserRole } from 'src/common/enums/user-role.enum';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';

@ApiTags('Community Events')
@Controller('community-events')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class CommunityEventController {
  constructor(private readonly communityEventService: CommunityEventService,
              private readonly uploadService: UploadService
  ) {}

  @Get('list')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all community events with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of community events',
    type: PaginatedResponseDto<CommunityEventResponseDto>,
  })
  async findAll(
    @Query() queryDto: CommunityEventQueryDto,
  ): Promise<PaginatedResponseDto<CommunityEventResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      eventType: queryDto.eventType,
      isActive: queryDto.isActive ? queryDto.isActive === 'true' : undefined,
    };

    const { items, totalCount } = await this.communityEventService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto<CommunityEventResponseDto>(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }


  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('bannerImage'))
  @ApiOperation({ summary: 'Create a new community event' })
  @ApiBody({ type: CreateCommunityEventDto })
  @ApiConsumes('multipart/form-data') 
  @ApiResponse({
    status: 201,
    description: 'Community event created successfully',
    type: CommunityEventResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createDto: CreateCommunityEventDto,
    @CurrentUser() user: UserResponseDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    bannerImage?: Express.Multer.File,
  ): Promise<CommunityEventResponseDto> {

    let bannerImageUrl: string | undefined;

    if (bannerImage) {
      bannerImageUrl = await this.uploadService.uploadImage(bannerImage);
    }

    return await this.communityEventService.create(createDto, user.id, bannerImageUrl);
  }


  @Get('upcoming')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get upcoming community events' })
  @ApiResponse({
    status: 200,
    description: 'List of upcoming events',
    type: [CommunityEventResponseDto],
  })
  async findUpcoming(
    @Query('limit') limit?: number,
  ): Promise<CommunityEventResponseDto[]> {
    return await this.communityEventService.findUpcoming(limit);
  }

  @Get('featured')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get featured community events' })
  @ApiResponse({
    status: 200,
    description: 'List of featured events',
    type: PaginatedResponseDto<CommunityEventResponseDto>,
  })
  async findFeatured(
    @Query() queryDto: FeaturedCommunityEventQueryDto,
  ): Promise<PaginatedResponseDto<CommunityEventResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      eventType: queryDto.eventType,
      isActive: true,
      isFeatured: true,
    };

    const { items, totalCount } = await this.communityEventService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto<CommunityEventResponseDto>(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a community event by ID' })
  @ApiResponse({
    status: 200,
    description: 'Community event found',
    type: CommunityEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Community event not found' })
  async findOne(@Param('id') id: string): Promise<CommunityEventResponseDto> {
    return await this.communityEventService.findOne(id);
  }


  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('bannerImage'))
  @ApiOperation({ summary: 'Create a new community event' })
  @ApiBody({ type: CreateCommunityEventDto })
  @ApiConsumes('multipart/form-data') 
  @ApiResponse({
    status: 200,
    description: 'Community event updated successfully',
    type: CommunityEventResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('id') id: string,
    @Body() createDto: CreateCommunityEventDto,
    @CurrentUser() user: UserResponseDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    bannerImage?: Express.Multer.File,
  ): Promise<CommunityEventResponseDto> {

    let bannerImageUrl: string | undefined;

    if (bannerImage) {
      bannerImageUrl = await this.uploadService.uploadImage(bannerImage);
    }

    return await this.communityEventService.update(id, createDto, user.id, bannerImageUrl);
  }


  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a community event' })
  @ApiResponse({
    status: 200,
    description: 'Community event deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Community event not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<CommunityEventResponseDto> {
    return await this.communityEventService.remove(id, user.id);
  }

  @Patch(':id/restore')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted community event' })
  @ApiResponse({
    status: 200,
    description: 'Community event restored successfully',
    type: CommunityEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Community event not found' })
  @ApiResponse({ status: 400, description: 'Community event is not deleted' })
  async restore(@Param('id') id: string): Promise<CommunityEventResponseDto> {
    return await this.communityEventService.restore(id);
  }

  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle active status of a community event' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: CommunityEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Community event not found' })
  async toggleActive(@Param('id') id: string): Promise<CommunityEventResponseDto> {
    return await this.communityEventService.toggleActive(id);
  }
  
  @Patch(':id/toggle-featured')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle featured status of a community event' })
  @ApiResponse({
    status: 200,
    description: 'Featured status toggled successfully',
    type: CommunityEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Community event not found' })
  async toggleFeatured(@Param('id') id: string): Promise<CommunityEventResponseDto> {
    return await this.communityEventService.toggleFeatured(id);
  }
}