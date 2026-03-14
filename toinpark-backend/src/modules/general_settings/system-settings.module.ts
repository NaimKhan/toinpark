import { Module } from '@nestjs/common';
import { SystemSettingsController } from './system-settings.controller';
import { SystemSettingsService } from './system-settings.service';
import { UploadService } from 'src/common/services/upload.service';

@Module({
  controllers: [SystemSettingsController],
  providers: [SystemSettingsService, UploadService],
  exports: [SystemSettingsService]
})
export class SystemSettingsModule {}
