import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
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
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { TicketCategoryService } from './ticket-category.service';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { TicketCategoryResponseDto } from './dto/ticket-category-response.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { TicketCategoryQueryDto } from './dto/ticket-category-query.dto';


@ApiTags('Ticket Categories')
@ApiBearerAuth("JWT-auth")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket-categories')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}


  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all ticket categories' })
  @ApiResponse({
    status: 200,
    description: 'Ticket categories retrieved successfully',
    type: PaginatedResponseDto<TicketCategoryResponseDto>
  })
  async findAll(@Query() paginationDto: TicketCategoryQueryDto): Promise<PaginatedResponseDto<TicketCategoryResponseDto>> {

    const filters = {
      search: paginationDto.search?.trim() || '',
    };

    // Pass page and limit directly, let service calculate skip/take
    const { items, totalCount } = await this.ticketCategoryService.findAll(
      filters,
      paginationDto.page,
      paginationDto.limit,
      paginationDto.sortBy,
      paginationDto.sortOrder
    );

    return new PaginatedResponseDto<TicketCategoryResponseDto>(
      items,
      totalCount,
      paginationDto.page,
      paginationDto.limit,
    );
  }


  @Get('active')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all active ticket categories' })
  @ApiResponse({
    status: 200,
    description: 'Ticket categories retrieved successfully',
    type: [TicketCategoryResponseDto],
  })
  async active(): Promise<TicketCategoryResponseDto[]> {
    return await this.ticketCategoryService.active();
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new ticket category' })
  @ApiBody({ type: CreateTicketCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Ticket category created successfully',
    type: TicketCategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createDto: CreateTicketCategoryDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketCategoryResponseDto> {
    return await this.ticketCategoryService.create(createDto, user.id);
  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get ticket category by ID' })
  @ApiParam({ name: 'id', description: 'Ticket category ID' })
  @ApiResponse({
    status: 200,
    description: 'Ticket category retrieved successfully',
    type: TicketCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket category not found' })
  async findOne(@Param('id') id: string): Promise<TicketCategoryResponseDto> {
    return await this.ticketCategoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a ticket category' })
  @ApiParam({ name: 'id', description: 'Ticket category ID' })
  @ApiBody({ type: UpdateTicketCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Ticket category updated successfully',
    type: TicketCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTicketCategoryDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketCategoryResponseDto> {
    return await this.ticketCategoryService.update(id, updateDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a ticket category' })
  @ApiParam({ name: 'id', description: 'Ticket category ID' })
  @ApiResponse({
    status: 200,
    description: 'Ticket category deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Ticket category not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<{ message: string }> {
    await this.ticketCategoryService.remove(id, user.id);
    return { message: 'Ticket category deleted successfully' };
  }

  @Patch(':id/toggle-status')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle ticket category active status' })
  @ApiParam({ name: 'id', description: 'Ticket category ID' })
  @ApiResponse({
    status: 200,
    description: 'Ticket category status toggled successfully',
    type: TicketCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket category not found' })
  async toggleStatus(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketCategoryResponseDto> {
    return await this.ticketCategoryService.toggleStatus(id, user.id);
  }
}