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
import { PaginatedResponseDto } from 'src/common/dto';
import { WithdrawalRequestService } from './withdrawal-request.service';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { UpdateWithdrawalRequestDto } from './dto/update-withdrawal-request.dto';
import { UpdateWithdrawalStatusDto } from './dto/update-withdrawal-status.dto';
import { WithdrawalRequestResponseDto } from './dto/withdrawal-request-response.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { WithdrawalRequestQueryDto } from './dto/withdrawal-request-query.dto';

@ApiTags('Withdrawal Requests')
@Controller('withdrawal-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class WithdrawalRequestController {
  constructor(
    private readonly withdrawalRequestService: WithdrawalRequestService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all withdrawal requests with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of withdrawal requests',
    type: PaginatedResponseDto<WithdrawalRequestResponseDto>,
  })
  async findAll(
    @Query() queryDto: WithdrawalRequestQueryDto,
  ): Promise<PaginatedResponseDto<WithdrawalRequestResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      userStakingPackageId: queryDto.userStakingPackageId,
      currency: queryDto.currency,
    };

    const { items, totalCount } = await this.withdrawalRequestService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }

  @Get('member')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get member withdrawal requests (member only)' })
  @ApiResponse({
    status: 200,
    description: 'List of my withdrawal requests',
    type: PaginatedResponseDto<WithdrawalRequestResponseDto>,
  })
  async findMyWithdrawals(
    @Query() queryDto: WithdrawalRequestQueryDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<PaginatedResponseDto<WithdrawalRequestResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      currency: queryDto.currency,
    };

    const { items, totalCount } =
      await this.withdrawalRequestService.findMyWithdrawals(
        user.id,
        filters,
        queryDto.page,
        queryDto.limit,
        queryDto.sortBy,
        queryDto.sortOrder,
      );

    return new PaginatedResponseDto(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }


  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get withdrawal statistics' })
  @ApiResponse({ status: 200, description: 'Withdrawal statistics' })
  async getStatistics(@Query('userStakingPackageId') packageId?: string) {
    return await this.withdrawalRequestService.getStatistics(packageId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new withdrawal request' })
  @ApiBody({ type: CreateWithdrawalRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Withdrawal request created successfully',
    type: WithdrawalRequestResponseDto,
  })
  async create(
    @Body() dto: CreateWithdrawalRequestDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<WithdrawalRequestResponseDto> {
    return await this.withdrawalRequestService.create(dto, user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get a withdrawal request by ID' })
  @ApiResponse({
    status: 200,
    description: 'Withdrawal request details',
    type: WithdrawalRequestResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<WithdrawalRequestResponseDto> {
    return await this.withdrawalRequestService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update a withdrawal request' })
  @ApiBody({ type: UpdateWithdrawalRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Withdrawal request updated successfully',
    type: WithdrawalRequestResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWithdrawalRequestDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<WithdrawalRequestResponseDto> {
    return await this.withdrawalRequestService.update(id, dto);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update withdrawal request status' })
  @ApiBody({ type: UpdateWithdrawalStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Status updated successfully',
    type: WithdrawalRequestResponseDto,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateWithdrawalStatusDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<WithdrawalRequestResponseDto> {
    return await this.withdrawalRequestService.updateStatus(id, dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a withdrawal request' })
  @ApiResponse({
    status: 200,
    description: 'Withdrawal request deleted successfully',
    type: WithdrawalRequestResponseDto,
  })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<WithdrawalRequestResponseDto> {
    return await this.withdrawalRequestService.remove(id);
  }
}