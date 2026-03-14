import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { UploadService } from 'src/common/services/upload.service';
import { AuthModule } from 'src/core';
import { RedisModule } from 'src/core/redis/redis.module';
import { EncryptionService } from 'src/common/services/EncryptionService';
import { ReferralHistoryModule } from '../referral-history/referral-history.module';
import { UserTransactionModule } from 'src/modules/transaction/transaction.module';


@Module({
  imports: [RedisModule, AuthModule, ReferralHistoryModule, UserTransactionModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, UploadService, EncryptionService],
  exports: [UserProfileService],
})
export class UserProfileModule { }
