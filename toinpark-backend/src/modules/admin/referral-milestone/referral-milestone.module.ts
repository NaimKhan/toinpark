import { Module } from '@nestjs/common';
import { ReferralMilestoneController } from './referral-milestone.controller';
import { ReferralMilestoneService } from './referral-milestone.service';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { PaginationService } from 'src/common/services/paginationService';

@Module({
  controllers: [ReferralMilestoneController],
  providers: [ReferralMilestoneService, PrismaService, PaginationService],
  exports: [ReferralMilestoneService],
})
export class ReferralMilestoneModule {}