import {
  Controller,
  Get,
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
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { MemberService } from './member.service';
import { MemberResponseDto } from './dto/member-response.dto';
import { MemberQueryDto } from './dto/member-query.dto';
import { DirectMemberQueryDto } from './dto/direct-member-query.dto';
import { DirectMemberPaginatedResponseDto } from './dto/direct-member-paginated-response.dto';
import { UpdateMemberStatusDto } from './dto/update-member-status.dto';
import { UpdateMemberProfileDto } from './dto/update-member-profile.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';

@ApiTags('Member Management')
@Controller('members')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all members with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of members',
    type: PaginatedResponseDto<MemberResponseDto>,
  })
  async findAll(
    @Query() queryDto: MemberQueryDto,
  ): Promise<PaginatedResponseDto<MemberResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      emailVerified: queryDto.emailVerified,
      phoneVerified: queryDto.phoneVerified,
      joinedFrom: queryDto.joinedFrom,
      joinedTo: queryDto.joinedTo,
    };

    const { items, totalCount } = await this.memberService.findAllMembers(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get('/direct-members')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all members with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of members',
    type: PaginatedResponseDto<MemberResponseDto>,
  })
  async findDirectMembers(
    @Query() queryDto: MemberQueryDto,
  ): Promise<PaginatedResponseDto<MemberResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      emailVerified: queryDto.emailVerified,
      phoneVerified: queryDto.phoneVerified,
      joinedFrom: queryDto.joinedFrom,
      joinedTo: queryDto.joinedTo,
      isDirectMember: true,
    };

    const { items, totalCount } = await this.memberService.findAllMembers(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get('/downline-members')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all members with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of members',
    type: PaginatedResponseDto<MemberResponseDto>,
  })
  async findDownLineMembers(
    @Query() queryDto: MemberQueryDto,
  ): Promise<PaginatedResponseDto<MemberResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      emailVerified: queryDto.emailVerified,
      phoneVerified: queryDto.phoneVerified,
      joinedFrom: queryDto.joinedFrom,
      joinedTo: queryDto.joinedTo,
      isDownLineMember: true,
    };

    const { items, totalCount } = await this.memberService.findAllMembers(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get(':id/direct-members')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get direct members of a user with pagination' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of direct members',
    type: DirectMemberPaginatedResponseDto,
  })
  async getLevelOneReferralsOfDirectUser(
    @Param('id') id: string,
    @Query() queryDto: DirectMemberQueryDto,
  ): Promise<DirectMemberPaginatedResponseDto> {
    const { items, totalCount, memberInfo } = await this.memberService.findLevelOneReferralsOfDirectUser(
      id,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new DirectMemberPaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit, memberInfo);
  }


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get member details by ID' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiResponse({
    status: 200,
    description: 'Member details',
    type: MemberResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async findOne(@Param('id') id: string): Promise<MemberResponseDto> {
    return await this.memberService.findOneMember(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update member status (activate/deactivate/suspend/block)' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiBody({ type: UpdateMemberStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Member status updated successfully',
    type: MemberResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateMemberStatusDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<MemberResponseDto> {
    return await this.memberService.updateMemberStatus(id, dto, user.id);
  }

  @Patch(':id/profile')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update member profile information' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiBody({ type: UpdateMemberProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Member profile updated successfully',
    type: MemberResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateMemberProfileDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<MemberResponseDto> {
    return await this.memberService.updateMemberProfile(id, dto, user.id);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete member (soft delete)' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiResponse({
    status: 200,
    description: 'Member deleted successfully',
    type: MemberResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Cannot delete member with active stakes' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<MemberResponseDto> {
    return await this.memberService.deleteMember(id, user.id);
  }

}