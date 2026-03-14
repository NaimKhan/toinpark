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
  ApiParam,
} from '@nestjs/swagger';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { StakingPackagePlanService } from './staking-package-plan.service';
import { CreateStakingPackagePlanDto } from './dto/create-staking-package-plan.dto';
import { StakingPackageResponseDto } from './dto/staking-package-plan-response.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { StakingPackagePlanQuery } from './dto/staking-package-plan-query.query';

@ApiTags('Staking Package Plans')
@Controller('staking-package-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class StakingPackagePlanController {
  constructor(private readonly stakingPackagePlanService: StakingPackagePlanService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all staking package plans with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of staking package plans',
    type: PaginatedResponseDto<StakingPackageResponseDto>,
  })
  async findAll(
    @Query() queryDto: StakingPackagePlanQuery,
  ): Promise<PaginatedResponseDto<StakingPackageResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
    };

    const { items, totalCount } = await this.stakingPackagePlanService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get('active')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all active staking package plans' })
  @ApiResponse({
    status: 200,
    description: 'List of active staking package plans',
    type: PaginatedResponseDto<StakingPackageResponseDto>,
  })
  async getActivePlans(
    @Query() queryDto: StakingPackagePlanQuery,
  ): Promise<PaginatedResponseDto<StakingPackageResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      isActive: true,
    };

    const { items, totalCount } = await this.stakingPackagePlanService.findAll(
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
  @ApiOperation({ summary: 'Create a new staking package plan' })
  @ApiBody({ type: CreateStakingPackagePlanDto })
  @ApiResponse({
    status: 201,
    description: 'Staking package plan created successfully',
    type: StakingPackageResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() dto: CreateStakingPackagePlanDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<StakingPackageResponseDto> {
    return await this.stakingPackagePlanService.create(dto, user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get a staking package plan by ID' })
  @ApiParam({ name: 'id', description: 'Staking package plan ID' })
  @ApiResponse({
    status: 200,
    description: 'Staking package plan details',
    type: StakingPackageResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async findOne(@Param('id') id: string): Promise<StakingPackageResponseDto> {
    return await this.stakingPackagePlanService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update a staking package plan' })
  @ApiParam({ name: 'id', description: 'Staking package plan ID' })
  @ApiBody({ type: CreateStakingPackagePlanDto })
  @ApiResponse({
    status: 200,
    description: 'Staking package plan updated successfully',
    type: StakingPackageResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateStakingPackagePlanDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<StakingPackageResponseDto> {
    return await this.stakingPackagePlanService.update(id, dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a staking package plan' })
  @ApiParam({ name: 'id', description: 'Staking package plan ID' })
  @ApiResponse({
    status: 200,
    description: 'Staking package plan deleted successfully',
    type: StakingPackageResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Cannot delete plan in use' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<StakingPackageResponseDto> {
    return await this.stakingPackagePlanService.remove(id, user.id);
  }

  @Patch(':id/toggle-active')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Toggle active status of a staking package plan' })
  @ApiParam({ name: 'id', description: 'Staking package plan ID' })
  @ApiResponse({
    status: 200,
    description: 'Plan active status toggled successfully',
    type: StakingPackageResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async toggleActive(@Param('id') id: string): Promise<StakingPackageResponseDto> {
    return await this.stakingPackagePlanService.toggleActive(id);
  }
}