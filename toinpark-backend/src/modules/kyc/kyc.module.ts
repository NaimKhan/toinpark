import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';
import { AuthModule } from 'src/core';
import { EncryptionService } from 'src/common/services/EncryptionService';
import { RedisModule } from 'src/core/redis/redis.module';
import { ReferralHistoryModule } from '../user/referral-history/referral-history.module';
import { UserTransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [RedisModule, AuthModule, ReferralHistoryModule, UserTransactionModule],
  controllers: [KycController],
  providers: [KycService, EncryptionService],
  exports: [KycService],
})
export class KycModule { }

