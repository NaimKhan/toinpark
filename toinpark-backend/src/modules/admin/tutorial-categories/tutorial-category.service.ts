import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTutorialCategoryDto } from './dto/create-tutorial-category.dto';
import { UpdateTutorialCategoryDto } from './dto/update-tutorial-category.dto';
import { TutorialCategoryResponseDto } from './dto/tutorial-category-response.dto';
import { plainToInstance } from 'class-transformer';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';

@Injectable()
export class TutorialCategoryService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Get all tutorial categories with filter
   */
  async findAll(
    filters: { search?: string; isActive?: boolean },
    page: number,
    limit: number,
    sortBy?: DefaultSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: TutorialCategoryResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [{ name: { contains: filters.search, mode: 'insensitive' } }];
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.tutorialCategory.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.tutorialCategory.count({ where }),
    ]);

    const formattedData = plainToInstance(TutorialCategoryResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items: formattedData, totalCount };
  }


  /**
   * Create a new tutorial category
   */
  async create(createDto: CreateTutorialCategoryDto, createdBy?: string): Promise<TutorialCategoryResponseDto> {
    const existing = await this.prisma.tutorialCategory.findFirst({
      where: { name: createDto.name, deletedAt: null },
    });

    if (existing) {
      throw new ConflictException(
        `Tutorial category '${createDto.name}' already exists`,
      );
    }

    const category = await this.prisma.tutorialCategory.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        isActive: createDto.isActive ?? true,
        createdBy,
      },
    });

    return plainToInstance(TutorialCategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Get a single tutorial category by ID
   */
  async findOne(id: string): Promise<TutorialCategoryResponseDto> {
    const category = await this.prisma.tutorialCategory.findFirst({
      where: { id, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`Tutorial category with ID ${id} not found`);
    }

    return plainToInstance(TutorialCategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Update a tutorial category
   */
  async update(id: string, updateDto: UpdateTutorialCategoryDto): Promise<TutorialCategoryResponseDto> {
    await this.findOne(id);

    if (updateDto.name) {
      const existing = await this.prisma.tutorialCategory.findFirst({
        where: { name: updateDto.name, id: { not: id }, deletedAt: null },
      });

      if (existing) {
        throw new ConflictException(
          `Tutorial category '${updateDto.name}' already exists`,
        );
      }
    }

    const updated = await this.prisma.tutorialCategory.update({
      where: { id },
      data: {
        ...(updateDto.name && { name: updateDto.name }),
        ...(Object.prototype.hasOwnProperty.call(updateDto, 'description') && {description: updateDto.description}),
        ...(updateDto.isActive !== undefined && {
          isActive: updateDto.isActive,
        }),
        updatedAt: new Date(),
      },
    });

    return plainToInstance(TutorialCategoryResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Soft delete a tutorial category
   */
  async remove(id: string, deletedBy?: string): Promise<TutorialCategoryResponseDto> {
    const category = await this.findOne(id);

    // Check if category has associated tutorials
    const hasTutorials = await this.prisma.tutorial.count({
      where: {
        tutorialCategoryId: id,
        deletedAt: null,
      },
    });

    if (hasTutorials > 0) {
      throw new BadRequestException(
        'Cannot delete tutorial category with associated tutorials',
      );
    }

    await this.prisma.tutorialCategory.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });

    return category;
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string): Promise<TutorialCategoryResponseDto> {
    const category = await this.findOne(id);

    const updated = await this.prisma.tutorialCategory.update({
      where: { id },
      data: {
        isActive: !category.isActive,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(TutorialCategoryResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }
}
