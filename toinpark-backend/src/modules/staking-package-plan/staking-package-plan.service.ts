import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateStakingPackagePlanDto } from './dto/create-staking-package-plan.dto';
import { StakingPackageResponseDto } from './dto/staking-package-plan-response.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';

@Injectable()
export class StakingPackagePlanService {
  constructor(private readonly prisma: PrismaService) { }

  async create(
    dto: CreateStakingPackagePlanDto,
    createdBy: string,
  ): Promise<StakingPackageResponseDto> {
    // Check if plan name already exists
    const existingPlan = await this.prisma.stakingPackagePlan.findFirst({
      where: {
        name: dto.name,
        deletedAt: null,
      },
    });

    if (existingPlan) {
      throw new ValidationException({
        name: ['A staking package plan with this name already exists'],
      });
    }

    // Validate min/max amounts
    if (Number(dto.minToinAmount) >= Number(dto.maxToinAmount)) {
      throw new ValidationException({
        minToinAmount: ['Minimum TOIN amount must be less than maximum TOIN amount'],
      });
    }

    // Check for overlap
    await this.checkOverlap(Number(dto.minToinAmount), Number(dto.maxToinAmount));

    const plan = await this.prisma.stakingPackagePlan.create({
      data: {
        name: dto.name,
        description: dto.description,
        dailyProfitPercent: dto.dailyProfitPercent,
        bonusAmount: dto.bonusAmount || 0,
        maxToinAmount: dto.maxToinAmount,
        minToinAmount: dto.minToinAmount,
        minimumDurationInDays: dto.minimumDurationInDays,
        recurringProfitDays: dto.recurringProfitDays,
        totalToinPurchasedWithUSD: dto.totalToinPurchasedWithUSD || 0,
        isActive: true,
        createdBy: createdBy,
      },
    });

    return plainToInstance(StakingPackageResponseDto, plan, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: any,
    page: number,
    limit: number,
    sortBy: DefaultSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: StakingPackageResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const where: any = {
      deletedAt: null,
      ...(filters.search && {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.stakingPackagePlan.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.stakingPackagePlan.count({ where }),
    ]);

    // Calculate total staked TOIN for each plan
    const planIds = items.map((plan) => plan.id);
    const totalStakes = await this.prisma.userStakingPackage.groupBy({
      by: ['packageId'],
      _sum: {
        toinAmount: true,
      },
      where: {
        packageId: { in: planIds },
      },
    });

    // Map totals to plans
    const itemsWithTotals = items.map((plan) => {
      const stakeInfo = totalStakes.find((s) => s.packageId === plan.id);
      return {
        ...plan,
        totalToinStaked: stakeInfo?._sum?.toinAmount || 0,
      };
    });

    return {
      items: plainToInstance(StakingPackageResponseDto, itemsWithTotals, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }

  async findOne(id: string): Promise<StakingPackageResponseDto> {
    const plan = await this.prisma.stakingPackagePlan.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!plan) {
      throw new NotFoundException(`Staking package plan with ID ${id} not found`);
    }

    // Calculate total staked for this plan
    const totalStake = await this.prisma.userStakingPackage.aggregate({
      _sum: {
        toinAmount: true,
      },
      where: {
        packageId: id
      },
    });

    const planWithTotal = {
      ...plan,
      totalToinStaked: totalStake._sum.toinAmount || 0,
    };

    return plainToInstance(StakingPackageResponseDto, planWithTotal, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    dto: CreateStakingPackagePlanDto,
    updatedBy: string,
  ): Promise<StakingPackageResponseDto> {
    // Check if plan exists
    await this.findOne(id);

    // Check if name is being changed and if it conflicts
    if (dto.name) {
      const existingPlan = await this.prisma.stakingPackagePlan.findFirst({
        where: {
          name: dto.name,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (existingPlan) {
        throw new ValidationException({
          name: ['A staking package plan with this name already exists'],
        });
      }
    }

    // Validate min/max amounts if being updated
    if (dto.minToinAmount !== undefined || dto.maxToinAmount !== undefined) {
      const currentPlan = await this.prisma.stakingPackagePlan.findUnique({
        where: { id },
      });

      const minAmount = Number(dto.minToinAmount !== undefined ? dto.minToinAmount : currentPlan.minToinAmount);
      const maxAmount = Number(dto.maxToinAmount !== undefined ? dto.maxToinAmount : currentPlan.maxToinAmount);

      if (minAmount >= maxAmount) {
        throw new ValidationException({
          minToinAmount: ['Minimum TOIN amount must be less than maximum TOIN amount'],
        });
      }

      // Check for overlap, excluding current plan
      await this.checkOverlap(minAmount, maxAmount, id);
    }

    const plan = await this.prisma.stakingPackagePlan.update({
      where: { id: id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.dailyProfitPercent !== undefined && { dailyProfitPercent: dto.dailyProfitPercent }),
        ...(dto.bonusAmount !== undefined && { bonusAmount: dto.bonusAmount }),
        ...(dto.maxToinAmount !== undefined && { maxToinAmount: dto.maxToinAmount }),
        ...(dto.minToinAmount !== undefined && { minToinAmount: dto.minToinAmount }),
        ...(dto.minimumDurationInDays !== undefined && { minimumDurationInDays: dto.minimumDurationInDays }),
        ...(dto.recurringProfitDays !== undefined && { recurringProfitDays: dto.recurringProfitDays }),
        ...(dto.totalToinPurchasedWithUSD !== undefined && { totalToinPurchasedWithUSD: dto.totalToinPurchasedWithUSD }),
        updatedBy: updatedBy,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(StakingPackageResponseDto, plan, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string, deletedBy: string): Promise<StakingPackageResponseDto> {
    // Check if plan exists
    await this.findOne(id);

    // Check if plan is being used by any user stakes
    const stakesCount = await this.prisma.userStakingPackage.count({
      where: {
        packageId: id,
      },
    });

    if (stakesCount > 0) {
      throw new BadRequestException(
        `Cannot delete this plan as it is currently being used by ${stakesCount} user stake(s)`,
      );
    }

    const plan = await this.prisma.stakingPackagePlan.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
    });

    return plainToInstance(StakingPackageResponseDto, plan, {
      excludeExtraneousValues: true,
    });
  }

  async toggleActive(id: string): Promise<StakingPackageResponseDto> {
    const plan = await this.findOne(id);
    const updatedPlan = await this.prisma.stakingPackagePlan.update({
      where: { id: id },
      data: { isActive: !plan.isActive },
    });

    return plainToInstance(StakingPackageResponseDto, updatedPlan, {
      excludeExtraneousValues: true,
    });
  }

  //   async getActivePlans(): Promise<StakingPackagePlanResponseDto[]> {
  //     const plans = await this.prisma.stakingPackagePlan.findMany({
  //       where: {
  //         isActive: true,
  //         deletedAt: null,
  //       },
  //       orderBy: { minToinAmount: 'asc' },
  //     });

  //     return plainToInstance(StakingPackagePlanResponseDto, plans, {
  //       excludeExtraneousValues: true,
  //     });
  //   }

  private async checkOverlap(minAmount: number, maxAmount: number, excludeId?: string): Promise<void> {
    const where: any = { deletedAt: null };

    if (excludeId) {
      where.id = { not: excludeId };
    }

    const existingPlans = await this.prisma.stakingPackagePlan.findMany({
      where,
      select: {
        id: true,
        name: true,
        minToinAmount: true,
        maxToinAmount: true,
      },
    });

    for (const plan of existingPlans) {
      const planMin = Number(plan.minToinAmount);
      const planMax = Number(plan.maxToinAmount);
      
      const overlapStart = Math.max(minAmount, planMin);
      const overlapEnd = Math.min(maxAmount, planMax);

      if (overlapStart <= overlapEnd) {
         throw new ValidationException({
          minToinAmount: [`TOIN range ${minAmount}-${maxAmount} overlaps with existing package '${plan.name}' (${planMin}-${planMax})`],
        });
      }
    }
  }
}