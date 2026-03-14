import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/core';
import {
  UserStakingPackageDTO,
} from './dto/staking-package-response.dto';
import {
  AudienceType,
  NotificationType,
  Transaction,
  TransactionStatus,
  TransactionType,
  UserStatus,
} from '@prisma/client';
import { addDays } from 'src/common/utils';
import { Decimal } from '@prisma/client/runtime/library';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';
import { toDecimal } from 'src/common/utils/decimal.utils';
import { TransactionService } from '../transaction/transaction.service';
import { NotificationService } from 'src/core/notification/notification.service';
import { NotificationGateway } from 'src/core/notification/notification.gateway';
import { UserRole } from 'src/common/enums/user-role.enum';
import { ConfigService } from '@nestjs/config';
import { CreateStakingDto } from './dto/create-staking.dto';
import { ValidationException } from 'src/common/exceptions';
import { NowPaymentService } from '../payment/now-payment.service';
import { CreateInvoiceDto } from '../payment/dto/now-payment.dto';
import { InvoiceResponse } from '../payment/now-payment-options.interface';

// NOWPayments payment statuses
type NowPaymentStatus =
  | 'waiting'
  | 'confirming'
  | 'confirmed'
  | 'sending'
  | 'partially_paid'
  | 'finished'
  | 'failed'
  | 'refunded'
  | 'expired';

@Injectable()
export class StakingService {
  private readonly logger = new Logger(StakingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly trxService: TransactionService,
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
    private readonly nowPaymentService: NowPaymentService,
  ) {}

  async buyStakingPackage(
    stakingDto: CreateStakingDto,
    userId: string,
  ): Promise<InvoiceResponse> {
    // Get conversion rate
    const conversionRate = await this.getConversionRate();

    // Calculate TOIN amount
    const totalToin = new Decimal(stakingDto.USDAmount).div(conversionRate);
    stakingDto.toinAmount = totalToin.toNumber();

    // Validate staking package
    const selectedPackage = await this.validateStakingPackage(
      stakingDto.stakingPackageId,
      stakingDto.toinAmount,
    );

    // Use database transaction for atomicity
    return await this.prisma.$transaction(async (tx) => {
      
      // Create pending transaction record first
      const transaction = await this.trxService.createStakingTransaction(
        stakingDto,
        userId,
        conversionRate,
        null, // payment_id will be updated after
        tx,
      );

      // Create invoice via NOWPayments (returns hosted payment page URL)
      const invoiceDto: CreateInvoiceDto = {
        price_amount: stakingDto.USDAmount,
        price_currency: 'usdtbsc',
        // pay_currency: 'usdtbsc', // optional: force pay currency
        order_id: transaction.transactionAutoId,
        order_description: `Staking: ${selectedPackage.name} - ${stakingDto.toinAmount} TOIN`,
        ipn_callback_url: this.configService.get<string>('NOWPAYMENTS_IPN_URL'),
        success_url: `${this.configService.get<string>('PAYMENT_SUCCESS_URL')}?txn=${transaction.transactionAutoId}`,
        cancel_url: `${this.configService.get<string>('PAYMENT_CANCEL_URL')}?txn=${transaction.transactionAutoId}`,
        is_fee_paid_by_user: true,
      };

      const invoice = await this.nowPaymentService.createInvoice(invoiceDto);
    
      // Update transaction with payment ID
      await tx.transaction.update({
        where: { id: transaction.id },
        data: {
          trxPaymentGatewayReferenceId: String(invoice.id),
          updatedAt: new Date(),
        },
      });

      this.logger.log(
        `Payment created: ${invoice.id} for transaction: ${transaction.transactionAutoId}`,
      );

      return invoice;
    });
  }

  /**
   * Handle IPN webhook from NOWPayments
   */
  async handlePaymentWebhook(paymentData: any, signature: string): Promise<void> {
    
    const isDevelopment = this.configService.get<string>('NODE_ENV') === 'development';
    
    if (!isDevelopment) {
      const isValid = this.nowPaymentService.verifyIpnSignature(paymentData, signature);
      if (!isValid) {
        this.logger.warn('Invalid IPN signature received');
        throw new BadRequestException('Invalid IPN signature');
      }
    } else {
      this.logger.warn('⚠️ Skipping IPN signature verification (development mode)');
    }


    const { payment_id, payment_status, order_id, invoice_id } = paymentData;

    this.logger.log(
      `IPN received - Payment: ${payment_id}, Status: ${payment_status}, Order: ${order_id}, Invoice: ${invoice_id}`,
    );

    // Find transaction by payment ID or order ID
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        OR: [
          { trxPaymentGatewayReferenceId: String(invoice_id) },
          { transactionAutoId: order_id },
        ],
      },
    });

    if (!transaction) {
      this.logger.warn(`Transaction not found for invoice: ${invoice_id}`);
      return;
    }

    // Skip if already processed
    if (transaction.trxStatus === TransactionStatus.COMPLETED) {
      this.logger.log(`Transaction ${transaction.id} already completed, skipping`);
      return;
    }

    // Process based on payment status
    await this.processPaymentStatus(transaction, paymentData);
  }

  /**
   * Process payment status from NOWPayments
   */
  private async processPaymentStatus(transaction: Transaction, paymentData: any): Promise<void> {
    const { payment_status } = paymentData;

    switch (payment_status as NowPaymentStatus) {
      case 'finished':
        await this.completeStaking(transaction, paymentData);
        break;

      case 'failed':
      case 'refunded':
        await this.failTransaction(transaction, paymentData);
        break;

      case 'expired':
        await this.expireTransaction(transaction, paymentData);
        break;

      case 'partially_paid':
        await this.handlePartialPayment(transaction, paymentData);
        break;

      case 'waiting':
      case 'confirming':
      case 'confirmed':
      case 'sending':
        // Update transaction data but keep status as PENDING
        await this.updateTransactionData(transaction, paymentData);
        break;

      default:
        this.logger.warn(`Unknown payment status: ${payment_status}`);
    }
  }

  /**
   * Complete staking after successful payment
   */
  private async completeStaking(transaction: Transaction, paymentData: any): Promise<void> {
    const conversionRate = await this.getConversionRate();

    const amount = toDecimal(transaction.toinAmount);
    const stakingPackage = await this.prisma.stakingPackagePlan.findFirst({
      where: {
        isActive: true,
        minToinAmount: { lte: amount },
        maxToinAmount: { gte: amount },
        deletedAt: null,
      },
    });


    if (!stakingPackage) {
      this.logger.error(`Staking package not found in toin amount : ${amount}`);
      return;
    }

    await this.prisma.$transaction(async (tx) => {
      
    // Create user staking package
    const userStakingPackage = await tx.userStakingPackage.create({
        data: {
          userId: transaction.userId,
          packageId: stakingPackage.id,
          toinAmount: transaction.toinAmount,
          usdtAmount: transaction.usdtAmount,
          bonusAmount: stakingPackage.bonusAmount,
          dailyProfitPercent: stakingPackage.dailyProfitPercent,
          startDate: new Date(),
          recurringProfitDays: stakingPackage.recurringProfitDays,
          initialEndDate: addDays(new Date(), stakingPackage.minimumDurationInDays),
          previousRewardDate: addDays(new Date(), stakingPackage.minimumDurationInDays),
          nextRewardDate: addDays(new Date(), stakingPackage.minimumDurationInDays),
          stakedToin: true,
          isBonusDone: false,
          isLevelingBonusDone: false,
          minimumDurationInDays: stakingPackage.minimumDurationInDays,
          isActive: true,
          usdConversionRate: conversionRate.toString(),
          createdAt: new Date(),
          createdBy: transaction.userId,
        },
      });

      // Update transaction status
      await tx.transaction.update({
        where: { id: transaction.id },
        data: {
          trxStatus: TransactionStatus.COMPLETED,
          updatedAt: new Date(),
          trxPaymentGatewayResponse: JSON.stringify(paymentData),
          userStakingPackageId: userStakingPackage.id,
          trxSuccessDatetime: new Date(),
        },
      });


      // update total staking balance in user wallet
      await this.trxService.addBalance(
        transaction.userId,
        TransactionType.STAKE,
        transaction.toinAmount,
      );

    });

    this.logger.log(`Staking completed for transaction: ${transaction.id}`);

    // Send notification (outside transaction)
    await this.sendNotificationsToAdmin(transaction.userId, stakingPackage.name);
  }

  /**
   * Mark transaction as failed
   */
  private async failTransaction(transaction: any, paymentData: any): Promise<void> {
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        trxStatus: TransactionStatus.FAILED,
        updatedAt: new Date(),
        trxPaymentGatewayResponse: JSON.stringify(paymentData),
      },
    });

    this.logger.log(`Transaction failed: ${transaction.id}`);
  }

  /**
   * Mark transaction as expired
   */
  private async expireTransaction(transaction: any, paymentData: any): Promise<void> {
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        trxStatus: TransactionStatus.CANCELLED, // or EXPIRED if you have that status
        updatedAt: new Date(),
        trxPaymentGatewayResponse: JSON.stringify(paymentData),
      },
    });

    this.logger.log(`Transaction expired: ${transaction.id}`);
  }

  /**
   * Handle partial payment
   */
  private async handlePartialPayment(transaction: any, paymentData: any): Promise<void> {
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        updatedAt: new Date(),
        trxPaymentGatewayResponse: JSON.stringify(paymentData),
        // You might want a PARTIAL status or store partial amount
      },
    });

    this.logger.warn(
      `Partial payment received for transaction: ${transaction.id}`,
    );
  }

  /**
   * Update transaction data without changing status
   */
  private async updateTransactionData(transaction: any, paymentData: any): Promise<void> {
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        updatedAt: new Date(),
        trxPaymentGatewayResponse: JSON.stringify(paymentData),
      },
    });
  }

  /**
   * Manual check for payment status (called from success/cancel URL or manually)
   */
  async checkPaymentStatus(invoiceId: string): Promise<UserStakingPackageDTO | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { trxPaymentGatewayReferenceId: invoiceId },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${invoiceId} not found.`);
    }

    // Skip if already completed
    if (transaction.trxStatus === TransactionStatus.COMPLETED) {
      const userStaking = await this.prisma.userStakingPackage.findFirst({
        where: { id: transaction.userStakingPackageId },
      });
      return plainToInstance(UserStakingPackageDTO, userStaking);
    }

    if (!transaction.trxPaymentGatewayReferenceId) {
      throw new BadRequestException('No payment reference found for this transaction');
    }

    // Check payment status from NOWPayments
    const payment = await this.nowPaymentService.getPaymentStatus(
      transaction.trxPaymentGatewayReferenceId,
    );

    // Process the status
    await this.processPaymentStatus(transaction, payment);

    // Return user staking if completed
    if (payment.payment_status === 'finished') {
      const userStaking = await this.prisma.userStakingPackage.findFirst({
        where: { id: transaction.userStakingPackageId },
      });
      return plainToInstance(UserStakingPackageDTO, userStaking);
    }

    return null;
  }

  /**
   * Cancel pending transaction
   */
  async cancelProcess(transactionId: string): Promise<void> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { transactionAutoId: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transactionId} not found.`);
    }

    if (transaction.trxStatus === TransactionStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed transaction');
    }

    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        trxStatus: TransactionStatus.CANCELLED,
        updatedAt: new Date(),
      },
    });

    this.logger.log(`Transaction cancelled: ${transactionId}`);
  }

  /**
   * Get conversion rate from system settings
   */
  private async getConversionRate(): Promise<Decimal> {
    const setting = await this.prisma.systemSetting.findFirst({
      where: { key: EnumSystemSetting.TOIN_CONVENTION_RATE },
    });

    if (!setting) {
      throw new BadRequestException('Conversion rate not configured');
    }

    return new Decimal(setting.value.toString());
  }

  /**
   * Validate staking package and amount
   */
  private async validateStakingPackage(packageId: string, toinAmount: number) {
    const selectedPackage = await this.prisma.stakingPackagePlan.findFirst({
      where: {
        id: packageId,
        isActive: true,
      },
    });

    if (!selectedPackage) {
      throw new ValidationException({
        stakingPackageId: 'Invalid staking package selected.',
      });
    }

    const amount = toDecimal(toinAmount);
    const minToin = toDecimal(selectedPackage.minToinAmount.toString());
    const maxToin = toDecimal(selectedPackage.maxToinAmount.toString());

    if (amount.lessThan(minToin) || amount.greaterThan(maxToin)) {
      throw new ValidationException({
        toinAmount: `Toin amount must be between ${minToin.toString()} and ${maxToin.toString()}.`,
      });
    }

    return selectedPackage;
  }


  /**
   * Send notifications to users based on audience type
   */
  private async sendNotificationsToAdmin(packageBuyerId: string, packageName: string): Promise<void> {
    try {
        const startTime = Date.now();

        // Get target users based on audience type
        const targetUserIds = await this.getTargetUserIdsByAudience(AudienceType.SYSTEM_USER);

        if (targetUserIds.length === 0) {
            this.logger.warn(`⚠️  No users found for audience type: ${AudienceType.SYSTEM_USER}`);
            return;
        }

        const user = await this.prisma.user.findUnique({
            where: { id: packageBuyerId },
            select: { toinAccountNumber: true }
        });

        this.logger.log(`📢 Sending announcement to ${targetUserIds.length} users (${AudienceType.SYSTEM_USER})`);
        // Create notifications in batch (efficient for many users)
        const createdCount = await this.notificationService.createBatch(
            targetUserIds,
            'Staking Package Purchased',
            `Toin Account ID: ${user?.toinAccountNumber} has purchased staking package ${packageName}.`,
            NotificationType.INFO,
        );

        this.logger.log(`Created ${createdCount} notifications in database`);

        // Get the latest notification for each user (for WebSocket)
        const notificationMap = await this.notificationService.getLatestByUserIds(targetUserIds);

        // Send real-time notifications via WebSocket
        let sentCount = 0;

        for (const [userId, notification] of notificationMap.entries()) {
            try {
                await this.notificationGateway.sendToUser(userId, notification);
                sentCount++;
            } catch (error) {
                this.logger.error(`Failed to send WebSocket notification to user ${userId}:`, error.message);
            }
        }
        const duration = Date.now() - startTime;
        this.logger.log(`✅ Sent ${sentCount} real-time notifications via WebSocket`);
        this.logger.log(`⏱️  Total time: ${duration}ms`);
    } catch (error) {
        this.logger.error('❌ Error sending notifications to audience:', error);
    }
  }


  /**
   * Get user IDs based on audience type (OPTIMIZED - returns only IDs)
   */
  private async getTargetUserIdsByAudience(audienceType: AudienceType): Promise<string[]> {

      const whereCondition: any = {
          status: UserStatus.ACTIVE,
          deletedAt: null,
      };

      if (audienceType === AudienceType.MEMBER) {
          // Get all MEMBER users
          whereCondition.userRole = UserRole.MEMBER;
      } else if (audienceType === AudienceType.SYSTEM_USER) {
          // Get all ADMIN and SUPERADMIN users
          whereCondition.userRole = {
              in: [UserRole.ADMIN, UserRole.SUPERADMIN],
          };
      } else {
          this.logger.warn(`Unknown audience type: ${audienceType}`);
          return [];
      }

      // Select only the ID field for better performance
      const users = await this.prisma.user.findMany({
          where: whereCondition,
          select: {
              id: true,
          },
      });

      // Return array of IDs directly
      return users.map(user => user.id);
  }
}