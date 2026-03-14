import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Prisma, Transaction, TransactionStatus, TransactionType, UserWallet, WithdrawalRequest } from '@prisma/client';
import { TransactionSortField } from './dto/transaction-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { AmountTypeEnum } from 'src/common/enums/amount-type-enum';
import { UploadService } from 'src/common/services/upload.service';
import { ReferenceTransactionResponseDto } from './dto/reference-transaction-response.dto';
import { CreateStakingDto } from '../staking/dto/create-staking.dto';
import { Decimal, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { generateTransactionId } from 'src/common/utils';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { TransactionCalculationService } from './transaction-calculation.service';

interface TransactionFilters {
  search?: string;
  trxType?: TransactionType;
  trxStatus?: TransactionStatus;
  userId?: string;
  levelId?: string;
}

const TRANSACTION_TYPE_AMOUNT_MAP = new Map<TransactionType, AmountTypeEnum>([
  // Credit transactions
  [TransactionType.STAKE, AmountTypeEnum.CREDIT],
  [TransactionType.COMMISSION_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.PROFIT, AmountTypeEnum.CREDIT],
  [TransactionType.STAKING_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.ENTRY_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.KYC_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.CHALLENGE_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.LEVELING_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.SOCIAL_REFERRAL, AmountTypeEnum.CREDIT],
  [TransactionType.CLAIM_BONUS, AmountTypeEnum.CREDIT],

  // Debit transactions
  [TransactionType.REFUND, AmountTypeEnum.DEBIT],
  [TransactionType.WITHDRAWAL, AmountTypeEnum.DEBIT],
  [TransactionType.VOID, AmountTypeEnum.DEBIT],
]);


@Injectable()
export class TransactionService {


  private readonly logger = new Logger(TransactionService.name);
  // Map transaction types to wallet fields
  private readonly walletFieldMap: Record<TransactionType, keyof UserWallet | null> = {
    [TransactionType.STAKING_BONUS]: 'totalStakingBonus',
    [TransactionType.ENTRY_BONUS]: 'totalEntryBonus',
    [TransactionType.KYC_BONUS]: 'totalKycBonus',
    [TransactionType.CLAIM_BONUS]: 'totalClaimBonus',
    [TransactionType.SOCIAL_REFERRAL]: 'totalReferral',
    [TransactionType.STAKE]: 'totalStaking',
    [TransactionType.COMMISSION_BONUS]: 'totalCommissionBonus',
    [TransactionType.LEVELING_BONUS]: 'totalLevelingBonus',
    [TransactionType.CHALLENGE_BONUS]: 'totalChallengeBonus',
    [TransactionType.REFUND]: 'totalRefund',
    [TransactionType.VOID]: 'totalVoid',
    [TransactionType.WITHDRAWAL]: 'totalWithdrawals',
    [TransactionType.STAKING_ADJUSTMENT]: 'totalStaking',
    [TransactionType.PROFIT]: null,
    // Add other transaction types as needed, or set to null if not applicable
  };


  constructor(private prisma: PrismaService, 
              private readonly transactionCalculationService: TransactionCalculationService
  ) { }

  async findAll(filters: TransactionFilters,
    page = 1,
    limit = 10,
    sortBy: TransactionSortField,
    sortOrder: EnumSortOrder
  ): Promise<{ items: TransactionResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      ...(filters.trxType && { trxType: filters.trxType }),
      ...(filters.trxStatus && { trxStatus: filters.trxStatus }),
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.levelId && { levelId: filters.levelId }),
    };


    // Enhanced search across transaction, user, and user profile
    if (filters.search) {
      where.OR = [
        // Transaction fields
        { transactionAutoId: { contains: filters.search, mode: 'insensitive' } },

        // User fields
        {
          user: {
            is: {
              phoneNumber: { contains: filters.search, mode: 'insensitive' },
            },
          },
        },
        {
          user: {
            is: {
              email: { contains: filters.search, mode: 'insensitive' },
            },
          },
        },
        {
          user: {
            is: {
              username: { contains: filters.search, mode: 'insensitive' },
            },
          },
        },
        {
          user: {
            is: {
              referralCode: { contains: filters.search, mode: 'insensitive' },
            },
          },
        },

        // User Profile fields
        {
          user: {
            is: {
              userProfile: {
                is: {
                  firstName: { contains: filters.search, mode: 'insensitive' },
                },
              },
            },
          },
        },
        {
          user: {
            is: {
              userProfile: {
                is: {
                  lastName: { contains: filters.search, mode: 'insensitive' },
                },
              },
            },
          },
        },
        {
          user: {
            is: {
              userProfile: {
                is: {
                  addressLine1: { contains: filters.search, mode: 'insensitive' },
                },
              },
            },
          },
        },
        {
          user: {
            is: {
              userProfile: {
                is: {
                  city: { contains: filters.search, mode: 'insensitive' },
                },
              },
            },
          },
        },
        {
          user: {
            is: {
              userProfile: {
                is: {
                  zipCode: { contains: filters.search, mode: 'insensitive' },
                },
              },
            },
          },
        },

      ];
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: {
            include: {
              userProfile: {
                include : { country : true}
              }
            },
          },
          referralLevel: true,
          userStakingPackage: {
            include: {
              package: true,
              user: {
                include: {
                  userProfile: true,
                },
              },
            }
            
          },
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);


    // Get unique referrerIds
    // const referrerIds = [...new Set(
    //   items
    //     .filter(item => item.user)
    //     .map(item => item.user)
    // )];


    let referrerMap = new Map<string, any>();

    // if (referrerIds.length > 0) {
    //   const referrers = await this.prisma.user.findMany({
    //     where: {
    //       id: { in: referrerIds },
    //     },
    //     select: {
    //       id: true,
    //       username: true,
    //       referralCode: true,
    //       emailVerifiedAt: true,
    //       phoneVerifiedAt: true,
    //       userProfile: {
    //         select: {
    //           firstName: true,
    //           lastName: true,
    //         },
    //       },
    //     },
    //   });


    //   // Create map with referral user info
    //   referrerMap = new Map(
    //     referrers.map(ref => {
    //       const firstName = ref.userProfile?.firstName?.trim();
    //       const lastName = ref.userProfile?.lastName?.trim();

    //       let displayName: string;
    //       if (firstName && lastName) {
    //         displayName = `${firstName} ${lastName}`;
    //       } else if (firstName) {
    //         displayName = firstName;
    //       } else if (lastName) {
    //         displayName = lastName;
    //       } else {
    //         displayName = ref.username;
    //       }

    //       return [
    //         ref.id,
    //         {
    //           id: ref.id,
    //           username: ref.username,
    //           referralCode: ref.referralCode,
    //           joinedDate: ref.emailVerifiedAt || ref.phoneVerifiedAt,
    //           displayName: displayName,
    //         }
    //       ];
    //     })
    //   );
    // }

    // // Transform data to include computed fields
    // const transformedItems = items.map(item => {
    //   const amountType = TRANSACTION_TYPE_AMOUNT_MAP.get(item.trxType) || AmountTypeEnum.DEBIT;

    //   // Get referral user info
    //   const referralUserInfo = item.referredUser
    //     ? referrerMap.get(item.referredUser)
    //     : null;

    //   return {
    //     ...item,
    //     amountType,
    //     referralUser: referralUserInfo,
    //   };

    // });

    // const sourceTransactions = filters.userId && items?.length ? this.transactionCalculationService.calculateRunningBalancesDesc(items) : items ?? [];

    const sourceTransactions = filters.userId && items?.length 
    ? this.transactionCalculationService.calculateRunningBalancesDesc(items) 
    : this.transactionCalculationService.addAmountType(items ?? []);


    const transactions = plainToInstance(TransactionResponseDto, sourceTransactions, { excludeExtraneousValues: true });

    // await Promise.all(transactions.map(async (e) => {
    //   if (e.user?.userProfile?.profileImageUrl) {
    //     e.user.userProfile.media = await this.uploadService.getMediaDetails(e.user.userProfile.profileImageUrl);
    //   }
    //   if (e.referrerTransaction?.user?.userProfile?.profileImageUrl) {
    //     e.referrerTransaction.user.userProfile.media = await this.uploadService.getMediaDetails(e.referrerTransaction.user.userProfile.profileImageUrl);
    //   }
    // }));

    return {
      items: transactions,
      totalCount,
    };
  }


  async findOne(id: string): Promise<ReferenceTransactionResponseDto> {
    const tx = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            userProfile: true
          },
        },
        referralLevel: true,
        userStakingPackage: {
          include: {
            package: true,
          }
        }
      },
    });

    if (!tx) throw new NotFoundException('Transaction not found');

    tx['amountType'] = TRANSACTION_TYPE_AMOUNT_MAP.get(tx.trxType) || AmountTypeEnum.DEBIT;

    return plainToInstance(ReferenceTransactionResponseDto, tx, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Create entry bonus transaction for new user
   */
  async createEntryBonusTransaction(userId: string): Promise<Transaction> {
    const { conversionRate, bonusAmount } = await this.getSystemSettings(
      EnumSystemSetting.TOIN_CONVENTION_RATE,
      EnumSystemSetting.ENTRY_BONUS_TOIN,
    );

    return this.createBonusTransaction(
      userId,
      TransactionType.ENTRY_BONUS,
      bonusAmount,
      conversionRate,
    );
  }


  /**
   * Create KYC bonus transaction
   */
  async createKYCBonusTransaction(userId: string): Promise<Transaction> {
    const { conversionRate, bonusAmount } = await this.getSystemSettings(
      EnumSystemSetting.TOIN_CONVENTION_RATE,
      EnumSystemSetting.KYC_BONUS_TOINS,
    );

    return this.createBonusTransaction(
      userId,
      TransactionType.KYC_BONUS,
      bonusAmount,
      conversionRate,
    );
  }

  /**
   * Create staking bonus transaction
   */
  async createStakingBonusTransaction(
    userId: string,
    toinAmount: Decimal | number | string,
    userStakingPackageId: string
  ): Promise<Transaction> {
    const conversionRate = await this.getConversionRate();

    return this.createBonusTransaction(
      userId,
      TransactionType.STAKING_BONUS,
      toinAmount,
      conversionRate,
      null, // trxNote
      // relationship
      userStakingPackageId
    );
  }


  /**
   * Create commission bonus transaction
   */
  async createCommissionBonusTransaction(
    userId: string,
    toinAmount: Decimal | number | string,
    userStakingPackageId: string
  ): Promise<Transaction> {
    const conversionRate = await this.getConversionRate();

    return this.createBonusTransaction(
      userId,
      TransactionType.COMMISSION_BONUS,
      toinAmount,
      conversionRate,
      null, // trxNote
      userStakingPackageId
    );
  }

  /**
   * Create leveling bonus transaction
   */
  async createLevelingBonusTransaction(
    userId: string,
    toinAmount: Decimal | number | string,
    userStakingPackageId: string,
    levelId: string,
  ): Promise<Transaction> {
    const conversionRate = await this.getConversionRate();

    return this.createBonusTransaction(
      userId,
      TransactionType.LEVELING_BONUS,
      toinAmount,
      conversionRate,
      null, // trxNote
      userStakingPackageId,
      levelId,
    );
  }


  /**
   * Create challenge bonus transaction
   */
  async createChallengeBonusTransaction(
    userId: string,
    toinAmount: Decimal | number | string,
    referenceTransactionId?: string,
  ): Promise<Transaction> {
    const conversionRate = await this.getConversionRate();

    return this.createBonusTransaction(
      userId,
      TransactionType.CHALLENGE_BONUS,
      toinAmount,
      conversionRate,
      referenceTransactionId,
    );
  }


  /**
   * Create referral bonus transaction
   */
  async createReferralBonusTransaction(
    userId: string,
    toinAmount: Decimal | number | string,
    note?: string,
  ): Promise<Transaction> {
    const conversionRate = await this.getConversionRate();

    return this.createBonusTransaction(
      userId,
      TransactionType.CLAIM_BONUS,
      toinAmount,
      conversionRate,
      note
    );
  }





  /**
   * Generic bonus transaction creator
   */
  private async createBonusTransaction(
    userId: string,
    trxType: TransactionType,
    toinAmount: Decimal | number | string,
    conversionRate: Decimal | number | string,
    customNote?: string,
    userStakingPackageId?: string,
    referralLevelId?: string
  ): Promise<Transaction> {

    const toinDecimal = new Decimal(toinAmount.toString());
    const rateDecimal = new Decimal(conversionRate.toString());
    const usdAmount = toinDecimal.times(rateDecimal);

    const transaction = await this.prisma.transaction.create({
      data: {
        transactionAutoId: generateTransactionId(),
        trxType: trxType,
        trxStatus: TransactionStatus.COMPLETED,
        trxSuccessDatetime: new Date(),
        userId: userId,
        toinAmount: toinDecimal,
        usdtAmount: usdAmount,
        usdtConversionRate: rateDecimal,
        createdAt: new Date(),
        createdBy: userId,
        trxNote: customNote || `${trxType} transaction completed.`,

        // relationship
        userStakingPackageId: userStakingPackageId || null,
        levelId: referralLevelId || null,

      },
    });

    // Update wallet balance
    await this.addBalance(userId, trxType, toinDecimal);

    this.logger.log(
      `${trxType} created for user ${userId}: ${toinDecimal.toFixed(4)} TOIN`,
    );

    return transaction;
  }

  /**
   * Create a staking transaction
   * @param stakingDto - Staking data
   * @param userId - User ID
   * @param conversionRate - USD to TOIN conversion rate
   * @param paymentReferenceId - Payment gateway reference ID (optional)
   * @param tx - Prisma transaction client (optional)
   */
  async createStakingTransaction(
    stakingDto: CreateStakingDto,
    userId: string,
    conversionRate: Decimal,
    paymentReferenceId?: string | null,
    tx?: Prisma.TransactionClient,
  ): Promise<Transaction> {
    const db = tx ?? this.prisma;

    return await db.transaction.create({
      data: {
        transactionAutoId: generateTransactionId(),
        trxType: TransactionType.STAKE,
        trxStatus: TransactionStatus.PENDING,
        userId: userId,
        toinAmount: stakingDto.toinAmount,
        usdtAmount: stakingDto.USDAmount,
        usdtConversionRate: conversionRate,
        trxPaymentGatewayReferenceId: paymentReferenceId ?? null,
        createdAt: new Date().toISOString(),
        createdBy: userId,
        trxNote: `Create a new ${TransactionStatus.PENDING} transaction.\n\n`,
      },
    });
  }

  /**
   * 
   * @param withdrawalRequest
   * @param toinAmount 
   * @param conversionRate
   * 
   */
  async createWithdrawTransaction(withdrawalRequest: WithdrawalRequest, toinAmount: Decimal, conversionRate: Decimal): Promise<void> {
  
      await this.prisma.transaction.create({
          data: {
              transactionAutoId: generateTransactionId(),
              trxType: TransactionType.WITHDRAWAL,
              trxStatus: TransactionStatus.COMPLETED,
              trxSuccessDatetime: new Date().toISOString(),
              userId: withdrawalRequest.createdBy,
              toinAmount: toinAmount,
              usdtAmount: withdrawalRequest.amount,
              usdtConversionRate: conversionRate,
              createdAt: new Date().toISOString(),
              createdBy: withdrawalRequest.createdBy,
              trxNote: `Create a new ${TransactionStatus.COMPLETED} transaction. /n /n`,

              // relationship
              userStakingPackageId: withdrawalRequest.userStakingPackageId,
              withdrawalRequestId: withdrawalRequest.id,
          }
      });

      await this.subtractBalance(withdrawalRequest.createdBy, TransactionType.WITHDRAWAL, toinAmount);
  }


  /**
   * Create a transaction for admin-initiated staking
   */
  async createAdminStakingTransaction(data: {
    userId: string;
    adminId: string;
    userStakingPackageId: string;
    toinAmount: Decimal;
    usdtAmount: Decimal;
    usdtConversionRate: Decimal;
    remark?: string;
  }, tx?: Prisma.TransactionClient): Promise<Transaction> {
    const db = tx ?? this.prisma;
    
    return await db.transaction.create({
      data: {
        transactionAutoId: generateTransactionId(),
        trxSuccessDatetime: new Date(),
        trxType: TransactionType.STAKE,
        trxStatus: TransactionStatus.COMPLETED,
        userId: data.userId,
        userStakingPackageId: data.userStakingPackageId,
        toinAmount: data.toinAmount,
        usdtAmount: data.usdtAmount,
        usdtConversionRate: data.usdtConversionRate,
        createdAt: new Date(),
        createdBy: data.adminId,
        trxNote: `Admin ${data.adminId} staked on behalf of user ${data.userId}`,
      },
    });
  }
  /**
   * Create a transaction for staking adjustment (ADD/DEDUCT)
   */
  async createStakingAdjustmentTransaction(data: {
    userId: string;
    adminId: string;
    stakingAdjustmentId: string;
    userStakingPackageId: string;
    toinAmount: Decimal;
    usdtAmount: Decimal;
    usdtConversionRate: Decimal;
    type: string;
    remark?: string;
  }, tx?: Prisma.TransactionClient): Promise<Transaction> {
    const db = tx ?? this.prisma;
    
    return await db.transaction.create({
      data: {
        transactionAutoId: generateTransactionId(),
        trxSuccessDatetime: new Date(),
        trxType: TransactionType.STAKING_ADJUSTMENT,
        trxStatus: TransactionStatus.COMPLETED,
        userId: data.userId,
        stakingAdjustmentId: data.stakingAdjustmentId,
        userStakingPackageId: data.userStakingPackageId,
        toinAmount: data.toinAmount,
        usdtAmount: data.usdtAmount,
        usdtConversionRate: data.usdtConversionRate,
        createdAt: new Date(),
        createdBy: data.adminId,
        trxNote: `Admin ${data.adminId} adjusted staking (${data.type}) for user ${data.userId}`,
      },
    });
  }


  /**
   * Get conversion rate from system settings
   */
  private async getConversionRate(): Promise<Decimal> {
    const setting = await this.prisma.systemSetting.findFirst({
      where: { key: EnumSystemSetting.TOIN_CONVENTION_RATE },
    });

    if (!setting) {
      throw new NotFoundException('Conversion rate not configured');
    }

    return new Decimal(setting.value.toString());
  }

  /**
   * Get system settings (conversion rate and bonus amount)
   */
  private async getSystemSettings(
    conversionRateKey: EnumSystemSetting,
    bonusAmountKey: EnumSystemSetting,
  ): Promise<{ conversionRate: Decimal; bonusAmount: Decimal }> {
    const settings = await this.prisma.systemSetting.findMany({
      where: {
        key: { in: [conversionRateKey, bonusAmountKey] },
      },
    });

    if (settings.length < 2) {
      throw new NotFoundException('Required system settings not found');
    }

    const conversionRateSetting = settings.find((s) => s.key === conversionRateKey);
    const bonusAmountSetting = settings.find((s) => s.key === bonusAmountKey);

    if (!conversionRateSetting || !bonusAmountSetting) {
      throw new NotFoundException('Required system settings not found');
    }

    return {
      conversionRate: new Decimal(conversionRateSetting.value.toString()),
      bonusAmount: new Decimal(bonusAmountSetting.value.toString()),
    };
  }


  /**
   * Update user wallet balance for a specific transaction type
   * - Transaction field: Always increases (tracks total for that type)
   * - walletBalance: Increases or decreases based on operation
   */
  async updateWalletBalance(
    userId: string,
    trxType: TransactionType,
    amount: number | string | Decimal,
    operation: 'add' | 'subtract' = 'add',
  ): Promise<UserWallet> {
    const fieldToUpdate = this.walletFieldMap[trxType];

    if (!fieldToUpdate) {
      throw new BadRequestException(`Unsupported transaction type: ${trxType}`);
    }

    return this.executeWithRetry(() =>
      this.prisma.$transaction(async (tx) => {
        const wallet = await tx.userWallet.findUnique({
          where: { userId },
        });

        if (!wallet) {
          throw new NotFoundException(`Wallet not found for user: ${userId}`);
        }

        const amountDecimal = new Decimal(amount.toString());

        // Transaction field always increases (tracking total)
        const currentFieldBalance = new Decimal(wallet[fieldToUpdate]?.toString() || '0');
        const newFieldBalance = currentFieldBalance.plus(amountDecimal);

        // Wallet balance increases or decreases based on operation
        const currentWalletBalance = new Decimal(wallet.walletBalance?.toString() || '0');
        const newWalletBalance = operation === 'add'
          ? currentWalletBalance.plus(amountDecimal)
          : currentWalletBalance.minus(amountDecimal);

        // Prevent negative wallet balance
        if (newWalletBalance.isNegative()) {
          throw new BadRequestException('Insufficient wallet balance');
        }

        return tx.userWallet.update({
          where: { userId },
          data: {
            [fieldToUpdate]: newFieldBalance,    // Always increases
            walletBalance: newWalletBalance,      // Based on operation
            updatedAt: new Date(),
          },
        });
      }),
    );
  }



  /**
   * Add to wallet balance
   */
  async addBalance(
    userId: string,
    trxType: TransactionType,
    amount: number | string | Decimal,
  ): Promise<UserWallet> {
    return this.updateWalletBalance(userId, trxType, amount, 'add');
  }


  /**
   * Subtract from wallet balance
   */
  async subtractBalance(
    userId: string,
    trxType: TransactionType,
    amount: number | string | Decimal,
  ): Promise<UserWallet> {
    return this.updateWalletBalance(userId, trxType, amount, 'subtract');
  }


    /**
   * Execute with retry logic for deadlock handling
   */
  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 5,
    baseDelayMs = 50,
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (!this.isRetryableError(error) || attempt === maxRetries) {
          throw error;
        }

        const delayMs = baseDelayMs * Math.pow(2, attempt);
        this.logger.warn(`Retrying operation (attempt ${attempt + 1}/${maxRetries}) after ${delayMs}ms`);
        await this.delay(delayMs);
      }
    }

    throw lastError;
  }


    /**
   * Check if error is retryable (deadlock, serialization)
   */
  private isRetryableError(error: any): boolean {
    if (error instanceof PrismaClientKnownRequestError) {
      return ['40001', '40P01'].includes(error.code);
    }

    const message = error?.message?.toLowerCase() || '';
    return (
      message.includes('deadlock') ||
      message.includes('could not serialize') ||
      message.includes('lock')
    );
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  

}
