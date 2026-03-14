import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { TransactionService } from '../transaction/transaction.service';
import { UserStakingPackage } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { addDays } from 'src/common/utils';

@Injectable()
export class CommissionService {
  private readonly logger = new Logger(CommissionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionService,
  ) {}

  /**
   * Cron job to process commission and leveling bonuses
   * Runs every hour
   */
  @Cron(CronExpression.EVERY_HOUR)
  async processCommissionAndLevelingBonuses(): Promise<void> {
    this.logger.log('Starting commission and leveling bonus processing job...');

    try {

      const now = new Date();

      // Find eligible staking packages
      const eligiblePackages = await this.prisma.userStakingPackage.findMany({
        where: {
          submitForWithdraw: false,
          isActive: true,
          withdrawalStatus: null,
          nextRewardDate: { lte: now },
          previousRewardDate: { lte: now },
          initialEndDate: { lte: now },
        },
      });

      if (eligiblePackages.length === 0) {
        this.logger.log('No eligible staking packages found for processing');
        return;
      }

      this.logger.log(`Found ${eligiblePackages.length} staking packages to process`);

      // Process each package
      for (const stakingPackage of eligiblePackages) {
        try {
          await this.processStakingPackage(stakingPackage, now);
        } catch (error) {
          this.logger.error(
            `Failed to process staking package ${stakingPackage.id}: ${error.message}`,
          );
          // Continue with next package
        }
      }

      this.logger.log('Commission and leveling bonus processing completed');
    } catch (error) {
      this.logger.error(`Commission processing job failed: ${error.message}`);
    }
  }

  /**
   * Process a single staking package for bonuses
   */
  private async processStakingPackage(
    stakingPackage: UserStakingPackage,
    now: Date,
  ): Promise<void> {
    const isMatured = stakingPackage.initialEndDate < now;

    if (!isMatured) {
      return;
    }

    await this.prisma.$transaction(async (tx) => {

      let isBonusDone = stakingPackage.isBonusDone;
      let isLevelingBonusDone = stakingPackage.isLevelingBonusDone;

      // Process staking bonus (one-time)
      if (this.shouldProcessStakingBonus(stakingPackage) && !isBonusDone) {
        await this.processStakingBonus(stakingPackage);
        isBonusDone = true;
      }

      // Process leveling bonus (one-time)
      if (this.shouldProcessLevelingBonus(stakingPackage) && !isLevelingBonusDone) {
        await this.processLevelingBonus(stakingPackage);
        isLevelingBonusDone = true;
      }

      // Process commission bonus
      const commissionToin = this.calculateCommissionBonus(stakingPackage);
      
      if (commissionToin.greaterThan(0)) {

        await this.transactionService.createCommissionBonusTransaction(
            stakingPackage.userId,
            commissionToin,
            stakingPackage.id
        );

        this.logger.log(
            `Commission bonus processed for user ${stakingPackage.userId}: ${commissionToin.toFixed(4)} TOIN`,
        );

      }

      // Update staking package
      await tx.userStakingPackage.update({
        where: { id: stakingPackage.id },
        data: {
          previousRewardDate: new Date(),
          nextRewardDate: addDays(new Date(), stakingPackage.recurringProfitDays),
          stakedToin: false,
          isBonusDone,
          isLevelingBonusDone,
          updatedAt: new Date(),
          updatedBy: 'SYSTEM',
        },
      });

      this.logger.log(`Processed staking package: ${stakingPackage.id}`);
    });
  }

  /**
   * Check if staking bonus should be processed
   */
  private shouldProcessStakingBonus(stakingPackage: UserStakingPackage): boolean {
    return (
      stakingPackage.initialEndDate <= stakingPackage.nextRewardDate &&
      new Decimal(stakingPackage.bonusAmount?.toString() || '0').greaterThan(0)
    );
  }

  /**
   * Check if leveling bonus should be processed
   */
  private shouldProcessLevelingBonus(stakingPackage: UserStakingPackage): boolean {
    return stakingPackage.initialEndDate <= stakingPackage.nextRewardDate;
  }

  /**
   * Process staking bonus
   */
  private async processStakingBonus(
    stakingPackage: UserStakingPackage
  ): Promise<void> {
    const toinAmount = new Decimal(stakingPackage.bonusAmount?.toString() || '0');

    await this.transactionService.createStakingBonusTransaction(
        stakingPackage.userId,
        stakingPackage.bonusAmount,
        stakingPackage.id
    );


    this.logger.log(
      `Staking bonus processed for user ${stakingPackage.userId}: ${toinAmount} TOIN`,
    );
  }

  /**
   * Calculate commission bonus amount
   */
  private calculateCommissionBonus(stakingPackage: UserStakingPackage): Decimal {
    const toinAmount = new Decimal(stakingPackage.toinAmount?.toString() || '0');
    const dailyPercent = new Decimal(stakingPackage.dailyProfitPercent?.toString() || '0');

    const isFirstReward =
      stakingPackage.initialEndDate.toISOString() === stakingPackage.nextRewardDate.toISOString();

    if (isFirstReward) {
      // First time: calculate for all minimum duration days
      const totalPercent = dailyPercent.times(stakingPackage.minimumDurationInDays);
      return toinAmount.times(totalPercent).div(100);
    } else {
      // Recurring: calculate for recurring profit days
      return toinAmount
        .times(dailyPercent)
        .div(100)
        .times(stakingPackage.recurringProfitDays);
    }
  }


  /**
   * Process leveling bonus for referral chain
   */
  private async processLevelingBonus(
    userStakingPackage: UserStakingPackage
  ): Promise<void> {
    // Get user info
    const user = await this.prisma.user.findUnique({
      where: { id: userStakingPackage.userId },
      select: { id: true, referrerId: true },
    });

    if (!user) {
      this.logger.warn(`User not found for leveling bonus: ${userStakingPackage.userId}`);
      return;
    }

    // Skip if no referrer or already calculated
    if (!user.referrerId) {
      return;
    }

    // Get referral levels
    const referralLevels = await this.prisma.referralLevel.findMany({
      orderBy: { levelNumber: 'asc' },
    });

    // Process referral chain
    let currentReferrerId = user.referrerId;

    for (const level of referralLevels) {
      if (!currentReferrerId) break;

      const referrer = await this.prisma.user.findUnique({
        where: { id: currentReferrerId },
        select: { id: true, referrerId: true },
      });

      if (!referrer) break;

      // Calculate leveling bonus
      const bonusPercent = new Decimal(level.referralBonusPercentage?.toString() || '0');
      const userStakingToinAmount = new Decimal(userStakingPackage.toinAmount?.toString() || '0');
      const toinAmount = userStakingToinAmount.times(bonusPercent).div(100);

      if (toinAmount.greaterThan(0)) {

        await this.transactionService.createLevelingBonusTransaction(
          referrer.id,
          toinAmount,
          userStakingPackage.id,
          level.id,
        );

        this.logger.log(
          `Leveling bonus (${level.levelName}) processed for user ${referrer.id}: ${toinAmount.toFixed(4)} TOIN`,
        );
      }

      // Move to next referrer in chain
      currentReferrerId = referrer.referrerId;
    }

  }

}