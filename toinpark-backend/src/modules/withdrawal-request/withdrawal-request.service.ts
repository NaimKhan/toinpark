import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { UpdateWithdrawalRequestDto } from './dto/update-withdrawal-request.dto';
import { UpdateWithdrawalStatusDto } from './dto/update-withdrawal-status.dto';
import { WithdrawalRequestResponseDto } from './dto/withdrawal-request-response.dto';
import { plainToInstance } from 'class-transformer';
import { TransactionType, WithdrawalRequest, WithdrawalStatus } from '@prisma/client';
import { WithdrawalRequestSortField } from './dto/withdrawal-request-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { NowPaymentService } from '../payment/now-payment.service';
import { ConfigService } from '@nestjs/config';
import { SystemSettingsService } from '../general_settings/system-settings.service';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';
import { ValidationException } from 'src/common/exceptions';
import { TransactionService } from '../transaction/transaction.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WithdrawalRequestService {

  private readonly logger = new Logger(WithdrawalRequestService.name);
  private readonly ipnCallbackUrl: string;

  constructor(
              private readonly prisma: PrismaService,
              private readonly nowPaymentService: NowPaymentService,
              private readonly configService: ConfigService,
              private readonly transactionService: TransactionService,
              private readonly systemSettingsService: SystemSettingsService
            ) {
              this.ipnCallbackUrl = this.configService.get<string>('NOWPAYMENTS_PAYOUT_IPN_URL') || 'https://api.nowpayments.io/v1/payouts/ipn';
            }

  async create(
    dto: CreateWithdrawalRequestDto,
    createdBy: string,
  ): Promise<WithdrawalRequestResponseDto> {

    await this.validateMinimumAmount(dto.amount);

    // Verify user staking package exists
    const stakingPackage = await this.prisma.userStakingPackage.findUnique({
      where: { id: dto.userStakingPackageId },
    });

    if (!stakingPackage) {
      throw new NotFoundException('Staking package not found');
    }

    const platformFeeRate = (await this.systemSettingsService.getSetting(EnumSystemSetting.PLATFORM_WITHDRAWAL_FEE_PERCENTAGE)).value;

    const platformFee = (dto.amount * parseFloat(platformFeeRate)) / 100;

    const withdrawalRequest = await this.prisma.withdrawalRequest.create({
      data: {
        ...dto,
        platformFee: platformFee,
        status: WithdrawalStatus.PENDING,
        createdBy: createdBy,
      },
    });

    return plainToInstance(WithdrawalRequestResponseDto, withdrawalRequest, {
      excludeExtraneousValues: true,
    });
  }

  private async validateMinimumAmount(amount: number): Promise<void> {
    const setting = await this.systemSettingsService.getSetting(
      EnumSystemSetting.MIN_USDT_WITHDRAWAL_AMOUNT,
    );
    const minAmount = parseFloat(setting.value);

    if (amount < minAmount) {
      throw new ValidationException({ amount: `Minimum withdrawal amount is ${minAmount} USDT` });
    }
  }


  async findAll(
    filters: any,
    page = 1,
    limit = 10,
    sortBy: WithdrawalRequestSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: WithdrawalRequestResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      ...(filters.search && {
        address: { contains: filters.search, mode: 'insensitive' },
      }),
      ...(filters.status && { status: filters.status }),
      ...(filters.userStakingPackageId && {
        userStakingPackageId: filters.userStakingPackageId,
      }),
      ...(filters.currency && { currency: filters.currency }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.withdrawalRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          creator: {
            include: {
              userProfile: {
                include : { country : true }
              }
            },
          },
          userStakingPackage: {
            include: {
              package: true,
            },
          },
        },
      }),
      this.prisma.withdrawalRequest.count({ where }),
    ]);

    return {
      items: plainToInstance(WithdrawalRequestResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }

  async findMyWithdrawals(
      userId: string,
      filters: any,
      page = 1,
      limit = 10,
      sortBy: WithdrawalRequestSortField,
      sortOrder: EnumSortOrder,
  ): Promise<{ items: WithdrawalRequestResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      createdBy: userId,
      ...(filters.search && {
        address: { contains: filters.search, mode: 'insensitive' },
      }),
      ...(filters.status && { status: filters.status }),
      ...(filters.currency && { currency: filters.currency }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.withdrawalRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          creator: {
            include: {
              userProfile: {
                include : { country : true }
              }
            },
          },
          userStakingPackage: {
            include: {
              package: true,
            },
          },
        },
      }),
      this.prisma.withdrawalRequest.count({ where }),
    ]);

    return {
      items: plainToInstance(WithdrawalRequestResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }


  async findOne(id: string): Promise<WithdrawalRequestResponseDto> {
    const withdrawalRequest = await this.prisma.withdrawalRequest.findUnique({
      where: { id: id },
    });

    if (!withdrawalRequest || withdrawalRequest.deletedAt) {
      throw new NotFoundException('Withdrawal request not found');
    }

    return plainToInstance(WithdrawalRequestResponseDto, withdrawalRequest, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    dto: UpdateWithdrawalRequestDto,
  ): Promise<WithdrawalRequestResponseDto> {
    const existing = await this.findOne(id);

    const withdrawalRequest = await this.prisma.withdrawalRequest.update({
      where: { id: id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(WithdrawalRequestResponseDto, withdrawalRequest, {
      excludeExtraneousValues: true,
    });
  }

  async updateStatus(
    id: string,
    dto: UpdateWithdrawalStatusDto,
    updatedBy: string,
  ): Promise<WithdrawalRequestResponseDto> {
    const existing = await this.findOne(id);

    // Validate status transition
    if (existing.status === WithdrawalStatus.APPROVED) {
      throw new BadRequestException(
        'Cannot update already approved withdrawal',
      );
    }

    if (existing.status === WithdrawalStatus.REJECTED) {
      throw new BadRequestException(
        'Cannot update already rejected withdrawal',
      );
    }

    const withdrawalRequest = await this.prisma.withdrawalRequest.update({
      where: { id: id },
      data: {
        status: dto.status,
        remark: dto.remark,
        updatedAt: new Date(),
      },
    });

    // Process payout if approved
    if (dto.status === WithdrawalStatus.APPROVED) {
      await this.processPayout(withdrawalRequest);
    }


    return plainToInstance(WithdrawalRequestResponseDto, withdrawalRequest, {
      excludeExtraneousValues: true,
    });
  }

  async remove(
    id: string,
  ): Promise<WithdrawalRequestResponseDto> {
    const existing = await this.findOne(id);

    const withdrawalRequest = await this.prisma.withdrawalRequest.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });

    return plainToInstance(WithdrawalRequestResponseDto, withdrawalRequest, {
      excludeExtraneousValues: true,
    });
  }

  async getStatistics(userStakingPackageId?: string) {
    const where: any = {
      deletedAt: null,
      ...(userStakingPackageId && { userStakingPackageId }),
    };

    const [total, pending, approved, rejected, totalAmount] =
      await Promise.all([
        this.prisma.withdrawalRequest.count({ where }),
        this.prisma.withdrawalRequest.count({
          where: { ...where, status: WithdrawalStatus.PENDING },
        }),
        this.prisma.withdrawalRequest.count({
          where: { ...where, status: WithdrawalStatus.APPROVED },
        }),
        this.prisma.withdrawalRequest.count({
          where: { ...where, status: WithdrawalStatus.REJECTED },
        }),
        this.prisma.withdrawalRequest.aggregate({
          where: { ...where, status: WithdrawalStatus.APPROVED },
          _sum: { amount: true },
        }),
      ]);

    return {
      total,
      pending,
      approved,
      rejected,
      totalWithdrawn: totalAmount._sum.amount || 0,
    };
  }


  /**
   * Process payout via NOWPayments
   */
  private async processPayout(withdrawal: WithdrawalRequest): Promise<void> {
    try {
      const payoutResponse = await this.nowPaymentService.createPayout({
        ipn_callback_url: this.ipnCallbackUrl,
        withdrawals: [
          {
            address: withdrawal.address,
            currency: withdrawal.currency.toLowerCase(),
            amount: Number(withdrawal.amount),
          },
        ],
      });

      this.logger.log(
        `Payout created for withdrawal ${withdrawal.id}: ${payoutResponse.id}`,
      );

      // calculate toin amount
      let userPackage = await this.prisma.userStakingPackage.findUnique({
        where: { id: withdrawal.userStakingPackageId },
        select: { usdConversionRate: true },
      });
      
      // Convert to Decimal and calculate
      const amount = new Decimal(withdrawal.amount);
      const platformFee = new Decimal(withdrawal.platformFee);
      const conversionRate = new Decimal(userPackage.usdConversionRate);

      const totalUsdt = amount.plus(platformFee);
      const toinAmount = totalUsdt.div(conversionRate);

      withdrawal.amount = totalUsdt;

      // let's assume this is a success for now
      await this.transactionService.createWithdrawTransaction(withdrawal, toinAmount, conversionRate);


    } catch (error) {
      
      this.logger.error(
        `Payout failed for withdrawal ${withdrawal.id}: ${error.message}`,
      );
      
      throw new BadRequestException(`Payout failed: ${error.message}`);
    }
  }



}