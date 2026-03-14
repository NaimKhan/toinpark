import { Module } from '@nestjs/common';
import { WithdrawalRequestService } from './withdrawal-request.service';
import { WithdrawalRequestController } from './withdrawal-request.controller';
import { NowPaymentsModule } from '../payment/now-payment.module';
import { SystemSettingsModule } from '../general_settings/system-settings.module';
import { UserTransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [NowPaymentsModule.forRoot(), UserTransactionModule, SystemSettingsModule],
  controllers: [WithdrawalRequestController],
  providers: [WithdrawalRequestService],
  exports: [WithdrawalRequestService],
})
export class WithdrawalRequestModule {}