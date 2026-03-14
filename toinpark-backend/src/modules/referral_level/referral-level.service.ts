import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateReferralLevelDto } from './dto/create-referral-level.dto';
import { ReferralLevelResponseDto} from './dto/referral-level-response.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import { BulkCreateReferralLevelDto, BulkUpdateReferralLevelDto } from './dto/bulk-referral-level.dto';
import { BulkOperationErrorDto, BulkReferralLevelResponseDto } from './dto/bulk-response.dto';
import { LevelSortField } from './dto/level-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { TransactionType } from '@prisma/client';
import { LevelMemberQueryDto } from './dto/level-member-query.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';

@Injectable()
export class ReferralLevelService {
  constructor(private readonly prisma: PrismaService) {}


    /**
   * Get all referral levels with filter
   */
  async findAll(
    filters: { search?: string; isActive?: boolean },
    page: number,
    limit: number,
    sortBy?: LevelSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: ReferralLevelResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [
        { levelName: { contains: filters.search, mode: 'insensitive' } },
      ];

      const searchNumber = Number(filters.search);
      if (!isNaN(searchNumber)) {
        where.OR.push({ levelNumber: { equals: searchNumber } });
      }
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.referralLevel.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      
      this.prisma.referralLevel.count({ where }),
    ]);

    const formattedData = plainToInstance(ReferralLevelResponseDto, data, {excludeExtraneousValues: true});
    

    return { items: formattedData, totalCount };
  }

  /**
   * Get all referral levels for member with transaction counts
   */
  async findAllForMember(
    filters: { search?: string; isActive?: boolean },
    page: number,
    limit: number,
    sortBy: LevelSortField | undefined,
    sortOrder: EnumSortOrder | undefined,
    userId: string,
  ): Promise<{ items: ReferralLevelResponseDto[]; totalCount: number; totalReferralMembers: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      const rawSearch = filters.search.trim();
      const normalizedSearch = rawSearch.replace(/\s+/g, '-');

      where.OR = [
        {
          levelName: {
            contains: rawSearch,
            mode: 'insensitive',
          },
        },
        {
          levelName: {
            contains: normalizedSearch,
            mode: 'insensitive',
          },
        },
      ];

      const searchNumber = Number(rawSearch.replace(/[^0-9]/g, ''));
      if (!isNaN(searchNumber)) {
        where.OR.push({
          levelNumber: {
            equals: searchNumber,
          },
        });
      }
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.referralLevel.findMany({
        where,
        skip,
        take,
        orderBy,
      }),

      this.prisma.referralLevel.count({ where }),
    ]);

    // Get referral hierarchy counts for each level for this user
    const hierarchyCounts = await this.prisma.referralHierarchy.groupBy({
      by: ['level'],
      where: {
        ancestorId: userId,
      },
      _count: {
        _all: true,
      },
    });

    const countMap = new Map(
      hierarchyCounts.map((hc) => [hc.level, hc._count._all]),
    );

    // Sum up all counts to get total referral members
    const totalReferralMembers = hierarchyCounts.reduce((sum, hc) => sum + hc._count._all, 0);

    const formattedData = data.map((level) => {
      const dto = plainToInstance(ReferralLevelResponseDto, level, {
        excludeExtraneousValues: true,
      });
      dto.totalData = countMap.get(level.levelNumber) || 0;
      return dto;
    });

    return { items: formattedData, totalCount, totalReferralMembers };
  }

  /**
   * Create a new referral level
   */
  async create( 
    createDto: CreateReferralLevelDto, createdBy: string
  ): Promise<ReferralLevelResponseDto> {
    
    const levelName = 'Level-' + createDto.levelNumber.toString();
    // Check if level name already exists
    const existing = await this.prisma.referralLevel.findUnique({
      where: { levelName:  levelName},
    });

    if (existing) {
      throw new ValidationException({
        "levelNumber" : [`Referral level with name '${createDto.levelNumber}' already exists`]
      })
    }

    const referralLevel = await this.prisma.referralLevel.create({
      data: {
        levelName: levelName,
        referralBonusPercentage: createDto.referralBonusPercentage,
        levelNumber: createDto.levelNumber,
        isActive: true,
        createdBy: createdBy
      },
    });

    return plainToInstance(ReferralLevelResponseDto, referralLevel);
   
  }



  /**
   * Get a single referral level by ID
   */
  async findOne(id: string): Promise<ReferralLevelResponseDto> {
    const referralLevel = await this.prisma.referralLevel.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!referralLevel) {
      throw new NotFoundException(`Referral level with ID ${id} not found`);
    }

    return plainToInstance(ReferralLevelResponseDto, referralLevel);
  }

  /**
   * Update a referral level
   */
  async update(
    id: string,
    updateDto: CreateReferralLevelDto,
    updatedBy: string
  ): Promise<ReferralLevelResponseDto> {
    // Check if exists
    await this.findOne(id);

     const levelName = 'Level-' + updateDto.levelNumber.toString();

    // Check for duplicate name if updating levelName
    if (updateDto.levelNumber) {

      const existing = await this.prisma.referralLevel.findFirst({
        where: {
          levelName: levelName,
          levelNumber: updateDto.levelNumber,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (existing) {
        throw new ValidationException({
          "levelName" : [`Referral level with name '${updateDto.levelNumber}' already exists`]
        })
      }
    }

    const updated = await this.prisma.referralLevel.update({
      where: { id: id },
      data: {
        ...(levelName && { levelName: levelName }),
        ...(updateDto.referralBonusPercentage !== undefined && {
        referralBonusPercentage: updateDto.referralBonusPercentage,
        }),
        ...(updateDto.levelNumber !== undefined && { levelNumber: updateDto.levelNumber }),
        updatedAt: new Date(),
        updatedBy: updatedBy,
      },
    });

    return plainToInstance(ReferralLevelResponseDto, updated);
   
  }

  /**
   * Hard delete a referral level if no related data exists
   */
  async remove(id: string, deletedBy?: string): Promise<ReferralLevelResponseDto> {
    // Check if exists
    const referralLevel = await this.findOne(id);

    // 1. Check for related Transactions (by levelName)
    // We check for ANY transaction (even soft deleted ones) to maintain data integrity
    const hasTransactions = await this.prisma.transaction.findFirst({
      where: {
        levelId: referralLevel.id,
      },
      select: { id: true } 
    });

    if (hasTransactions) {
      throw new BadRequestException(`Cannot delete referral level. Related transaction data exists.`);
    }

    // 2. Check for related Commission History
    const hasCommissions = await this.prisma.referralRewardCommissionHistory.findFirst({
      where: {
        referralLevelId: id,
      },
      select: { id: true }
    });

    if (hasCommissions) {
      throw new BadRequestException(`Cannot delete referral level. Related commission history exists.`);
    }

    // 3. Perform Hard Delete if no dependencies found
    const deletedLevel = await this.prisma.referralLevel.delete({
      where: { id: id },
    });

    return plainToInstance(ReferralLevelResponseDto, deletedLevel);
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string): Promise<ReferralLevelResponseDto> {
    const referralLevel = await this.findOne(id);

    const updated = await this.prisma.referralLevel.update({
      where: { id: id },
      data: {
        isActive: !referralLevel.isActive,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(ReferralLevelResponseDto, updated);
  }


  /**
   * Bulk create referral levels
   */
  // async bulkCreate(
  //   bulkCreateDto: BulkCreateReferralLevelDto,
  //   createdBy: string,
  // ): Promise<BulkReferralLevelResponseDto> {
  //   const success: ReferralLevelResponseDto[] = [];
  //   const failed: BulkOperationErrorDto[] = [];

  //   // Check for duplicate level numbers within the request
  //   const levelNumbers = bulkCreateDto.levels.map((l) => l.levelNumber);
  //   const duplicates = levelNumbers.filter(
  //     (item, index) => levelNumbers.indexOf(item) !== index,
  //   );

  //   if (duplicates.length > 0) {
  //     throw new BadRequestException(
  //       `Duplicate level numbers found in request: ${duplicates.join(', ')}`,
  //     );
  //   }

  //   // Process each level
  //   for (let i = 0; i < bulkCreateDto.levels.length; i++) {
  //     const levelDto = bulkCreateDto.levels[i];

  //     try {
  //       // Check if level number already exists in database
  //       const existingLevel = await this.prisma.referralLevel.findFirst({
  //         where: {
  //           levelNumber: levelDto.levelNumber,
  //           deletedAt: null,
  //         },
  //       });

  //       if (existingLevel) {
  //         failed.push({
  //           index: i,
  //           message: `Level number ${levelDto.levelNumber} already exists`,
  //           errors: {
  //             levelNumber: [`Level number ${levelDto.levelNumber} already exists`],
  //           },
  //         });
  //         continue;
  //       }

  //       // Create the referral level
  //       const referralLevel = await this.prisma.referralLevel.create({
  //         data: {
  //           levelName: levelDto.levelName,
  //           levelNumber: levelDto.levelNumber,
  //           referralBonusPercentage: levelDto.referralBonusPercentage,
  //           isActive: true,
  //           createdBy: createdBy,
  //         },
  //       });

  //       success.push(
  //         plainToInstance(ReferralLevelResponseDto, referralLevel, {
  //           excludeExtraneousValues: true,
  //         }),
  //       );
  //     } catch (error) {
  //       failed.push({
  //         index: i,
  //         message: error.message || 'Failed to create referral level',
  //         errors: {
  //           general: [error.message || 'Failed to create referral level'],
  //         },
  //       });
  //     }
  //   }

  //   return {
  //     success,
  //     failed,
  //     totalProcessed: bulkCreateDto.levels.length,
  //     successCount: success.length,
  //     failedCount: failed.length,
  //   };
  // }


  /**
   * Bulk update referral levels
   */
  async bulkUpdate(
    bulkUpdateDto: BulkUpdateReferralLevelDto,
    updatedBy: string,
  ): Promise<BulkReferralLevelResponseDto> {
    const success: ReferralLevelResponseDto[] = [];
    const failed: BulkOperationErrorDto[] = [];

    // Check for duplicate IDs within the request
    const ids = bulkUpdateDto.levels.map((l) => l.id);
    const duplicateIds = ids.filter((item, index) => ids.indexOf(item) !== index);

    if (duplicateIds.length > 0) {
      throw new BadRequestException(
        `Duplicate IDs found in request: ${duplicateIds.join(', ')}`,
      );
    }

    // Check for duplicate level numbers within the request
    const levelNumbers = bulkUpdateDto.levels.map((l) => l.levelNumber);
    const duplicateLevels = levelNumbers.filter(
      (item, index) => levelNumbers.indexOf(item) !== index,
    );

    if (duplicateLevels.length > 0) {
      throw new BadRequestException(
        `Duplicate level numbers found in request: ${duplicateLevels.join(', ')}`,
      );
    }

    // Process each level
    for (let i = 0; i < bulkUpdateDto.levels.length; i++) {
      const levelDto = bulkUpdateDto.levels[i];

      try {
        // Check if referral level exists
        const existingLevel = await this.prisma.referralLevel.findFirst({
          where: {
            id: levelDto.id,
            deletedAt: null,
          },
        });

        if (!existingLevel) {
          failed.push({
            index: i,
            message: `Referral level with ID ${levelDto.id} not found`,
            errors: {
              id: [`Referral level with ID ${levelDto.id} not found`],
            },
          });
          continue;
        }

        // Check if level number conflicts with another level
        if (levelDto.levelNumber !== existingLevel.levelNumber) {
          const conflictingLevel = await this.prisma.referralLevel.findFirst({
            where: {
              levelNumber: levelDto.levelNumber,
              id: { not: levelDto.id },
              deletedAt: null,
            },
          });

          if (conflictingLevel) {
            failed.push({
              index: i,
              message: `Level number ${levelDto.levelNumber} is already used by another level`,
              errors: {
                levelNumber: [
                  `Level number ${levelDto.levelNumber} is already used by another level`,
                ],
              },
            });
            continue;
          }
        }

        // Update the referral level
        const updated = await this.prisma.referralLevel.update({
          where: { id: levelDto.id },
          data: {
            levelNumber: levelDto.levelNumber,
            referralBonusPercentage: levelDto.referralBonusPercentage,
            updatedAt: new Date(),
            updatedBy: updatedBy,
          },
        });

        success.push(
          plainToInstance(ReferralLevelResponseDto, updated, {
            excludeExtraneousValues: true,
          }),
        );
      } catch (error) {
        failed.push({
          index: i,
          message: error.message || 'Failed to update referral level',
          errors: {
            general: [error.message || 'Failed to update referral level'],
          },
        });
      }
    }

    return {
      success,
      failed,
      totalProcessed: bulkUpdateDto.levels.length,
      successCount: success.length,
      failedCount: failed.length,
    };
  }

  /**
   * Get referral members for a specific user and level with pagination
   */
  async findLevelMembers(
    userId: string,
    levelId: string,
    queryDto: LevelMemberQueryDto,
  ): Promise<{ items: UserResponseDto[]; totalCount: number }> {
    const { page, limit, sortBy, sortOrder } = queryDto;
    const skip = (page - 1) * limit;
    const take = limit;

    // Find the referral level definition to get the level number
    const levelDefinition = await this.prisma.referralLevel.findUnique({
      where: { id: levelId, deletedAt: null },
    });

    if (!levelDefinition) {
      throw new NotFoundException('Referral level not found');
    }

    const where = {
      ancestorId: userId,
      level: levelDefinition.levelNumber,
    };

    const [hierarchyEntries, totalCount] = await Promise.all([
      this.prisma.referralHierarchy.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy as any]: sortOrder },
        include: {
          user: {
            include: {
              userProfile: {
                include: {
                  country: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.referralHierarchy.count({ where }),
    ]);

    const items = hierarchyEntries.map((entry) => {
      return plainToInstance(UserResponseDto, entry.user, {
        excludeExtraneousValues: true,
      });
    });

    return { items, totalCount };
  }

}