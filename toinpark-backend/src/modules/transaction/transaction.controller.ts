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
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from 'src/common/dto';

import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { Roles, CurrentUser } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { TransactionService } from './transaction.service';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { AdminTransctionQueryDto, MemberTransctionQueryDto, TransctionQueryDto } from './dto/transaction-query.dto';
import { ReferenceTransactionResponseDto } from './dto/reference-transaction-response.dto';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class TransactionController {
  constructor(private readonly transactionservice: TransactionService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all transactions with pagination' })
  @ApiResponse({
    status: 200,
    type: PaginatedResponseDto<TransactionResponseDto>,
  })
  async findAll(
    @Query() queryDto: TransctionQueryDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<PaginatedResponseDto<TransactionResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      trxType: queryDto.trxType,
      trxStatus: queryDto.trxStatus,
      userId: queryDto.userId,
    };

    const { items, totalCount } = await this.transactionservice.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
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
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.MEMBER)
  @ApiOperation({ summary: 'Get all transactions of member with pagination' })
  @ApiResponse({
    status: 200,
    type: PaginatedResponseDto<TransactionResponseDto>,
  })
  async findAllByMember(
    @Query() queryDto: MemberTransctionQueryDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<PaginatedResponseDto<TransactionResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      trxType: queryDto.trxType,
      trxStatus: queryDto.trxStatus,
      userId: user.id,
      levelId: queryDto.levelId,
    };

    const { items, totalCount } = await this.transactionservice.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }



  @Get('admin/member-history')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Admin get all transactions of a specific member' })
  @ApiResponse({
    status: 200,
    type: PaginatedResponseDto<TransactionResponseDto>,
  })
  async findAllByAdminForMember(
    @Query() queryDto: AdminTransctionQueryDto,
  ): Promise<PaginatedResponseDto<TransactionResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      trxType: queryDto.trxType,
      trxStatus: queryDto.trxStatus,
      userId: queryDto.userId,
      levelId: queryDto.levelId,
    };

    const { items, totalCount } = await this.transactionservice.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );
  }



  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.MEMBER)
  @ApiOperation({ summary: 'Get a single transaction' })
  async findOne(@Param('id') id: string) {
    return await this.transactionservice.findOne(id);
  }


}
