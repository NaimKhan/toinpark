import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core';
import { StakingAdjustmentDeductDto, StakingAdjustmentResponseDto, UserStakingPackageListItemDto, StakingAdjustmentQueryDto, StakingAdjustmentListItemDto } from './dto/staking-adjustment.dto';
import { UserStakingPackageQueryDto } from './dto/user-staking-package-query.dto';
import { UserStatus, StakingAdjustmentType, TransactionType, WithdrawalStatus } from '@prisma/client';
import { toDecimal } from 'src/common/utils/decimal.utils';
import { plainToInstance } from 'class-transformer';
import { StakingAdjustmentSortField } from './dto/staking-adjustment-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { TransactionService } from '../transaction/transaction.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class StakingAdjustmentService {
  private readonly logger = new Logger(StakingAdjustmentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly trxService: TransactionService,
  ) {}

  async getUserStakingPackages(userId: string, queryDto: UserStakingPackageQueryDto): Promise<UserStakingPackageListItemDto[]> {
    const user = await this.prisma.user.findUnique({
    where: { id: userId, status: UserStatus.ACTIVE, deletedAt: null },
    });

    if (!user) throw new NotFoundException('User not found or inactive');

    const { sortBy, sortOrder } = queryDto;

    const packages = await this.prisma.userStakingPackage.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        package: {
          select: {
            id: true,
            name: true,
          },
        },
        transactions: {
          where: {
            trxType: TransactionType.STAKE,
          },
          take: 1,
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return packages.map((pkg) => {
      const transaction = pkg.transactions?.[0];
      
      const plainPkg = {
        ...pkg,
        package: pkg.package || null,
        stakingTransaction: transaction || null,
      };

      return plainToInstance(UserStakingPackageListItemDto, plainPkg, { excludeExtraneousValues: true });
    });
  }

  async findAll(
    filters: { search?: string },
    page: number,
    limit: number,
    sortBy: StakingAdjustmentSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: StakingAdjustmentListItemDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = {
      type: StakingAdjustmentType.DEDUCT,
    };

    if (filters.search) {
      where.user = {
        toinAccountNumber: { contains: filters.search, mode: 'insensitive' },
      };
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.stakingAdjustment.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          user: {
            include: { userProfile: true },
          },
          creator: {
            include: { userProfile: true },
          },
          transaction: true,
        },
      }),
      this.prisma.stakingAdjustment.count({ where }),
    ]);

    const formattedData = data.map((item) => {
      return plainToInstance(StakingAdjustmentListItemDto, {
        ...item,
      }, { excludeExtraneousValues: true });
    });

    return { items: formattedData, totalCount };
  }

  async deduct(dto: StakingAdjustmentDeductDto, adminId: string): Promise<StakingAdjustmentResponseDto> {
    const { userId, userStakingPackageId, toinAmount, remark } = dto;

    const user = await this.validateUser(userId);
    const stakingPackage = await this.validateStakingPackage(userId,userStakingPackageId);

    const requestedToin = toDecimal(toinAmount);
    const conversionRate = toDecimal(stakingPackage.usdConversionRate);
    const availableToin = await this.calculateAvailableToin(stakingPackage,conversionRate);
    this.ensureSufficientBalance(requestedToin, availableToin);
    const usdtAmount = requestedToin.mul(conversionRate);

    const adjustment = await this.createDeductAdjustment({userId, stakingPackage, requestedToin, usdtAmount, conversionRate, remark, adminId});
    await this.trxService.subtractBalance(userId, TransactionType.STAKING_ADJUSTMENT, requestedToin);
    
    return plainToInstance(StakingAdjustmentResponseDto, adjustment);
  }

  private async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId, status: UserStatus.ACTIVE, deletedAt: null }});
    if (!user) { throw new NotFoundException('Given userId not found or inactive') }

    return user;
  }

  private async validateStakingPackage( userId: string, userStakingPackageId: string) {
    const stakingPackage = await this.prisma.userStakingPackage.findFirst({
      where: {id: userStakingPackageId, userId, isActive: true},
    });

    if (!stakingPackage) {throw new NotFoundException('Staking package not found for the given user staking package ID')}
    return stakingPackage;
  }

  private async calculateAvailableToin(stakingPackage: any, conversionRate: Decimal): Promise<Decimal> {
    const totalAdjustDeductTOIN = await this.getTotalAdjustDeductTOIN(stakingPackage.id);
    const totalWithdrawalToin = await this.getTotalWithdrawalToin(stakingPackage.id, conversionRate);
    const totalStaked = toDecimal(stakingPackage.toinAmount);

    return totalStaked.minus(totalAdjustDeductTOIN).minus(totalWithdrawalToin);
  }

  private async getTotalAdjustDeductTOIN(userStakingPackageId: string) {
    const result = await this.prisma.stakingAdjustment.aggregate({
      where: {
        userStakingPackageId,
        type: StakingAdjustmentType.DEDUCT,
      },
      _sum: {
        toinAmount: true,
      },
    });

    return toDecimal(result._sum.toinAmount ?? 0);
  }

  private async getTotalWithdrawalToin(userStakingPackageId: string, conversionRate: Decimal) {
    const withdrawals = await this.prisma.withdrawalRequest.findMany({
      where: {
        userStakingPackageId,
        status: { in: [WithdrawalStatus.PENDING, WithdrawalStatus.APPROVED] },
      },
    });

    return withdrawals.reduce((total, w) => {
      const usdt = toDecimal(w.amount).plus(toDecimal(w.platformFee));
      const toin = usdt.div(conversionRate);
      return total.plus(toin);
    }, toDecimal(0));
  }

  private ensureSufficientBalance(requested: Decimal, available: Decimal) {
    if (requested.greaterThan(available)) {
      throw new BadRequestException('Insufficient TOIN');
    }
  }

  private async createDeductAdjustment(params: {
    userId: string;
    stakingPackage: any;
    requestedToin: Decimal;
    usdtAmount: Decimal;
    conversionRate: Decimal;
    remark: string;
    adminId: string;
  }) {
    const {
      userId,
      stakingPackage,
      requestedToin,
      usdtAmount,
      conversionRate,
      remark,
      adminId,
    } = params;

    return this.prisma.$transaction(async (tx) => {

      const stakingAdjustment = await tx.stakingAdjustment.create({
        data: {
          userId,
          userStakingPackageId: stakingPackage.id,
          toinAmount: requestedToin,
          usdtAmount,
          usdtConversionRate: conversionRate,
          type: StakingAdjustmentType.DEDUCT,
          remark,
          createdBy: adminId,
        },
      });

      await this.trxService.createStakingAdjustmentTransaction(
        {
          userId,
          adminId,
          stakingAdjustmentId: stakingAdjustment.id,
          userStakingPackageId: stakingPackage.id,
          toinAmount: requestedToin,
          usdtAmount,
          usdtConversionRate: conversionRate,
          type: StakingAdjustmentType.DEDUCT,
          remark,
        },
        tx,
      );

      return stakingAdjustment;
    });
  }
}
