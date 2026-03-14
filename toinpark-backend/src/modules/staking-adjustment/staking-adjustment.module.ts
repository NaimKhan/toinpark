import { Module } from '@nestjs/common';
import { StakingAdjustmentService } from './staking-adjustment.service';
import { StakingAdjustmentController } from './staking-adjustment.controller';
import { UserTransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [UserTransactionModule],
  controllers: [StakingAdjustmentController],
  providers: [StakingAdjustmentService],
  exports: [StakingAdjustmentService],
})
export class StakingAdjustmentModule {}
