import { Module } from '@nestjs/common';
import { TutorialCategoryService } from './tutorial-category.service';
import { TutorialCategoryController } from './tutorial-category.controller';
import { PrismaModule } from '../../../core/prisma/prisma.module';
import { PaginationService } from 'src/common/services/paginationService';

@Module({
  imports: [PrismaModule],
  controllers: [TutorialCategoryController],
  providers: [TutorialCategoryService, PaginationService],
  exports: [TutorialCategoryService],
})
export class TutorialCategoryModule {}
