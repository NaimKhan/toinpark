import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { StakingAdjustmentService } from './staking-adjustment.service';
import { StakingAdjustmentDeductDto, StakingAdjustmentResponseDto, UserStakingPackageListItemDto, StakingAdjustmentQueryDto, StakingAdjustmentListItemDto } from './dto/staking-adjustment.dto';
import { UserStakingPackageQueryDto } from './dto/user-staking-package-query.dto';
import { PaginatedResponseDto } from 'src/common/dto';

@ApiTags('Admin Staking Adjustment')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('admin/staking-adjustment')
export class StakingAdjustmentController {
  constructor(private readonly stakingAdjustmentService: StakingAdjustmentService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all staking adjustments' })
  @ApiResponse({
    status: 200,
    description: 'Staking adjustments retrieved successfully',
    type: PaginatedResponseDto<StakingAdjustmentListItemDto>,
  })
  async findAll(@Query() queryDto: StakingAdjustmentQueryDto): Promise<PaginatedResponseDto<StakingAdjustmentListItemDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
    };

    const { items, totalCount } = await this.stakingAdjustmentService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto<StakingAdjustmentListItemDto>(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }

  @Get('user-staking-packages/:user_id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all staking packages for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'User staking packages retrieved successfully',
    type: [UserStakingPackageListItemDto],
  })
  async getUserStakingPackages(
    @Param('user_id') userId: string,
    @Query() queryDto: UserStakingPackageQueryDto,
  ): Promise<UserStakingPackageListItemDto[]> {
    return this.stakingAdjustmentService.getUserStakingPackages(userId, queryDto);
  }

  @Post('deduct')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: StakingAdjustmentDeductDto })
  @ApiOperation({ summary: 'Deduct TOIN and USDT from a specific staking' })
  @ApiResponse({
    status: 200,
    description: 'Staking adjusted (deducted) successfully',
    type: StakingAdjustmentResponseDto,
  })
  async deduct(
    @CurrentUser() admin: UserResponseDto,
    @Body() dto: StakingAdjustmentDeductDto,
  ): Promise<StakingAdjustmentResponseDto> {
    return this.stakingAdjustmentService.deduct(dto, admin.id);
  }
}
