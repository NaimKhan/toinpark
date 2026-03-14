// src/notifications/notifications.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, NotificationResponseDto, QueryNotificationsDto, UpdateNotificationDto } from './dto/notification.dto';
import { plainToInstance } from 'class-transformer';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: createNotificationDto
    });
    

    return notification;
  }


    /**
   * Create notifications for multiple users in batch
   * More efficient for announcements sent to many users
   */
  async createBatch(
    userIds: string[],
    title: string,
    message: string,
    type: NotificationType,
    data?: any,
  ): Promise<number> {
    if (userIds.length === 0) {
      return 0;
    }

    const result = await this.prisma.notification.createMany({
      data: userIds.map(userId => ({
        userId,
        title,
        message,
        type,
        data: data || undefined,
        isRead: false,
      })),
      skipDuplicates: true,
    });

    return result.count;
  }


  /**
   * Get latest notifications for multiple users (for WebSocket broadcasting)
   */
  async getLatestByUserIds(
    userIds: string[],
    limit: number = 1,
  ): Promise<Map<string, NotificationResponseDto>> {
    if (userIds.length === 0) {
      return new Map();
    }

    const notifications = await this.prisma.notification.findMany({
      where: {
        userId: { in: userIds },
      },
      orderBy: { createdAt: 'desc' },
      take: userIds.length * limit,
    });

    // Group by userId and get the latest notification for each user
    const notificationMap = new Map<string, NotificationResponseDto>();
    
    notifications.forEach(notification => {
      if (!notificationMap.has(notification.userId)) {
        notificationMap.set(
          notification.userId,
          plainToInstance(NotificationResponseDto, notification, {
            excludeExtraneousValues: true,
          }),
        );
      }
    });

    return notificationMap;
  }



  
  async findOne(id: string, userId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async update(id: string, userId: string, updateNotificationDto: UpdateNotificationDto) {
    await this.findOne(id, userId); // Verify ownership

    const notification = await this.prisma.notification.update({
      where: { id },
      data: {
        ...updateNotificationDto,
        ...(updateNotificationDto.isRead && { readAt: new Date() }),
      },
    });

    return notification;
  }

  async markAsRead(id: string, userId: string) {
    return this.update(id, userId, { isRead: true });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    return { message: 'All notifications marked as read' };
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Verify ownership

    await this.prisma.notification.delete({
      where: { id },
    });

    return { message: 'Notification deleted successfully' };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });

    return { count };
  }

  /**
   * Get all notifications with pagination and filters
   */
  async findAll(
    userId: string,
    filters: any,
    page = 1,
    limit = 10,
    sortBy: DefaultSortField = DefaultSortField.CREATED_AT,
    sortOrder: EnumSortOrder = EnumSortOrder.DESC,
  ): Promise<{ items: NotificationResponseDto[]; totalCount: number }> {
    
    const skip = (page - 1) * limit;

    const where: any = {
      userId,
      ...(filters.search && {
        OR: [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { message: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
      ...(filters.type && { type: filters.type }),
      ...(filters.isUnread !== undefined && { isRead: !filters.isUnread }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      items: plainToInstance(NotificationResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }
  

  async deleteAll(userId: string) {
    await this.prisma.notification.deleteMany({
      where: { userId },
    });

    return { message: 'All notifications deleted successfully' };
  }
}