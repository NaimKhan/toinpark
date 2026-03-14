import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateReferralMilestoneDto } from './dto/create-referral-milestone.dto';
import { UpdateReferralMilestoneDto } from './dto/update-referral-milestone.dto';
import { ReferralMilestoneResponseDto } from './dto/referral-milestone-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReferralMilestoneService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all referral milestones with filter
   */
  async findAll(
    filters: { search?: string; isActive?: boolean },
    page: number,
    limit: number,
  ): Promise<{ items: ReferralMilestoneResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [
        { referralName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.referralMilestone.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.referralMilestone.count({ where }),
    ]);

    const formattedData = plainToInstance(ReferralMilestoneResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items: formattedData, totalCount };
  }


  /**
   * Create a new referral milestone
   */
  async create(createDto: CreateReferralMilestoneDto, createdBy?: string): Promise<ReferralMilestoneResponseDto> {
    const existing = await this.prisma.referralMilestone.findFirst({
      where: { referralName: createDto.referralName, deletedAt: null },
    });

    if (existing) {
      throw new ConflictException(`Referral milestone '${createDto.referralName}' already exists`);
    }

    const milestone = await this.prisma.referralMilestone.create({
      data: {
        referralName: createDto.referralName,
        description: createDto.description,
        toinAmount: createDto.toinAmount,
        targetPerson: createDto.targetPerson,
        perUserMilestone: createDto.perUserMilestone,
        isActive: createDto.isActive ?? true,
        createdBy,
      },
    });

    return plainToInstance(ReferralMilestoneResponseDto, milestone, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Get a single referral milestone by ID
   */
  async findOne(id: string): Promise<ReferralMilestoneResponseDto> {
    const milestone = await this.prisma.referralMilestone.findFirst({
      where: { id, deletedAt: null },
    });

    if (!milestone) {
      throw new NotFoundException(`Referral milestone with ID ${id} not found`);
    }

    return plainToInstance(ReferralMilestoneResponseDto, milestone, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Update a referral milestone
   */
  async update(id: string, updateDto: UpdateReferralMilestoneDto, updatedBy?: string): Promise<ReferralMilestoneResponseDto> {
    await this.findOne(id);

    if (updateDto.referralName) {
      const existing = await this.prisma.referralMilestone.findFirst({
        where: { referralName: updateDto.referralName, id: { not: id }, deletedAt: null },
      });

      if (existing) {
        throw new ConflictException(`Referral milestone '${updateDto.referralName}' already exists`);
      }
    }

    const updated = await this.prisma.referralMilestone.update({
      where: { id },
      data: {
        ...(updateDto.referralName && { referralName: updateDto.referralName }),
        ...(updateDto.description && { description: updateDto.description }),
        ...(updateDto.toinAmount !== undefined && { toinAmount: updateDto.toinAmount }),
        ...(updateDto.targetPerson !== undefined && { targetPerson: updateDto.targetPerson }),
        ...(updateDto.perUserMilestone !== undefined && { perUserMilestone: updateDto.perUserMilestone }),
        ...(updateDto.isActive !== undefined && { isActive: updateDto.isActive }),
        updatedAt: new Date(),
        updatedBy,
      },
    });

    return plainToInstance(ReferralMilestoneResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Soft delete a referral milestone
   */
  async remove(id: string, deletedBy?: string): Promise<ReferralMilestoneResponseDto> {
    const milestone = await this.findOne(id);

    await this.prisma.referralMilestone.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });

    return milestone;
  }

  
  /**
   * Toggle active status
   */
  async toggleActive(id: string): Promise<ReferralMilestoneResponseDto> {
    const milestone = await this.findOne(id);

    const updated = await this.prisma.referralMilestone.update({
      where: { id },
      data: {
        isActive: !milestone.isActive,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(ReferralMilestoneResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }
}
