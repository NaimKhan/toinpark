import { Module } from '@nestjs/common';
import { OfficialAnnouncementService } from './official-announcement.service';
import { OfficialAnnouncementController } from './official-announcement.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OfficialAnnouncementController],
  providers: [OfficialAnnouncementService],
  exports: [OfficialAnnouncementService],
})
export class OfficialAnnouncementModule {}

