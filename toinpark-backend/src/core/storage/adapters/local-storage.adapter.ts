import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageAdapter } from '../interfaces/storage.interface';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { MediaDetails } from '../interfaces/media.interface';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

@Injectable()
export class LocalStorageAdapter implements IStorageAdapter {
  private readonly basePath: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.basePath = this.configService.get<string>('STORAGE_LOCAL_PATH') || '/uploads';
    this.baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
  }

  async upload(file: Express.Multer.File, filePath: string): Promise<string> {
    const fullPath = path.join(this.basePath, filePath);
    const directory = path.dirname(fullPath);

    // Ensure directory exists
    await mkdir(directory, { recursive: true });

    // Write file
    await writeFile(fullPath, file.buffer);

    // Return relative path (not full URL)
    return filePath;
  }

  async delete(filePath: string): Promise<void> {
    const fullPath = path.join(this.basePath, filePath);
    
    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
    }
  }

  getUrl(filePath: string): string {
    // Construct full URL from relative path
    return `${this.baseUrl}/${this.basePath}/${filePath}`;
  }

  async exists(filePath: string): Promise<boolean> {
    const fullPath = path.join(this.basePath, filePath);
    return fs.existsSync(fullPath);
  }

  async getMediaDetails(filePath: string): Promise<MediaDetails> {
    const fullPath = path.join(this.basePath, filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const stats = await stat(fullPath);
    const filename = path.basename(filePath);
    const extension = path.extname(filename).substring(1);
    
    // Get MIME type from extension
    const mimeType = this.getMimeType(extension);

    const mediaDetails: MediaDetails = {
      url: this.getUrl(filePath),
      filename: filename,
      size: stats.size,
      mimeType: mimeType,
      extension: extension,
      createdAt: stats.birthtime,
    };

    return mediaDetails;
  }

  private getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      // Images
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
      
      // Videos
      mp4: 'video/mp4',
      webm: 'video/webm',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
      mkv: 'video/x-matroska',
      
      // Documents
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      
    };

    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
  }

}