import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { TransactionCalculationService } from './transaction-calculation.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionController],
  providers: [TransactionService,  TransactionCalculationService],
  exports: [TransactionService, TransactionCalculationService],
})
export class UserTransactionModule { }
