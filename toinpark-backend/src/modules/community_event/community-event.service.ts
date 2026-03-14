import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateCommunityEventDto } from './dto/create-community-event.dto';
import { UpdateCommunityEventDto } from './dto/update-community-event.dto';
import { CommunityEventResponseDto } from './dto/community-event-response.dto';
import { UploadService } from 'src/common/services/upload.service';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { CommunityEventSortField } from './dto/community-event-sort-field.enum';

@Injectable()
export class CommunityEventService {
  constructor(private readonly prisma: PrismaService,
    private readonly uploadService: UploadService
  ) { }

  /**
   * Create a new community event
   */
  async create(
    createDto: CreateCommunityEventDto, userId?: string, bannerImageUrl?: string
  ): Promise<CommunityEventResponseDto> {
    try {
      const communityEvent = await this.prisma.communityEvent.create({
        data: {
          title: createDto.title,
          description: createDto.description,
          eventDate: createDto.eventDate ? new Date(createDto.eventDate) : null,
          address: createDto.address,
          mapLink: createDto.mapLink,
          eventLink: createDto.eventLink,
          bannerImageUrl: bannerImageUrl,
          eventType: createDto.eventType,
          isFeatured: false,
          locationName: createDto.locationName,
          eventLocation: createDto.eventLocation,
          isActive: true,
          createdBy: userId,
        },
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      // relative path to full path
      let createdCommunityEvent = plainToInstance(CommunityEventResponseDto, communityEvent, {
        excludeExtraneousValues: true,
      });
      createdCommunityEvent.media = await this.uploadService.getMediaDetails(communityEvent.bannerImageUrl);

      return createdCommunityEvent;

    } catch (error) {
      throw new BadRequestException('Failed to create community event');
    }
  }

  /**
   * Get all community events with filters and pagination
   */
  async findAll(
    filters: {
      search?: string;
      eventType?: string;
      isFeatured?: boolean;
      isActive?: boolean;
      startDate?: string;
      endDate?: string;
    },
    page: number,
    limit: number,
    sortBy: CommunityEventSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: CommunityEventResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };

    // Filter by active status
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    // Filter by featured status
    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }

    // Filter by event type
    if (filters.eventType) {
      where.eventType = filters.eventType;
    }

    // Date range filtering
    if (filters.startDate || filters.endDate) {
      where.eventDate = {};
      if (filters.startDate) {
        where.eventDate.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.eventDate.lte = new Date(filters.endDate);
      }
    }

    // Search across multiple fields
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { locationName: { contains: filters.search, mode: 'insensitive' } },
        { eventLocation: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }


    let [data, totalCount] = await Promise.all([
      this.prisma.communityEvent.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.communityEvent.count({ where }),
    ]);

    let formattedData = plainToInstance(CommunityEventResponseDto, data, {
      excludeExtraneousValues: true,
    });

    // get full file path from relative path
    formattedData = await Promise.all(
      formattedData.map(async (item) => {
        if (item.bannerImageUrl) {
          item.media = await this.uploadService.getMediaDetails(item.bannerImageUrl);
        }
        return item;
      })
    );

    return { items: formattedData, totalCount };
  }

  /**
   * Get upcoming events
   */
  async findUpcoming(
    limit: number = 10,
  ): Promise<CommunityEventResponseDto[]> {
    const now = new Date();

    let events = await this.prisma.communityEvent.findMany({
      where: {
        deletedAt: null,
        isActive: true,
        eventDate: {
          gte: now,
        },
      },
      take: limit,
      orderBy: { eventDate: 'asc' },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });


    let formattedData = plainToInstance(CommunityEventResponseDto, events, {
      excludeExtraneousValues: true,
    });

    // get full file path from relative path
    formattedData = await Promise.all(
      formattedData.map(async (item) => {
        if (item.bannerImageUrl) {
          item.media = await this.uploadService.getMediaDetails(item.bannerImageUrl);
        }
        return item;
      })
    );

    return formattedData;

  }

  /**
   * Get featured events
   */
  async findFeatured(): Promise<CommunityEventResponseDto[]> {
    let events = await this.prisma.communityEvent.findMany({
      where: {
        deletedAt: null,
        isActive: true,
        isFeatured: true,
      },
      orderBy: { eventDate: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });


    let formattedData = plainToInstance(CommunityEventResponseDto, events, {
      excludeExtraneousValues: true,
    });

    // get full file path from relative path
    formattedData = await Promise.all(
      formattedData.map(async (item) => {
        if (item.bannerImageUrl) {
          item.media = await this.uploadService.getMediaDetails(item.bannerImageUrl);
        }
        return item;
      })
    );

    return formattedData;
  }

  /**
   * Get a single community event by ID
   */
  async findOne(id: string): Promise<CommunityEventResponseDto> {
    const communityEvent = await this.prisma.communityEvent.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!communityEvent) {
      throw new NotFoundException(`Community event with ID ${id} not found`);
    }

    let createdEvent = plainToInstance(CommunityEventResponseDto, communityEvent, {
      excludeExtraneousValues: true,
    });

    // relative path to full path
    createdEvent.media = await this.uploadService.getMediaDetails(communityEvent.bannerImageUrl);

    return createdEvent;
  }

  /**
   * Update a community event
   */
  async update(
    id: string,
    updateDto: UpdateCommunityEventDto,
    userId?: string,
    bannerImageUrl?: string

  ): Promise<CommunityEventResponseDto> {
    // Check if exists
    const community = await this.findOne(id);

    // Delete old bannerImageUrl if uploading new bannerImageUrl
    if (community.bannerImageUrl && bannerImageUrl) {
      await this.uploadService.deleteFile(community.bannerImageUrl);
    }

    try {

      let updateData: any = {
        ...(updateDto.title !== undefined && { title: updateDto.title }),
        ...(updateDto.description !== undefined && {
          description: updateDto.description,
        }),
        ...(updateDto.eventDate !== undefined && {
          eventDate: updateDto.eventDate ? new Date(updateDto.eventDate) : null,
        }),
        ...(updateDto.address !== undefined && { address: updateDto.address }),
        ...(updateDto.mapLink !== undefined && { mapLink: updateDto.mapLink }),
        ...(updateDto.eventLink !== undefined && {
          eventLink: updateDto.eventLink,
        }),
        ...(updateDto.eventType !== undefined && {
          eventType: updateDto.eventType,
        }),

        ...(updateDto.locationName !== undefined && {
          locationName: updateDto.locationName,
        }),
        ...(updateDto.eventLocation !== undefined && {
          eventLocation: updateDto.eventLocation,
        }),
        updatedAt: new Date(),
        updatedBy: userId,
      };

      // Handle banner path
      if (bannerImageUrl) {
        updateData.bannerImageUrl = bannerImageUrl;
      }

      const updated = await this.prisma.communityEvent.update({
        where: { id: id },
        data: updateData,
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      // relative path to full path
      let updatedEvent = plainToInstance(CommunityEventResponseDto, updated, {
        excludeExtraneousValues: true,
      });

      // relative path to full path
      updatedEvent.media = await this.uploadService.getMediaDetails(updated.bannerImageUrl);

      return updatedEvent;

    } catch (error) {
      throw new BadRequestException('Failed to update community event');
    }
  }

  /**
   * Soft delete a community event
   */
  async remove(id: string, deletedBy?: string): Promise<CommunityEventResponseDto> {
    // Check if exists
    const communityEvent = await this.findOne(id);

    await this.prisma.communityEvent.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
    });

    await this.uploadService.deleteFile(communityEvent.bannerImageUrl);

    return communityEvent;
  }

  /**
   * Restore a soft-deleted community event
   */
  async restore(id: string): Promise<CommunityEventResponseDto> {
    const communityEvent = await this.prisma.communityEvent.findUnique({
      where: { id: id },
    });

    if (!communityEvent) {
      throw new NotFoundException(`Community event with ID ${id} not found`);
    }

    if (!communityEvent.deletedAt) {
      throw new BadRequestException('Community event is not deleted');
    }

    const restored = await this.prisma.communityEvent.update({
      where: { id: id },
      data: {
        deletedAt: null,
        deletedBy: null,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return plainToInstance(CommunityEventResponseDto, restored, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string): Promise<CommunityEventResponseDto> {
    const communityEvent = await this.findOne(id);

    const updated = await this.prisma.communityEvent.update({
      where: { id: id },
      data: {
        isActive: !communityEvent.isActive,
        updatedAt: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    // relative path to full path
    let updatedEvent = plainToInstance(CommunityEventResponseDto, updated, {
      excludeExtraneousValues: true,
    });

    // relative path to full path
    updatedEvent.media = await this.uploadService.getMediaDetails(updated.bannerImageUrl);

    return updatedEvent;
  }

  /**
   * Toggle featured status
   */
  async toggleFeatured(id: string): Promise<CommunityEventResponseDto> {
    const communityEvent = await this.findOne(id);

    const updated = await this.prisma.communityEvent.update({
      where: { id: id },
      data: {
        isFeatured: !communityEvent.isFeatured,
        updatedAt: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    // relative path to full path
    let updatedEvent = plainToInstance(CommunityEventResponseDto, updated, {
      excludeExtraneousValues: true,
    });

    // relative path to full path
    updatedEvent.media = await this.uploadService.getMediaDetails(updated.bannerImageUrl);

    return updatedEvent;

  }
}