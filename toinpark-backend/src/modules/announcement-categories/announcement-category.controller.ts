import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AnnouncementCategoryService } from './announcement-category.service';
import { CreateAnnouncementCategoryDto } from './dto/create-announcement-category.dto';
import {
  AnnouncementCategoryResponseDto
} from './dto/announcement-category-response.dto';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { AnnouncementCategoryQueryDto } from './dto/announcement-category-query.dto';

@ApiTags('Announcement Categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('announcement-categories')
export class AnnouncementCategoryController {
  constructor(private readonly announcementCategoryService: AnnouncementCategoryService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all announcement categories with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of announcement categories',
    type: PaginatedResponseDto<AnnouncementCategoryResponseDto>
  })
  async findAll(@Query() paginationDto: AnnouncementCategoryQueryDto): Promise<PaginatedResponseDto<AnnouncementCategoryResponseDto>> {
    
    const filters = {
      search: paginationDto.search?.trim() || '',
      isActive: paginationDto.isActive ? paginationDto.isActive === 'true' : undefined,
    };

    // Pass page and limit directly, let service calculate skip/take
    const { items, totalCount } = await this.announcementCategoryService.findAll(
      filters,
      paginationDto.page,
      paginationDto.limit,
      paginationDto.sortBy,
      paginationDto.sortOrder

    );

    return new PaginatedResponseDto<AnnouncementCategoryResponseDto>(
      items,
      totalCount,
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new announcement category' })
  @ApiResponse({
    status: 201,
    description: 'Announcement category created successfully',
    type: AnnouncementCategoryResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  async create(@Body() createDto: CreateAnnouncementCategoryDto, @CurrentUser() user: UserResponseDto): Promise<AnnouncementCategoryResponseDto> {
    return await this.announcementCategoryService.create(createDto, user.id);
  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get an announcement category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Announcement category found',
    type: AnnouncementCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Announcement category not found' })
  async findOne(@Param('id') id: string): Promise<AnnouncementCategoryResponseDto> {
    return await this.announcementCategoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update an announcement category' })
  @ApiResponse({
    status: 200,
    description: 'Announcement category updated successfully',
    type: AnnouncementCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Announcement category not found' })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  async update( @Param('id') id: string, @Body() updateDto: CreateAnnouncementCategoryDto, @CurrentUser() user: UserResponseDto ): Promise<AnnouncementCategoryResponseDto> {
    return await this.announcementCategoryService.update(id, updateDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Soft delete an announcement category' })
  @ApiResponse({
    status: 200,
    description: 'Announcement category deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Announcement category not found' })
  async remove( @Param('id') id: string, @CurrentUser() user: UserResponseDto): Promise<AnnouncementCategoryResponseDto> {
    return await this.announcementCategoryService.remove(id, user.id);
  }

  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Toggle active status of an announcement category' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: AnnouncementCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Announcement category not found' })
  async toggleActive(@Param('id') id: string): Promise<AnnouncementCategoryResponseDto> {
    return await this.announcementCategoryService.toggleActive(id);
  }
}

