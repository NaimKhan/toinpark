import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserWalletAddressService } from './user-wallet-address.service';
import { CreateUserWalletAddressDto } from './dto/create-user-wallet-address.dto';
import { UpdateUserWalletAddressDto } from './dto/update-user-wallet-address.dto';
import { UserWalletAddressResponseDto } from './dto/user-wallet-address-response.dto';
import { UserWalletAddressQueryDto } from './dto/user-wallet-address-query.dto';
import { PaginatedResponseDto } from 'src/common/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';

@ApiTags('User Wallet Addresses')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user-wallet-addresses')
export class UserWalletAddressController {
  constructor(private readonly userWalletAddressService: UserWalletAddressService) {}

  @Post()
  @Roles(UserRole.MEMBER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user wallet address' })
  @ApiBody({ type: CreateUserWalletAddressDto })
  @ApiResponse({
    status: 201,
    description: 'Wallet address created successfully',
    type: UserWalletAddressResponseDto,
  })
  async create(
    @Body() createDto: CreateUserWalletAddressDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<UserWalletAddressResponseDto> {
    return this.userWalletAddressService.create(createDto, user.id);
  }

  @Get()
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all wallet addresses for current user' })
  @ApiResponse({
    status: 200,
    description: 'Wallet addresses retrieved successfully',
    type: PaginatedResponseDto<UserWalletAddressResponseDto>,
  })
  async findAll(
    @Query() query: UserWalletAddressQueryDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<PaginatedResponseDto<UserWalletAddressResponseDto>> {
    
    // If not admin, force userId filter to current user
    let role = UserRole.MEMBER;
    
    if (user.userRole && (user.userRole === UserRole.ADMIN || user.userRole === UserRole.SUPERADMIN)) {
        role = user.userRole as UserRole;
    }

    const { items, totalCount } = await this.userWalletAddressService.findAll(query, role, user.id);

    return new PaginatedResponseDto<UserWalletAddressResponseDto>(
      items,
      totalCount,
      query.page,
      query.limit,
    );
  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a single wallet address by ID' })
  @ApiResponse({
    status: 200,
    description: 'Wallet address retrieved successfully',
    type: UserWalletAddressResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wallet address not found' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<UserWalletAddressResponseDto> {
    return this.userWalletAddressService.findOne(id, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.MEMBER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update wallet address' })
  @ApiBody({ type: UpdateUserWalletAddressDto })
  @ApiResponse({
    status: 200,
    description: 'Wallet address updated successfully',
    type: UserWalletAddressResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wallet address not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserWalletAddressDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<UserWalletAddressResponseDto> {
    return this.userWalletAddressService.update(id, updateDto, user.id);
  }
}
