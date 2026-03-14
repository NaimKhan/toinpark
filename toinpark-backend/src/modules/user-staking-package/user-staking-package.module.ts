import { Module } from '@nestjs/common';
import { UserStakingPackageService } from './user-staking-package.service';
import { UserStakingPackageController } from './user-staking-package.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UserTransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [PrismaModule, UserTransactionModule],
  controllers: [UserStakingPackageController],
  providers: [UserStakingPackageService],
  exports: [UserStakingPackageService],
})
export class UserStakingPackageModule {}