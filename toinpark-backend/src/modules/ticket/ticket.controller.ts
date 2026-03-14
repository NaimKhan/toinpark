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
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { TicketStatus } from '@prisma/client';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { UpdateTicketPriorityDto } from './dto/update-ticket-priority.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { SendTicketReplyDto } from './dto/send-ticket-reply.dto';


@ApiTags('Tickets')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}


  @Get('list')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({
    status: 200,
    description: 'Tickets retrieved successfully',
    type: PaginatedResponseDto<TicketResponseDto>,
  })
  async findAll(@Query() queryDto: TicketQueryDto, @CurrentUser() user?: UserResponseDto):  Promise<PaginatedResponseDto<TicketResponseDto>> {

    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      priority: queryDto.priority,
      categoryId: queryDto.categoryId,
    };

    const { items, totalCount } = await this.ticketService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
      user,
    );

    return new PaginatedResponseDto(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );

  }


  @Post()
  @Roles(UserRole.MEMBER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({
    status: 201,
    description: 'Ticket created successfully',
    type: TicketResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create( @Body() createDto: CreateTicketDto, @CurrentUser() user: UserResponseDto): Promise<TicketResponseDto> {
    return await this.ticketService.create(createDto, user.id);
  }


  @Get('my-tickets')
  @Roles(UserRole.MEMBER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user tickets' })
  @ApiResponse({
    status: 200,
    description: 'User tickets retrieved successfully',
    type: PaginatedResponseDto<TicketResponseDto>,
  })
  async getMyTickets(
    @CurrentUser() user: UserResponseDto,
    @Query() queryDto: TicketQueryDto,
  ): Promise<PaginatedResponseDto<TicketResponseDto>> {

    const filters = {
      search: queryDto.search?.trim() || '',
      status: queryDto.status,
      priority: queryDto.priority,
      categoryId: queryDto.categoryId,
      createdBy: user.id,
    };

    const { items, totalCount } = await this.ticketService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
      user,
    );

    return new PaginatedResponseDto(
      items,
      totalCount,
      queryDto.page,
      queryDto.limit,
    );

  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get ticket by ID with all messages' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiResponse({
    status: 200,
    description: 'Ticket retrieved successfully',
    type: TicketResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.findOne(id, user);
  }



  @Post(':id/reply')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a reply/message to a ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiBody({ type: SendTicketReplyDto })
  @ApiResponse({
    status: 201,
    description: 'Reply sent successfully',
    type: TicketResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async sendReply(
    @Param('id') id: string,
    @Body() replyDto: SendTicketReplyDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.sendReply(id, replyDto.message, user);
  }

  @Patch(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({
    status: 200,
    description: 'Ticket updated successfully',
    type: TicketResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateTicketDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.update(id, updateDto, user);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update ticket status' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiBody({ type: UpdateTicketStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Ticket status updated successfully',
    type: TicketResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateTicketStatusDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.updateStatus(id, updateStatusDto.status, user.id);
  }

  @Patch(':id/priority')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update ticket priority' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiBody({ type: UpdateTicketPriorityDto })
  @ApiResponse({
    status: 200,
    description: 'Ticket priority updated successfully',
    type: TicketResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async updatePriority(
    @Param('id') id: string,
    @Body() updatePriorityDto: UpdateTicketPriorityDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.updatePriority(
      id,
      updatePriorityDto.priority,
      user.id,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiResponse({
    status: 200,
    description: 'Ticket deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async remove( @Param('id') id: string, @CurrentUser() user: UserResponseDto ): Promise<{ message: string }> {
    await this.ticketService.remove(id, user);
    return { message: 'Ticket deleted successfully' };
  }
}