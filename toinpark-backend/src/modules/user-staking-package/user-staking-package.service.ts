import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import {
  UserStakingPackageResponseDto,
} from './dto/user-staking-package.dto';
import { TransactionCalculationService } from '../transaction/transaction-calculation.service';

interface UserStakingPackageFilters {
  search?: string;
  userId?: string;
  packageId?: string;
  isActive?: boolean;
  stakedToin?: boolean;
  submitForWithdraw?: boolean;
  withdrawalStatus?: string;
  stakeCreatedBy?: string;
  startDateFrom?: string;
  startDateTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
}

@Injectable()
export class UserStakingPackageService {
  constructor(private readonly prisma: PrismaService, 
              private readonly transactionCalculationService: TransactionCalculationService
  ) {}

  private getBaseInclude(includeDetails = true) {
    return {
      package: true,     
      ...(includeDetails && {
        withdrawalRequests: {
          orderBy: { createdAt: 'desc' as const },
        },
        stakingAdjustments: {
          orderBy: { createdAt: 'desc' as const },
        },
        transactions: {
          orderBy: { createdAt: 'desc' as const },
        },
        user: {
          include : {
            userProfile: true
          } 
        }
      }),
    };
  }

  async findAll(
    filters: UserStakingPackageFilters,
    page: number,
    limit: number,
    sortBy: DefaultSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: UserStakingPackageResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.packageId && { packageId: filters.packageId }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.stakedToin !== undefined && { stakedToin: filters.stakedToin }),
      ...(filters.submitForWithdraw !== undefined && { submitForWithdraw: filters.submitForWithdraw }),
      ...(filters.withdrawalStatus && { withdrawalStatus: filters.withdrawalStatus }),
      ...(filters.stakeCreatedBy && { stakeCreatedBy: filters.stakeCreatedBy }),
      ...(filters.startDateFrom || filters.startDateTo
        ? {
            startDate: {
              ...(filters.startDateFrom && { gte: new Date(filters.startDateFrom) }),
              ...(filters.startDateTo && { lte: new Date(filters.startDateTo) }),
            },
          }
        : {}),
      ...(filters.createdAtFrom || filters.createdAtTo
        ? {
            createdAt: {
              ...(filters.createdAtFrom && { gte: new Date(filters.createdAtFrom) }),
              ...(filters.createdAtTo && { lte: new Date(filters.createdAtTo) }),
            },
          }
        : {}),
      ...(filters.search && {
        OR: [
          {
            user: {
              OR: [
                { email: { contains: filters.search, mode: 'insensitive' } },
                { firstName: { contains: filters.search, mode: 'insensitive' } },
                { lastName: { contains: filters.search, mode: 'insensitive' } },
                { username: { contains: filters.search, mode: 'insensitive' } },
              ],
            },
          },
          {
            package: {
              name: { contains: filters.search, mode: 'insensitive' },
            },
          },
        ],
      }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC };
    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.userStakingPackage.findMany({
        where,
        include: this.getBaseInclude(false),
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.userStakingPackage.count({ where }),
    ]);

    
    // Calculate totals for each staking package
    const itemsWithTotals = items.map((item) => {
      // Calculate totals from transactions
      const totals = this.transactionCalculationService.calculateTotals(
        item.transactions || [],
      );


      return {
        ...item,
        totalToinDebitAmount: totals.totalToinDebit,
        totalToinCreditAmount: totals.totalToinCredit,
        totalUSDTDebitAmount: totals.totalUsdtDebit,
        totalUSDTCreditAmount: totals.totalUsdtCredit,
        toinBalanceAmount: totals.netToinBalance,
        usdtBalanceAmount: totals.netUsdtBalance,
      };
    });


    return {
      items: plainToInstance(UserStakingPackageResponseDto, itemsWithTotals, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }

  

  async findByMember(
    memberId: string,
    filters: UserStakingPackageFilters,
    page: number,
    limit: number,
    sortBy: DefaultSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: UserStakingPackageResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      userId: memberId,
      ...(filters.packageId && { packageId: filters.packageId }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.submitForWithdraw !== undefined && { submitForWithdraw: filters.submitForWithdraw }),
      ...(filters.withdrawalStatus && { withdrawalStatus: filters.withdrawalStatus }),
      ...(filters.search && {
        package: {
          name: { contains: filters.search, mode: 'insensitive' },
        },
      }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC };
    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.userStakingPackage.findMany({
        where,
        include: this.getBaseInclude(true),
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.userStakingPackage.count({ where }),
    ]);


    // Calculate totals for each staking package
    const itemsWithTotals = items.map((item) => {
      // Calculate totals from transactions
      const totals = this.transactionCalculationService.calculateTotals(
        item.transactions || [],
      );

      return {
        ...item,
        totalToinDebitAmount: totals.totalToinDebit,
        totalToinCreditAmount: totals.totalToinCredit,
        totalUSDTDebitAmount: totals.totalUsdtDebit,
        totalUSDTCreditAmount: totals.totalUsdtCredit,
        toinBalanceAmount: totals.netToinBalance,
        usdtBalanceAmount: totals.netUsdtBalance,
      };
    });


    return {
      items: plainToInstance(UserStakingPackageResponseDto, itemsWithTotals, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }



  async findOne(id: string): Promise<UserStakingPackageResponseDto> {
    const staking = await this.prisma.userStakingPackage.findFirst({
      where: {
        id
      },
      include: this.getBaseInclude(true),
    });

    if (!staking) {
      throw new NotFoundException(`Staking package with ID ${id} not found`);
    }

    // Calculate totals from transactions
    const totals = this.transactionCalculationService.calculateTotals(
      staking.transactions || [],
    );

    // Calculate running balances and return in DESC order (newest first)
    const transactions = staking.transactions && staking.transactions.length > 0
      ? this.transactionCalculationService.calculateRunningBalancesDesc(staking.transactions)
      : [];

    const calculatedStaking = {
      ...staking,
      transactions,
      totalToinDebitAmount: totals.totalToinDebit,
      totalToinCreditAmount: totals.totalToinCredit,
      totalUSDTDebitAmount: totals.totalUsdtDebit,
      totalUSDTCreditAmount: totals.totalUsdtCredit,
      toinBalanceAmount: totals.netToinBalance,
      usdtBalanceAmount: totals.netUsdtBalance,
    };


    return plainToInstance(UserStakingPackageResponseDto, calculatedStaking, {
      excludeExtraneousValues: true,
    });

  }



  async findOneForMember(id: string, memberId: string): Promise<UserStakingPackageResponseDto> {
    const staking = await this.prisma.userStakingPackage.findFirst({
      where: {
        id,
      },
      include: this.getBaseInclude(true),
    });

    if (!staking) {
      throw new NotFoundException(`Staking package with ID ${id} not found`);
    }

    if (staking.userId !== memberId) {
      throw new ForbiddenException('You do not have access to this staking package');
    }

    // Calculate totals from transactions
    const totals = this.transactionCalculationService.calculateTotals(
      staking.transactions || [],
    );

    // Calculate running balances and return in DESC order (newest first)
    const transactions = staking.transactions && staking.transactions.length > 0
      ? this.transactionCalculationService.calculateRunningBalancesDesc(staking.transactions)
      : [];

    const calculatedStaking = {
      ...staking,
      transactions,
      totalToinDebitAmount: totals.totalToinDebit,
      totalToinCreditAmount: totals.totalToinCredit,
      totalUSDTDebitAmount: totals.totalUsdtDebit,
      totalUSDTCreditAmount: totals.totalUsdtCredit,
      toinBalanceAmount: totals.netToinBalance,
      usdtBalanceAmount: totals.netUsdtBalance,
    };


    return plainToInstance(UserStakingPackageResponseDto, calculatedStaking, {
      excludeExtraneousValues: true,
    });


  }

}