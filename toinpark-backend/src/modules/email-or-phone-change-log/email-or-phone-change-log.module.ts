import { Module } from '@nestjs/common';
import { EmailOrPhoneChangeLogController } from './email-or-phone-change-log.controller';
import { EmailOrPhoneChangeLogService } from './email-or-phone-change-log.service';

@Module({
  controllers: [EmailOrPhoneChangeLogController],
  providers: [EmailOrPhoneChangeLogService]
})
export class EmailOrPhoneChangeLogModule {}
