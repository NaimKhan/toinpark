import {
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateOfficialAnnouncementDto } from './dto/create-official-announcement.dto';
import { UpdateOfficialAnnouncementDto } from './dto/update-official-announcement.dto';
import { OfficialAnnouncementResponseDto } from './dto/official-announcement-response.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import { AudienceType, NotificationType, OfficialAnnouncement, UserStatus } from '@prisma/client';
import { AnnouncementSortField } from './dto/announcement-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { NotificationService } from 'src/core/notification/notification.service';
import { NotificationGateway } from 'src/core/notification/notification.gateway';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class OfficialAnnouncementService {
  private readonly logger = new Logger(OfficialAnnouncementService.name);

  constructor(private readonly prisma: PrismaService,
              private readonly notificationService: NotificationService,
              private readonly notificationGateway: NotificationGateway
  ) {}

  /**
   * Get all official announcements with filter
   */
  async findAll(
    filters: { search?: string; isActive?: boolean; categoryId?: string; audienceType?: AudienceType },
    page: number,
    limit: number,
    sortBy?: AnnouncementSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: OfficialAnnouncementResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.audienceType) {
      where.audienceType = filters.audienceType;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { message: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    
    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.officialAnnouncement.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          category: true,
        },
      }),
      this.prisma.officialAnnouncement.count({ where }),
    ]);

    const formattedData = plainToInstance(OfficialAnnouncementResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items: formattedData, totalCount };
  }

  /**
   * Create a new official announcement
   */
  async create( 
    createDto: CreateOfficialAnnouncementDto, 
    createdBy: string
  ): Promise<OfficialAnnouncementResponseDto> {
    
    // Verify category exists
    const category = await this.prisma.announcementCategory.findFirst({
      where: { 
        id: createDto.categoryId,
        deletedAt: null
      },
    });

    if (!category) {
      throw new ValidationException({
        "categoryId" : [`Announcement category with ID '${createDto.categoryId}' not found`]
      })
    }

    const announcement = await this.prisma.officialAnnouncement.create({
      data: {
        title: createDto.title,
        message: createDto.message,
        startDate: createDto.startDate ? new Date(createDto.startDate) : null,
        endDate: createDto.endDate ? new Date(createDto.endDate) : null,
        categoryId: createDto.categoryId,
        audienceType: createDto.audienceType,
        isActive: true,
        createdBy: createdBy,
      },
    });

    // Send notifications asynchronously (don't block the response)
    this.sendNotificationsToAudience(announcement).catch(error => {
      this.logger.error('❌ Failed to send notifications:', error);
    });


    return plainToInstance(OfficialAnnouncementResponseDto, announcement, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Send notifications to users based on audience type
   */
  private async sendNotificationsToAudience(announcement: OfficialAnnouncement): Promise<void> {
    try {
      const startTime = Date.now();

      // Get target users based on audience type
      const targetUserIds = await this.getTargetUserIdsByAudience(announcement.audienceType);

      if (targetUserIds.length === 0) {
        this.logger.warn(`⚠️  No users found for audience type: ${announcement.audienceType}`);
        return;
      }

      this.logger.log(`📢 Sending announcement to ${targetUserIds.length} users (${announcement.audienceType})`);

      // Create notifications in batch (efficient for many users)
      const createdCount = await this.notificationService.createBatch(
        targetUserIds,
        `📢 ${announcement.title}`,
        announcement.message,
        NotificationType.INFO,
      );

      this.logger.log(`✅ Created ${createdCount} notifications in database`);

      // Get the latest notification for each user (for WebSocket)
      const notificationMap = await this.notificationService.getLatestByUserIds(targetUserIds);

      // Send real-time notifications via WebSocket
      let sentCount = 0;

      for (const [userId, notification] of notificationMap.entries()) {
        try {
          await this.notificationGateway.sendToUser(userId, notification);
          sentCount++;
        } catch (error) {
          this.logger.error(`Failed to send WebSocket notification to user ${userId}:`, error.message);
        }
      }
      const duration = Date.now() - startTime;
      this.logger.log(`✅ Sent ${sentCount} real-time notifications via WebSocket`);
      this.logger.log(`⏱️  Total time: ${duration}ms`);
    } catch (error) {
      this.logger.error('❌ Error sending notifications to audience:', error);
    }
  }


  /**
   * Get user IDs based on audience type (OPTIMIZED - returns only IDs)
   */
  private async getTargetUserIdsByAudience(audienceType: AudienceType): Promise<string[]> {
    const whereCondition: any = {
      status: UserStatus.ACTIVE,
      deletedAt: null,
    };

    if (audienceType === AudienceType.MEMBER) {
      // Get all MEMBER users
      whereCondition.userRole = UserRole.MEMBER;
    } else if (audienceType === AudienceType.SYSTEM_USER) {
      // Get all ADMIN and SUPERADMIN users
      whereCondition.userRole = {
        in: [UserRole.ADMIN, UserRole.SUPERADMIN],
      };
    } else {
      this.logger.warn(`Unknown audience type: ${audienceType}`);
      return [];
    }

    // Select only the ID field for better performance
    const users = await this.prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
      },
    });

    // Return array of IDs directly
    return users.map(user => user.id);
  }



  /**
   * Get a single official announcement by ID
   */
  async findOne(id: string): Promise<OfficialAnnouncementResponseDto> {
    const announcement = await this.prisma.officialAnnouncement.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        category: true,
      },
    });

    if (!announcement) {
      throw new NotFoundException(`Official announcement with ID ${id} not found`);
    }

    return plainToInstance(OfficialAnnouncementResponseDto, announcement, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Update an official announcement
   */
  async update(
    id: string,
    updateDto: UpdateOfficialAnnouncementDto,
    updatedBy: string
  ): Promise<OfficialAnnouncementResponseDto> {
    // Check if exists
    await this.findOne(id);

    // Verify category exists if categoryId is being updated
    if (updateDto.categoryId) {
      const category = await this.prisma.announcementCategory.findFirst({
        where: { 
          id: updateDto.categoryId,
          deletedAt: null
        },
      });

      if (!category) {
        throw new ValidationException({
          "categoryId" : [`Announcement category with ID '${updateDto.categoryId}' not found`]
        });
      }
    }

    const updateData: any = {
      updatedAt: new Date(),
      updatedBy: updatedBy,
    };

    if (updateDto.title !== undefined) {
      updateData.title = updateDto.title;
    }

    if (updateDto.message !== undefined) {
      updateData.message = updateDto.message;
    }

    if (updateDto.startDate !== undefined) {
      updateData.startDate = updateDto.startDate ? new Date(updateDto.startDate) : null;
    }

    if (updateDto.endDate !== undefined) {
      updateData.endDate = updateDto.endDate ? new Date(updateDto.endDate) : null;
    }

    if (updateDto.categoryId !== undefined) {
      updateData.categoryId = updateDto.categoryId;
    }

    if (updateDto.audienceType !== undefined) {
      updateData.audienceType = updateDto.audienceType;
    }

    const updated = await this.prisma.officialAnnouncement.update({
      where: { id: id },
      data: updateData,
    });

    return plainToInstance(OfficialAnnouncementResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Soft delete an official announcement
   */
  async remove(id: string, deletedBy?: string): Promise<OfficialAnnouncementResponseDto> {
    // Check if exists
    const announcement = await this.findOne(id);

    await this.prisma.officialAnnouncement.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
    });

    return announcement;
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string): Promise<OfficialAnnouncementResponseDto> {
    const announcement = await this.findOne(id);

    const updated = await this.prisma.officialAnnouncement.update({
      where: { id: id },
      data: {
        isActive: !announcement.isActive,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(OfficialAnnouncementResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }
}

