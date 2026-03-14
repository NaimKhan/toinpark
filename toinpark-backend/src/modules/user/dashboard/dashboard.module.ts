import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PaginationService } from 'src/common/services/paginationService';
import { UploadService } from 'src/common/services/upload.service';
import { AdminDashboardService } from './admin-dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, AdminDashboardService, PaginationService, UploadService],
  exports: [DashboardService, AdminDashboardService],
})
export class DashboardModule { }
