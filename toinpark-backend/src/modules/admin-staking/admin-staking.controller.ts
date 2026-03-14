import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { AdminStakingService } from './admin-staking.service';
import {
  AdminStakingDto,
  AdminUserStakingPackageResponseDto,
  AdminStakingFilterDto,
} from './dto/admin-staking.dto';
import { PaginatedResponseDto } from 'src/common/dto';
import { UserStakingPackageResponseDto } from '../user-staking-package/dto/user-staking-package.dto';

@ApiTags('Admin Staking')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('admin/staking')
export class AdminStakingController {
  constructor(private readonly adminStakingService: AdminStakingService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AdminStakingDto })
  @ApiOperation({ summary: 'Admin stake on behalf of user' })
  @ApiResponse({
    status: 200,
    description: 'Staking created successfully',
    type: AdminUserStakingPackageResponseDto,
  })
  async stakeOnBehalfOfUser(
    @CurrentUser() admin: UserResponseDto,
    @Body() adminStakingDto: AdminStakingDto,
  ): Promise<AdminUserStakingPackageResponseDto> {
    return this.adminStakingService.stakeOnBehalfOfUser(adminStakingDto, admin.id);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List stakings created by admins' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of admin-created stakings',
    type: PaginatedResponseDto<UserStakingPackageResponseDto>,
  })
  async findAll(
    @Query() filters: AdminStakingFilterDto,
  ): Promise<PaginatedResponseDto<UserStakingPackageResponseDto>> {
    const { items, totalCount } = await this.adminStakingService.findAll(filters);
    return new PaginatedResponseDto<UserStakingPackageResponseDto>(
      items,
      totalCount,
      filters.page,
      filters.limit,
    );
  }
}
