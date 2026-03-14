import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { UserStakingPackageService } from './user-staking-package.service';
import {
  UserStakingPackageQueryDto,
  UserStakingPackageResponseDto,
} from './dto/user-staking-package.dto';

@ApiTags('User Staking Packages')
@Controller('user-staking-packages')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class UserStakingPackageController {
  constructor(
    private readonly userStakingPackageService: UserStakingPackageService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all user staking packages with pagination (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'List of user staking packages',
    type: PaginatedResponseDto<UserStakingPackageResponseDto>,
  })
  async findAll(
    @Query() queryDto: UserStakingPackageQueryDto,
  ): Promise<PaginatedResponseDto<UserStakingPackageResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      userId: queryDto.userId,
      packageId: queryDto.packageId,
      isActive: queryDto.isActive,
      createdAtFrom: queryDto.createdAtFrom,
      createdAtTo: queryDto.createdAtTo,
    };

    const { items, totalCount } = await this.userStakingPackageService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get('my-stakes')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get current user staking packages (Member)' })
  @ApiResponse({
    status: 200,
    description: 'List of current user staking packages',
    type: PaginatedResponseDto<UserStakingPackageResponseDto>,
  })
  async findMyStakes(
    @CurrentUser() user: UserResponseDto,
    @Query() queryDto: UserStakingPackageQueryDto,
  ): Promise<PaginatedResponseDto<UserStakingPackageResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      packageId: queryDto.packageId,
      isActive: queryDto.isActive
    };

    const { items, totalCount } = await this.userStakingPackageService.findByMember(
      user.id,
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }

  // @Get('my-stakes/active')
  // @HttpCode(HttpStatus.OK)
  // @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  // @ApiOperation({ summary: 'Get current user active staking packages (Member)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of current user active staking packages',
  //   type: PaginatedResponseDto<UserStakingPackageResponseDto>,
  // })
  // async findMyActiveStakes(
  //   @CurrentUser() user: UserResponseDto,
  //   @Query() queryDto: UserStakingPackageQueryDto,
  // ): Promise<PaginatedResponseDto<UserStakingPackageResponseDto>> {
  //   const filters = {
  //     search: queryDto.search?.trim() || '',
  //     packageId: queryDto.packageId,
  //     isActive: true,
  //   };

  //   const { items, totalCount } = await this.userStakingPackageService.findByMember(
  //     user.id,
  //     filters,
  //     queryDto.page,
  //     queryDto.limit,
  //     queryDto.sortBy,
  //     queryDto.sortOrder,
  //   );

  //   return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  // }


  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get staking packages for specific user (Admin)' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of user staking packages for specific user',
    type: PaginatedResponseDto<UserStakingPackageResponseDto>,
  })
  async findByUser(
    @Param('userId') userId: string,
    @Query() queryDto: UserStakingPackageQueryDto,
  ): Promise<PaginatedResponseDto<UserStakingPackageResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      userId: userId,
      packageId: queryDto.packageId,
      isActive: queryDto.isActive
    };

    const { items, totalCount } = await this.userStakingPackageService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get a staking package by ID (Admin)' })
  @ApiParam({ name: 'id', description: 'Staking package ID' })
  @ApiResponse({
    status: 200,
    description: 'Staking package details',
    type: UserStakingPackageResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Staking package not found' })
  async findOne(@Param('id') id: string): Promise<UserStakingPackageResponseDto> {
    return await this.userStakingPackageService.findOne(id);
  }

  @Get('my-stakes/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get a staking package by ID (Member - own stakes only)' })
  @ApiParam({ name: 'id', description: 'Staking package ID' })
  @ApiResponse({
    status: 200,
    description: 'Staking package details',
    type: UserStakingPackageResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Staking package not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findMyStakeById(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<UserStakingPackageResponseDto> {
    return await this.userStakingPackageService.findOneForMember(id, user.id);
  }
}