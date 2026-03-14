import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageAdapter, StorageType } from './interfaces/storage.interface';
import { LocalStorageAdapter } from './adapters/local-storage.adapter';
import { S3StorageAdapter } from './adapters/s3-storage.adapter';
// import { AzureStorageAdapter } from './adapters/azure-storage.adapter';

@Injectable()
export class StorageFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly localAdapter: LocalStorageAdapter,
    private readonly s3Adapter: S3StorageAdapter,
    // private readonly azureAdapter: AzureStorageAdapter,
  ) {}

  getStorageAdapter(): IStorageAdapter {
    const storageType = this.configService.get<string>('STORAGE_TYPE') || StorageType.LOCAL;

    switch (storageType.toLowerCase()) {
      case StorageType.LOCAL:
        return this.localAdapter;
      
      case StorageType.S3:
        return this.s3Adapter;
      
    //   case StorageType.AZURE:
    //     return this.azureAdapter;
      
      default:
        throw new BadRequestException(`Unsupported storage type: ${storageType}`);
    }
  }
}