import { Module } from '@nestjs/common';
import { ReferralLevelService } from './referral-level.service';
import { ReferralLevelController } from './referral-level.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReferralLevelController],
  providers: [ReferralLevelService],
  exports: [ReferralLevelService],
})
export class ReferralLevelModule {}