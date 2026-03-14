import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core';
import {
  AdminStakingDto,
  AdminUserStakingPackageResponseDto,
  AdminStakingFilterDto,
} from './dto/admin-staking.dto';
import { TransactionType, UserStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { addDays } from 'src/common/utils';
import { TransactionService } from '../transaction/transaction.service';
import { toDecimal } from 'src/common/utils/decimal.utils';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';
import { plainToInstance } from 'class-transformer';
import { UserStakingPackageResponseDto } from '../user-staking-package/dto/user-staking-package.dto';

@Injectable()
export class AdminStakingService {
  private readonly logger = new Logger(AdminStakingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly trxService: TransactionService,
  ) {}

  async stakeOnBehalfOfUser(
    adminStakingDto: AdminStakingDto,
    adminId: string,
  ): Promise<AdminUserStakingPackageResponseDto> {
    const { userId, toinAmount, usdtAmount, remark } = adminStakingDto;

    // Validate User
    const user = await this.prisma.user.findUnique({
      where: { id: userId, status: UserStatus.ACTIVE, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('Target user not found or inactive');
    }

    // Get conversion rate from system settings
    const setting = await this.prisma.systemSetting.findFirst({
      where: { key: EnumSystemSetting.TOIN_CONVENTION_RATE },
    });

    if (!setting) {
      throw new BadRequestException('Conversion rate not configured');
    }

    const systemConversionRate = new Decimal(setting.value.toString());

    // Validation: TOIN and USDT amounts must match the conversion rate
    const expectedUsdt = new Decimal(toinAmount).mul(systemConversionRate);
    const actualUsdt = new Decimal(usdtAmount);

    // Allow for minor floating point differences (e.g., 2 decimal places)
    if (expectedUsdt.toDecimalPlaces(2).toNumber() !== actualUsdt.toDecimalPlaces(2).toNumber()) {
      throw new BadRequestException(
        `The provided USDT amount (${usdtAmount}) does not match the expected amount (${expectedUsdt.toFixed(2)}) based on the system conversion rate (${systemConversionRate.toString()})`,
      );
    }

    // Map given TOIN amount to an active staking plan within valid range
    const amount = toDecimal(toinAmount);
    const selectedPackage = await this.prisma.stakingPackagePlan.findFirst({
      where: {
        isActive: true,
        minToinAmount: { lte: amount },
        maxToinAmount: { gte: amount },
        deletedAt: null,
      },
    });

    if (!selectedPackage) {
      throw new BadRequestException('No matching staking plan found for the given TOIN amount');
    }

    // Complete the staking flow within a transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create UserStakingPackage
      const userStakingRecord = await tx.userStakingPackage.create({
        data: {
          userId,
          packageId: selectedPackage.id,
          toinAmount: amount,
          usdtAmount: expectedUsdt,
          bonusAmount: selectedPackage.bonusAmount,
          dailyProfitPercent: selectedPackage.dailyProfitPercent,
          startDate: new Date(),
          recurringProfitDays: selectedPackage.recurringProfitDays,
          initialEndDate: addDays(new Date(),selectedPackage.minimumDurationInDays),
          previousRewardDate: addDays(new Date(),selectedPackage.minimumDurationInDays),
          nextRewardDate: addDays(new Date(),selectedPackage.minimumDurationInDays),
          stakedToin: true,
          isBonusDone: false,
          isLevelingBonusDone: false,
          minimumDurationInDays: selectedPackage.minimumDurationInDays,
          isActive: true,
          usdConversionRate: systemConversionRate,
          stakeCreatedBy: 'ADMIN',
          createdAt: new Date(),
          createdBy: adminId,
          remarks: remark ?? null
        },
      });

      // Create Transaction
      await this.trxService.createAdminStakingTransaction({
        userId,
        adminId,
        userStakingPackageId: userStakingRecord.id,
        toinAmount: amount,
        usdtAmount: actualUsdt,
        usdtConversionRate: systemConversionRate,
        remark,
      }, tx);

      return {
        ...userStakingRecord,
        packageName: selectedPackage.name,
      };
    });

    // Update wallet balance
    await this.trxService.addBalance(userId, TransactionType.STAKE, amount);

    return plainToInstance(AdminUserStakingPackageResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: AdminStakingFilterDto,
  ): Promise<{ items: UserStakingPackageResponseDto[]; totalCount: number }> {
    const { page = 1, limit = 10, search } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      stakeCreatedBy: 'ADMIN',
    };

    if (search) {
      where.OR = [
        {
          user: {
            toinAccountNumber: { contains: search, mode: 'insensitive' },
          },
        },
        {
          creator: {
            toinAccountNumber: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.userStakingPackage.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {include: { userProfile: true },},
          creator: {include: { userProfile: true },},
          package: true,
          transactions: true,
        },
      }),
      this.prisma.userStakingPackage.count({ where }),
    ]);

    const filteredItems = items.map(item => ({
      ...item,
      transactions: item.transactions?.filter(
        trx => trx.trxType === 'STAKE'
      ) ?? [],
    }))

    return {
      items: plainToInstance(UserStakingPackageResponseDto, filteredItems, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }
}
