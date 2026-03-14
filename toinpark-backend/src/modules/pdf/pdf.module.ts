import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { UploadService } from 'src/common/services/upload.service';
import { SystemSettingsService } from '../general_settings/system-settings.service';


@Module({
  controllers: [PdfController],
  providers: [UploadService, SystemSettingsService],
  exports: [UploadService],
})
export class PdfModule {}