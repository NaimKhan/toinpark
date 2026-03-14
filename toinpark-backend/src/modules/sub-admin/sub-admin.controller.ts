import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
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
  ApiParam,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { AdminQueryDto } from './dto/admin-query.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { SubAdminService } from './sub-admin.service';
import { UpdateMemberStatusDto } from '../member/dto/update-member-status.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Sub-Admin Management')
@Controller('sub-admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class SubAdminController {
  constructor(private readonly subAdminService: SubAdminService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new admin user' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: 'Admin created successfully',
    type: AdminResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 422, description: 'Validation error' })
  async create(
    @Body() dto: CreateAdminDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AdminResponseDto> {
    return await this.subAdminService.create(dto, user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all admin users with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of admin users',
    type: PaginatedResponseDto<AdminResponseDto>,
  })
  async findAll(
    @Query() queryDto: AdminQueryDto,
  ): Promise<PaginatedResponseDto<AdminResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
    };

    const { items, totalCount } = await this.subAdminService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get admin user details by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin details',
    type: AdminResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async findOne(@Param('id') id: string): Promise<AdminResponseDto> {
    return await this.subAdminService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update admin user details' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({
    status: 200,
    description: 'Admin updated successfully',
    type: AdminResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @ApiResponse({ status: 422, description: 'Validation error' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAdminDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AdminResponseDto> {
    return await this.subAdminService.update(id, dto, user.id);
  }

  

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update admin status' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiBody({ type: UpdateMemberStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Admin status updated successfully',
    type: AdminResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateMemberStatusDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AdminResponseDto> {
    return await this.subAdminService.updateStatus(id, dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete admin user (soft delete)' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin deleted successfully',
    type: AdminResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AdminResponseDto> {
    return await this.subAdminService.delete(id, user.id);
  }
}
