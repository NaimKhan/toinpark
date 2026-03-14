import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageFactory } from './storage.factory';
import { LocalStorageAdapter } from './adapters/local-storage.adapter';
import { S3StorageAdapter } from './adapters/s3-storage.adapter';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    LocalStorageAdapter,
    S3StorageAdapter,
    StorageFactory,
  ],
  exports: [StorageFactory],
})
export class StorageModule {}