// src/notifications/notifications.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { CreateNotificationDto, NotificationResponseDto, QueryNotificationsDto } from './dto/notification.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserResponseDto } from '../auth/dto/auth.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { PaginatedResponseDto } from 'src/common/dto';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')

export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Post()
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create and send notification' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationService.create(createNotificationDto);
    
    // Send real-time notification
    await this.notificationGateway.sendToUser(notification.userId, notification);
    
    return notification;
  }


  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get all notifications with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of notifications',
    type: PaginatedResponseDto<NotificationResponseDto>,
  })
  async findAll(
    @Query() queryDto: QueryNotificationsDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<PaginatedResponseDto<NotificationResponseDto>> {

    const filters = {
      search: queryDto.search?.trim() || '',
      isUnread: queryDto.isUnread,
    };

    const { items, totalCount } = await this.notificationService.findAll(
      user.id,
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }


  @Get('unread-count')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get unread notification count' })
  getUnreadCount(@CurrentUser() user: UserResponseDto) {
    return this.notificationService.getUnreadCount(user.id);
  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get single notification' })
  findOne(@Param('id') id: string, @CurrentUser() user: UserResponseDto) {
    return this.notificationService.findOne(id, user.id);
  }


  @Patch(':id/read')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Param('id') id: string, @CurrentUser() user: UserResponseDto) {
    return this.notificationService.markAsRead(id, user.id);
  }

  @Post('mark-all-read')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllAsRead(@CurrentUser() user: UserResponseDto) {
    return this.notificationService.markAllAsRead(user.id);
  }

  @Delete(':id')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete notification' })
  remove(@Param('id') id: string, @CurrentUser() user: UserResponseDto) {
    return this.notificationService.remove(id, user.id);
  }

  @Delete()
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete all notifications' })
  deleteAll(@CurrentUser() user: UserResponseDto) {
    return this.notificationService.deleteAll(user.id);
  }

}