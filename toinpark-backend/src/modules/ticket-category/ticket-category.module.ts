import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { TicketCategoryController } from './ticket-category.controller';
import { TicketCategoryService } from './ticket-category.service';


@Module({
  imports: [PrismaModule],
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService],
  exports: [TicketCategoryService],
})
export class TicketCategoryModule {}