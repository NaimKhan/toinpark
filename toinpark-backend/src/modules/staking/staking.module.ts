import { Module } from '@nestjs/common';
import { StakingController } from './staking.controller';
import { StakingService } from './staking.service';
import { ConfigService } from '@nestjs/config';
import { NowPaymentsModule } from '../payment/now-payment.module';
import { UserTransactionModule } from '../transaction/transaction.module';
import { CommissionService } from './commision.service';



@Module({
  imports: [NowPaymentsModule.forRoot(), UserTransactionModule],
  controllers: [StakingController],
  providers: [StakingService, ConfigService, CommissionService],
  exports: [StakingService, CommissionService],
})
export class NewStakingModule { }
