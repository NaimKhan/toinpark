import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import * as fs from 'fs';
import * as path from 'path';
import { MediaDto } from 'src/core/storage/dto/media.dto';
import { MediaDetails } from 'src/core/storage/interfaces/media.interface';
import { IStorageAdapter } from 'src/core/storage/interfaces/storage.interface';
import { StorageFactory } from 'src/core/storage/storage.factory';
import { promisify } from 'util';

export enum UploadFolder {
  EVENTS = 'events',
  PROFILE_IMAGES = 'profile-images',
  THUMBNAILS = 'thumbnails',
  VIDEOS = 'videos',
  PDFS = 'pdfs',
  SETTINGS = 'settings',
}


@Injectable()
export class UploadService {

  private readonly storage: IStorageAdapter;
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly storageFactory: StorageFactory,
  ) {
    this.storage = this.storageFactory.getStorageAdapter();
  }


  /**
   * Generate unique filename using timestamp and random string
   * @param originalName Original filename
   * @returns Unique filename
   */
  private generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = path.extname(originalName);
    return `${timestamp}-${randomString}${fileExtension}`;
  }

  /**
   * Upload image
   * @returns Relative file path (not full URL)
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.EVENTS}/${filename}`;

    return await this.storage.upload(file, filePath);
  }

  /**
   * Upload profile image
   * @returns Relative file path (not full URL)
   */
  async uploadProfileImage(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.PROFILE_IMAGES}/${filename}`;

    return await this.storage.upload(file, filePath);
  }


  /**
   * Upload thumbnail
   * @returns Relative file path (not full URL)
   */
  async uploadThumbnail(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.THUMBNAILS}/${filename}`;

    return await this.storage.upload(file, filePath);
  }

  /**
   * Upload video
   * @returns Relative file path (not full URL)
   */
  async uploadVideo(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.VIDEOS}/${filename}`;

    return await this.storage.upload(file, filePath);
  }


  /**
   * Upload PDF
   * @returns Relative file path (not full URL)
   */
  async uploadPdf(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.PDFS}/${filename}`;

    return await this.storage.upload(file, filePath);
  }

  /**
   * Upload favicon
   * @returns Relative file path (not full URL)
   */
  async uploadFavicon(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.SETTINGS}/favicon/${filename}`;

    return await this.storage.upload(file, filePath);
  }

  /**
   * Upload logo
   * @returns Relative file path (not full URL)
   */
  async uploadLogo(file: Express.Multer.File): Promise<string> {
    const filename = this.generateUniqueFilename(file.originalname);
    const filePath = `${UploadFolder.SETTINGS}/logo/${filename}`;

    return await this.storage.upload(file, filePath);
  }


  /**
   * Delete any file by path
   */
  async deleteFile(filePath: string): Promise<void> {
    if (!filePath) return;
    await this.storage.delete(filePath);
  }

  /**
   * 
   * @param filePath 
   * @returns MediaDto
   */
  async getMediaDetails(filePath: string): Promise<MediaDto | null> {

    if (filePath === null) {
      return null;
    }

    if (!await this.fileExists(filePath)) {
      this.logger.warn(`File not found: ${filePath}`);
      return null;
    }

    return plainToInstance(MediaDto, await this.storage.getMediaDetails(filePath), {
      excludeExtraneousValues: true
    });

  }


  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    return await this.storage.exists(filePath);
  }

  getCurrentPdfPath(): string | null {
    const pdfDir = UploadFolder.PDFS;
    const files = fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf'));

    if (files.length === 0) return null;

    const filePath = `${UploadFolder.PDFS}/${files[0]}`;

    return this.storage.getUrl(filePath); // first and only file
  }


}