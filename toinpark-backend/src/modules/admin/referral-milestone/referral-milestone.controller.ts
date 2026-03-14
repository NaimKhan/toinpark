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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReferralMilestoneService } from './referral-milestone.service';
import { CreateReferralMilestoneDto } from './dto/create-referral-milestone.dto';
import { UpdateReferralMilestoneDto } from './dto/update-referral-milestone.dto';
import { ReferralMilestoneResponseDto } from './dto/referral-milestone-response.dto';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

@ApiTags('Admin - Referral Milestones')
@Controller('referral-milestones')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ReferralMilestoneController {
  constructor(private readonly referralMilestoneService: ReferralMilestoneService,) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all referral milestones' })
  @ApiResponse({
    status: 200,
    description: 'List of referral milestones',
    type: PaginatedResponseDto<ReferralMilestoneResponseDto>,
  })
  async findAll(@Query() paginationDto: PaginationQueryDto): Promise<PaginatedResponseDto<ReferralMilestoneResponseDto>> {
    const filters = {
      search: paginationDto.search?.trim() || '',
    };

    const { items, totalCount } = await this.referralMilestoneService.findAll(
      filters,
      paginationDto.page,
      paginationDto.limit,
    );

    return new PaginatedResponseDto<ReferralMilestoneResponseDto>(
      items,
      totalCount,
      paginationDto.page,
      paginationDto.limit,
    );
  }


  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new referral milestone' })
  @ApiResponse({
    status: 201,
    description: 'Referral milestone created successfully',
    type: ReferralMilestoneResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Referral milestone name already exists',
  })
  async create(
    @Body() createDto: CreateReferralMilestoneDto,
    @CurrentUser() user: UserResponseDto
  ): Promise<ReferralMilestoneResponseDto> {
    return await this.referralMilestoneService.create(createDto, user.id);
  }


  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a referral milestone by ID' })
  @ApiResponse({
    status: 200,
    description: 'Referral milestone found',
    type: ReferralMilestoneResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Referral milestone not found' })
  async findOne(@Param('id') id: string): Promise<ReferralMilestoneResponseDto> {
    return await this.referralMilestoneService.findOne(id);
  }


  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a referral milestone' })
  @ApiResponse({
    status: 200,
    description: 'Referral milestone updated successfully',
    type: ReferralMilestoneResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Referral milestone not found' })
  @ApiResponse({
    status: 409,
    description: 'Referral milestone name already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateReferralMilestoneDto,
    @CurrentUser() user: UserResponseDto
  ): Promise<ReferralMilestoneResponseDto> {
    return await this.referralMilestoneService.update(id, updateDto, user.id);
  }


  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a referral milestone' })
  @ApiResponse({
    status: 200,
    description: 'Referral milestone deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Referral milestone not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto
  ): Promise<ReferralMilestoneResponseDto> {
    return await this.referralMilestoneService.remove(id, user.id);
  }

  
  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle active status of a referral milestone' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: ReferralMilestoneResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Referral milestone not found' })
  async toggleActive(@Param('id') id: string): Promise<ReferralMilestoneResponseDto> {
    return await this.referralMilestoneService.toggleActive(id);
  }
}
