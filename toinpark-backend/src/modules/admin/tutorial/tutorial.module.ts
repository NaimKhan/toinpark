import { Module } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { TutorialController } from './tutorial.controller';
import { PrismaModule } from '../../../core/prisma/prisma.module';
import { UploadService } from 'src/common/services/upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [TutorialController],
  providers: [TutorialService, UploadService],
  exports: [TutorialService, UploadService],
})
export class TutorialModule {}
