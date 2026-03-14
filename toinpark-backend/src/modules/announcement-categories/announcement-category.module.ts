import { Module } from '@nestjs/common';
import { AnnouncementCategoryService } from './announcement-category.service';
import { AnnouncementCategoryController } from './announcement-category.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnnouncementCategoryController],
  providers: [AnnouncementCategoryService],
  exports: [AnnouncementCategoryService],
})
export class AnnouncementCategoryModule {}

