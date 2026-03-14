import { MediaDetails } from "./media.interface";

export interface IStorageAdapter {
  upload(file: Express.Multer.File, path: string): Promise<string>;
  delete(path: string): Promise<void>;
  getUrl(path: string): string;
  exists(path: string): Promise<boolean>;
  getMediaDetails(path: string): Promise<MediaDetails>; // New method
}

export enum StorageType {
  LOCAL = 'local',
  S3 = 's3',
  AZURE = 'azure',
}