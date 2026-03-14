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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { OfficialAnnouncementService } from './official-announcement.service';
import { CreateOfficialAnnouncementDto } from './dto/create-official-announcement.dto';
import { UpdateOfficialAnnouncementDto } from './dto/update-official-announcement.dto';
import { OfficialAnnouncementResponseDto } from './dto/official-announcement-response.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { AnnouncementQueryDto } from './dto/announcement-query.dto';

@ApiTags('Official Announcements')
@Controller('official-announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class OfficialAnnouncementController {
  constructor(private readonly officialAnnouncementService: OfficialAnnouncementService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all official announcements with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of official announcements',
    type: PaginatedResponseDto<OfficialAnnouncementResponseDto>,
  })
  async findAll(@Query() queryDto: AnnouncementQueryDto): Promise<PaginatedResponseDto<OfficialAnnouncementResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      audienceType: queryDto.audienceType,
      isActive: queryDto.isActive ? queryDto.isActive === 'true' : undefined,
    };

    const { items, totalCount } = await this.officialAnnouncementService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new official announcement' })
  @ApiBody({ type: CreateOfficialAnnouncementDto })
  @ApiResponse({
    status: 201,
    description: 'Official announcement created successfully',
    type: OfficialAnnouncementResponseDto,
  })
  async create(@Body() dto: CreateOfficialAnnouncementDto, @CurrentUser() user: UserResponseDto): Promise<OfficialAnnouncementResponseDto> {
    return await this.officialAnnouncementService.create(dto, user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get an official announcement by ID' })
  @ApiResponse({
    status: 200,
    description: 'Official announcement found',
    type: OfficialAnnouncementResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Official announcement not found' })
  async findOne(@Param('id') id: string): Promise<OfficialAnnouncementResponseDto> {
    return await this.officialAnnouncementService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update an official announcement' })
  @ApiBody({ type: UpdateOfficialAnnouncementDto })
  @ApiResponse({
    status: 200,
    description: 'Official announcement updated successfully',
    type: OfficialAnnouncementResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Official announcement not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateOfficialAnnouncementDto, @CurrentUser() user: UserResponseDto,): Promise<OfficialAnnouncementResponseDto> {
    return await this.officialAnnouncementService.update(id, dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete an official announcement' })
  @ApiResponse({
    status: 200,
    description: 'Official announcement deleted successfully',
    type: OfficialAnnouncementResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Official announcement not found' })
  async remove(@Param('id') id: string, @CurrentUser() user: UserResponseDto): Promise<OfficialAnnouncementResponseDto> {
    return await this.officialAnnouncementService.remove(id, user.id);
  }

  @Patch(':id/toggle-active')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Toggle active status of an official announcement' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: OfficialAnnouncementResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Official announcement not found' })
  async toggleActive(@Param('id') id: string): Promise<OfficialAnnouncementResponseDto> {
    return await this.officialAnnouncementService.toggleActive(id);
  }
}

