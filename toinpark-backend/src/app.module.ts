import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

// ==============================================
// CONFIGURATION & CORE MODULES
// ==============================================
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './core/auth/auth.module';
import { TutorialCategoryModule } from './modules/admin/tutorial-categories/tutorial-category.module';
import { TutorialModule } from './modules/admin/tutorial/tutorial.module';
import { AirDropEventModule } from './modules/admin/airdrop-event/airdrop-event.module';
import { LoggerModule } from './core/logger/logger.module';

// ==============================================
// GUARDS
// ==============================================
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { CustomThrottlerGuard } from './common/guards/throttle.guard';

// ==============================================
// ROOT CONTROLLERS & SERVICES
// ==============================================
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './core/redis/redis.module';
import { SystemSettingsModule } from './modules/general_settings/system-settings.module';
import { ReferralMilestoneModule } from './modules/admin/referral-milestone/referral-milestone.module';
import { ReferralLevelModule } from './modules/referral_level/referral-level.module';
import { AnnouncementCategoryModule } from './modules/announcement-categories/announcement-category.module';
import { OfficialAnnouncementModule } from './modules/official-announcements/official-announcement.module';
import { CommunityEventModule } from './modules/community_event/community-event.module';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { UserProfileModule } from './modules/user/user-profile/user-profile.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DashboardModule } from './modules/user/dashboard/dashboard.module';
import { TicketCategoryModule } from './modules/ticket-category/ticket-category.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { CountryModule } from './modules/country/country.module';
import { StateModule } from './modules/states/state.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { StakingPackagePlanModule } from './modules/staking-package-plan/staking-package-plan.module';
import { MemberModule } from './modules/member/member.module';
import { SubAdminModule } from './modules/sub-admin/sub-admin.module';
import { StorageModule } from './core/storage/storage.module';
import { ReferralHistoryModule } from './modules/user/referral-history/referral-history.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './core/notification/notification.module';
import { KycModule } from './modules/kyc/kyc.module';
import { NowPaymentsModule } from './modules/payment/now-payment.module';
import { UserWalletAddressModule } from './modules/user-wallet-address/user-wallet-address.module';
import { EmailOrPhoneChangeLogModule } from './modules/email-or-phone-change-log/email-or-phone-change-log.module';
import { WithdrawalRequestModule } from './modules/withdrawal-request/withdrawal-request.module';
import { NewStakingModule } from './modules/staking/staking.module';
import { AdminStakingModule } from './modules/admin-staking/admin-staking.module';
import { StakingAdjustmentModule } from './modules/staking-adjustment/staking-adjustment.module';
import { UserTransactionModule } from './modules/transaction/transaction.module';
import { UserStakingPackageModule } from './modules/user-staking-package/user-staking-package.module';



/**
 * Root Application Module
 * 
 * This module orchestrates all core infrastructure and feature modules.
 * It configures global guards for authentication and rate limiting.
 * 
 * @module AppModule
 */
@Module({
  imports: [

    ScheduleModule.forRoot(),
    // ==============================================
    // CONFIGURATION MODULE (Global)
    // Handles environment variables with Zod validation
    // ==============================================
    ConfigModule,
    StorageModule,

    // ==============================================
    // RATE LIMITING
    // Protects API from abuse by limiting requests
    // Default: 10 requests per 60 seconds (configurable via .env)
    // ==============================================
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.throttleTtl * 1000, // Convert seconds to milliseconds
          limit: configService.throttleLimit,
        },
      ],
    }),

    // ==============================================
    // CORE INFRASTRUCTURE MODULES
    // ==============================================
    PrismaModule,                 // Database ORM
    RedisModule,                   // Redis caching

    AuthModule,                   // JWT Authentication & Authorization
    UserProfileModule,
    MemberModule,
    SubAdminModule,
    SystemSettingsModule,
    DashboardModule,
    NotificationModule,

    TutorialCategoryModule,       // Tutorial Category Management
    TutorialModule,               // Tutorial Management
    AirDropEventModule,           // Airdrop Event Management
    ReferralMilestoneModule,      // Referral Milestone Management
    LoggerModule,                 // Custom logging service
    ReferralLevelModule,          // Referral Level Model
    AnnouncementCategoryModule,   // Announcement Category Management
    OfficialAnnouncementModule,   // Official Announcement Management
    CommunityEventModule,         // Community Event
    ChallengeModule,              // Challenge model


    // ==============================================
    // FEATURE MODULES
    // Add business logic modules here
    // ==============================================

    TicketCategoryModule,
    TicketModule,
    StakingPackagePlanModule,
    NewStakingModule,
    UserStakingPackageModule,
    CountryModule,
    StateModule,
    PdfModule,
    ReferralHistoryModule,
    UserTransactionModule,
    // GeneralTransactionModule,
    KycModule,
    UserWalletAddressModule,
    EmailOrPhoneChangeLogModule,
    NowPaymentsModule.forRoot(),
    WithdrawalRequestModule,
    AdminStakingModule,
    StakingAdjustmentModule,
  ],

  // ==============================================
  // ROOT CONTROLLERS
  // ==============================================
  controllers: [AppController],

  // ==============================================
  // GLOBAL PROVIDERS & GUARDS
  // ==============================================
  providers: [
    AppService,

    // ------------------------------------------
    // Global JWT Authentication Guard
    // ------------------------------------------
    // Protects all routes by default
    // Use @Public() decorator to bypass authentication
    // Validates JWT tokens and attaches user to request
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    // ------------------------------------------
    // Global Rate Limiting Guard
    // ------------------------------------------
    // Prevents abuse and brute force attacks
    // Limits requests per time window (configurable)
    // Use @SkipThrottle() decorator to bypass rate limiting
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },

  ],
})
export class AppModule { }