import { Module } from '@nestjs/common';
import { CommunityEventService } from './community-event.service';
import { CommunityEventController } from './community-event.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { UploadService } from 'src/common/services/upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [CommunityEventController],
  providers: [CommunityEventService, UploadService],
  exports: [CommunityEventService],
})
export class CommunityEventModule {}