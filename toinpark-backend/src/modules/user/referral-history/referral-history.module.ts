import { Module } from '@nestjs/common';
import { ReferralHistoryController } from './referral-history.controller';
import { ReferralHistoryService } from './referral-history.service';

@Module({
  controllers: [ReferralHistoryController],
  providers: [ReferralHistoryService],
  exports: [ReferralHistoryService],
})
export class ReferralHistoryModule {}
