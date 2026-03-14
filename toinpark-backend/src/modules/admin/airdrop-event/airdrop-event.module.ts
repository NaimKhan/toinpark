import { Module } from '@nestjs/common';
import { AirdropEventController } from './airdrop-event.controller';
import { AirDropEventService } from './airdrop-event.service';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { PaginationService } from 'src/common/services/paginationService';

@Module({
  controllers: [AirdropEventController],
  providers: [AirDropEventService, PrismaService, PaginationService],
  exports: [AirDropEventService],
})
export class AirDropEventModule {}