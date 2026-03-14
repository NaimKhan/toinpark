import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import {
  TutorialResponseDto,
  CreateTutorialDto,
  TutorialType,
} from './dto/tutorial.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import { UploadService } from 'src/common/services/upload.service';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { TutorialSortField } from './dto/tutorial-sort-field.enum';

@Injectable()
export class TutorialService {
  constructor(private readonly prisma: PrismaService,
              private readonly uploadService: UploadService
  ) {}

  async findAll(
    filters: any,
    page: number,
    limit: number,
    sortBy?: TutorialSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: TutorialResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    
    const where: any = {
      deletedAt: null,
      ...(filters.isActive !== undefined && { is_active: filters.isActive }),
    };

    // Search by tutorial title, description, or category name
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        {
          category: {
            name: { contains: filters.search, mode: 'insensitive' },
          },
        },
      ];
    }

    if (filters.tutorialCategoryId) {
      where.tutorialCategoryId = filters.tutorialCategoryId;
    }

    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }

    let orderBy: any = [
      { isFeatured: EnumSortOrder.DESC }, // Featured first
      { createdAt: EnumSortOrder.DESC },  // Newest first
    ];

    if (sortBy) {
      orderBy = [
        { isFeatured: EnumSortOrder.DESC },
        { [sortBy]: sortOrder ?? EnumSortOrder.DESC },
      ];
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.tutorial.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy,
      }),
      this.prisma.tutorial.count({ where }),
    ]);

    let itemsDto = plainToInstance(TutorialResponseDto, items, {
      excludeExtraneousValues: true,
    })

    // get full file path from relative path
    itemsDto = await Promise.all(
      itemsDto.map(async (item) => {
        if (item.filePath) {
          item.videoMedia = await this.uploadService.getMediaDetails(item.filePath);
        }

        if (item.thumbnailPath) {
          item.thumbnailMedia = await this.uploadService.getMediaDetails(item.thumbnailPath);
        }

        return item;
      })
    );

    return {
      items: itemsDto,
      totalCount,
    };
  }



  async create(
    createTutorialDto: CreateTutorialDto,
    userId: string,
    videoPath?: string,
    thumbnailPath?: string,
  ): Promise<TutorialResponseDto> {
    // Check if tutorial category exists
    const categoryExists = await this.prisma.tutorialCategory.findFirst({
      where: {
        id: createTutorialDto.tutorialCategoryId,
        deletedAt: null,
      },
    });

    if (!categoryExists) {
      throw new ValidationException({
        'tutorialCategoryId': [`Tutorial category with ID ${createTutorialDto.tutorialCategoryId} does not exist`]
      });
    }

    // Check if tutorial with same title already exists
    const tutorialExists = await this.prisma.tutorial.findFirst({
      where: {
        title: createTutorialDto.title,
        deletedAt: null,
      },
    });

    if (tutorialExists) {
      throw new ValidationException({
        'title': ['Tutorial with this name already exists']
      });
    }

    // Create tutorial
    const tutorial = await this.prisma.tutorial.create({
      data: {
        tutorialCategoryId: createTutorialDto.tutorialCategoryId,
        title: createTutorialDto.title,
        description: createTutorialDto.description ?? null,
        type: createTutorialDto.type,
        filePath: videoPath ?? null, // Use uploaded video path if provided
        thumbnailPath: thumbnailPath ?? null, // Use uploaded thumbnail path if provided
        sourceLink: createTutorialDto.sourceLink ?? null,
        isFeatured: createTutorialDto.isFeatured ?? false,
        isActive: true,
        createdBy: userId,
      },
      include: {
        category: true,
      },
    });

    let tutorialDto = plainToInstance(TutorialResponseDto, tutorial, {
      excludeExtraneousValues: true,
    });
    
    // file path to media details
    tutorialDto.videoMedia = await this.uploadService.getMediaDetails(tutorial.filePath)
    tutorialDto.thumbnailMedia =  await this.uploadService.getMediaDetails(tutorial.thumbnailPath)

    return tutorialDto;
  }



  async update(
    id: string,
    updateDto: CreateTutorialDto,
    userId: string,
    videoPath: string,
    thumbnailPath: string,
  ): Promise<TutorialResponseDto> {
    // Check if tutorial exists
    const tutorial = await this.prisma.tutorial.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!tutorial) {
      throw new NotFoundException(`Tutorial with ID ${id} not found`);
    }

    // Check if category exists (if being updated)
    if (updateDto.tutorialCategoryId) {
      const categoryExists = await this.prisma.tutorialCategory.findFirst({
        where: {
          id: updateDto.tutorialCategoryId,
          deletedAt: null,
        },
      });

      if (!categoryExists) {
        throw new ValidationException({
          'tutorialCategoryId': [`Tutorial category with ID ${updateDto.tutorialCategoryId} does not exist`]
        });
      }
    }

    // Check if title is being changed and if it conflicts with another tutorial
    if (updateDto.title && updateDto.title !== tutorial.title) {
      const titleExists = await this.prisma.tutorial.findFirst({
        where: {
          title: updateDto.title,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (titleExists) {
        
        throw new ValidationException({
          'title': ['Tutorial with this title already exists']
        });
      }
    }

    // Delete old video if switching to link or uploading new video
    if (tutorial.filePath && (updateDto.type === TutorialType.LINK || videoPath)) {
      await this.uploadService.deleteFile(tutorial.filePath);
    }

    // Delete old thumbnail if uploading new thumbnail
    if (tutorial.thumbnailPath && thumbnailPath) {
      await this.uploadService.deleteFile(tutorial.thumbnailPath);
    }

    // Prepare update data
    const updateData: any = {
      ...(updateDto.tutorialCategoryId && { tutorialCategoryId: updateDto.tutorialCategoryId }),
      ...(updateDto.title && { title: updateDto.title }),
      ...(Object.prototype.hasOwnProperty.call(updateDto, 'description') && {description: updateDto.description}),
      ...(updateDto.type && { type: updateDto.type }),
      ...(updateDto.sourceLink !== undefined && { sourceLink: updateDto.sourceLink }),
      ...(updateDto.isFeatured !== undefined && { isFeatured: updateDto.isFeatured }),
      updatedBy: userId,
    };

    // Handle file path based on type
    if (updateDto.type === TutorialType.FILE) {
      if (videoPath) {
        updateData.filePath = videoPath;
      }
      updateData.sourceLink = null; // Clear sourceLink when type is file
    } else if (updateDto.type === TutorialType.LINK) {
      updateData.filePath = null; // Clear filePath when type is link
    }

    // Handle thumbnail path
    if (thumbnailPath) {
      updateData.thumbnailPath = thumbnailPath;
    }

    // Update tutorial
    const updatedTutorial = await this.prisma.tutorial.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    let updatedDto =  plainToInstance(TutorialResponseDto, updatedTutorial, {
      excludeExtraneousValues: true,
    });

    // relative path to full path
    updatedDto.videoMedia = await this.uploadService.getMediaDetails(updatedTutorial.filePath);
    updatedDto.thumbnailMedia = await this.uploadService.getMediaDetails(updatedTutorial.thumbnailPath);

    return updatedDto;

  }



  async findOne(id: string): Promise<TutorialResponseDto | null> {
    const tutorial = await this.prisma.tutorial.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        category: true,
      },
    });

    if (!tutorial) {
      throw new NotFoundException(`Tutorial not found with the given id ${id}`);
    };

    let tutorialDto =  plainToInstance(TutorialResponseDto, tutorial, {
      excludeExtraneousValues: true,
    });

    // relative path to full path
    tutorialDto.videoMedia = await this.uploadService.getMediaDetails(tutorial.filePath);
    tutorialDto.thumbnailMedia = await this.uploadService.getMediaDetails(tutorial.thumbnailPath);

    return tutorialDto;

  }
 

  async delete(id: string, userId: string): Promise<TutorialResponseDto> {
    // Check if tutorial exists and not already deleted
    const existingTutorial = await this.prisma.tutorial.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!existingTutorial) {
      throw new NotFoundException('Tutorial not found or already deleted');
    }

    // If the tutorial has a file, delete it from the uploads directory
    await this.uploadService.deleteFile(existingTutorial.filePath)
    await this.uploadService.deleteFile(existingTutorial.thumbnailPath)

    // Soft delete (mark as deleted)
    const deletedTutorial = await this.prisma.tutorial.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: userId,
      },
    });

    return plainToInstance(TutorialResponseDto, deletedTutorial, {
      excludeExtraneousValues: true,
    });
  }


  async toggleFeatured(
    id: string,
    userId: string,
  ): Promise<TutorialResponseDto> {
    // Check if tutorial exists
    const tutorial = await this.prisma.tutorial.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!tutorial) {
      throw new NotFoundException(`Tutorial with ID ${id} not found`);
    }

    // Toggle featured status
    const updatedTutorial = await this.prisma.tutorial.update({
      where: { id },
      data: {
        isFeatured: !tutorial.isFeatured,
        updatedBy: userId,
      },
      include: {
        category: true,
      },
    });


    let updatedDto =  plainToInstance(TutorialResponseDto, updatedTutorial, {
      excludeExtraneousValues: true,
    });

    // relative path to full path
    updatedDto.videoMedia = await this.uploadService.getMediaDetails(updatedTutorial.filePath);
    updatedDto.thumbnailMedia = await this.uploadService.getMediaDetails(updatedTutorial.thumbnailPath);

    return updatedDto
  }

}
