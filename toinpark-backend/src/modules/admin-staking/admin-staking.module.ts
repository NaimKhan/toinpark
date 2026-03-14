import { Module } from '@nestjs/common';
import { UserTransactionModule } from '../transaction/transaction.module';
import { AdminStakingService } from './admin-staking.service';
import { AdminStakingController } from './admin-staking.controller';

@Module({
  imports: [UserTransactionModule],
  controllers: [AdminStakingController],
  providers: [AdminStakingService],
  exports: [AdminStakingService],
})
export class AdminStakingModule {}
