import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/core/prisma/prisma.module';
import { SubAdminController } from './sub-admin.controller';
import { SubAdminService } from './sub-admin.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubAdminController],
  providers: [SubAdminService],
  exports: [SubAdminService],
})
export class SubAdminModule {}