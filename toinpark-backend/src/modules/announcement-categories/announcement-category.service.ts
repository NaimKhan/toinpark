import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateAnnouncementCategoryDto } from './dto/create-announcement-category.dto';
import { AnnouncementCategoryResponseDto } from './dto/announcement-category-response.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';

@Injectable()
export class AnnouncementCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all announcement categories with filter
   */
  async findAll(
    filters: { search?: string; isActive?: boolean },
    page: number,
    limit: number,
    sortBy?: DefaultSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: AnnouncementCategoryResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }


    const [data, totalCount] = await Promise.all([
      this.prisma.announcementCategory.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.announcementCategory.count({ where }),
    ]);

    const formattedData = plainToInstance(AnnouncementCategoryResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items: formattedData, totalCount };
  }

  /**
   * Create a new announcement category
   */
  async create( 
    createDto: CreateAnnouncementCategoryDto, createdBy: string
  ): Promise<AnnouncementCategoryResponseDto> {
    
    // Check if name already exists
    const existing = await this.prisma.announcementCategory.findFirst({
        where: { 
          name: createDto.name,
          deletedAt: null
        },
    });

    if (existing) {
        throw new ValidationException({
          "name" : [`Announcement category with name '${createDto.name}' already exists`]
        })
    }

    const announcementCategory = await this.prisma.announcementCategory.create({
        data: {
            name: createDto.name,
            description: createDto.description,
            isActive: createDto.isActive !== undefined ? createDto.isActive : true,
            createdBy: createdBy
        },
    });

    return plainToInstance(AnnouncementCategoryResponseDto, announcementCategory);
  }

  /**
   * Get a single announcement category by ID
   */
  async findOne(id: string): Promise<AnnouncementCategoryResponseDto> {
    const announcementCategory = await this.prisma.announcementCategory.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!announcementCategory) {
      throw new NotFoundException(`Announcement category with ID ${id} not found`);
    }

    return plainToInstance(AnnouncementCategoryResponseDto, announcementCategory);
  }

  /**
   * Update an announcement category
   */
  async update(
    id: string,
    updateDto: CreateAnnouncementCategoryDto,
    updatedBy: string
  ): Promise<AnnouncementCategoryResponseDto> {
    // Check if exists
    await this.findOne(id);

    // Check for duplicate name if updating name
    if (updateDto.name) {
      const existing = await this.prisma.announcementCategory.findFirst({
        where: {
          name: updateDto.name,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (existing) {
        throw new ValidationException({
          "name" : [`Announcement category with name '${updateDto.name}' already exists`]
        })
      }
    }

    const updated = await this.prisma.announcementCategory.update({
        where: { id: id },
        data: {
            ...(updateDto.name && { name: updateDto.name }),
            ...(updateDto.description !== undefined && {
            description: updateDto.description,
            }),
            ...(updateDto.isActive !== undefined && {
            isActive: updateDto.isActive,
            }),
            updatedAt: new Date(),
            updatedBy: updatedBy,
        },
    });

    return plainToInstance(AnnouncementCategoryResponseDto, updated);
  }

  /**
   * Soft delete an announcement category
   */
  async remove(id: string, deletedBy?: string): Promise<AnnouncementCategoryResponseDto> {
    // Check if exists
    const announcementCategory = await this.findOne(id);

    // Check if category has associated announcements
    const hasAnnouncements = await this.prisma.officialAnnouncement.count({
      where: {
        categoryId: id,
        deletedAt: null,
      },
    });

    if (hasAnnouncements > 0) {
      throw new BadRequestException(
        'Cannot delete announcement category with associated announcements',
      );
    }

    await this.prisma.announcementCategory.update({
        where: { id: id },
        data: {
            deletedAt: new Date(),
            deletedBy: deletedBy,
        },
    });

    return announcementCategory;
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string): Promise<AnnouncementCategoryResponseDto> {
    const announcementCategory = await this.findOne(id);

    const updated = await this.prisma.announcementCategory.update({
      where: { id: id },
      data: {
        isActive: !announcementCategory.isActive,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(AnnouncementCategoryResponseDto, updated);
  }
}

