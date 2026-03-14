import { Module } from '@nestjs/common';
import { StakingPackagePlanService } from './staking-package-plan.service';
import { StakingPackagePlanController } from './staking-package-plan.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StakingPackagePlanController],
  providers: [StakingPackagePlanService],
  exports: [StakingPackagePlanService],
})
export class StakingPackagePlanModule {}