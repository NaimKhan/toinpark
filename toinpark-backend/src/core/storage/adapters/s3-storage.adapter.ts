import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { IStorageAdapter } from '../interfaces/storage.interface';
import { MediaDetails } from '../interfaces/media.interface';

@Injectable()
export class S3StorageAdapter implements IStorageAdapter {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET');
    
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(file: Express.Multer.File, filePath: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filePath,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read',
    });

    await this.s3Client.send(command);

    // Return S3 key (not full URL)
    return filePath;
  }

  async delete(filePath: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: filePath,
    });

    await this.s3Client.send(command);
  }

  getUrl(filePath: string): string {
    // Construct S3 URL from key
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${filePath}`;
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: filePath,
      });

      await this.s3Client.send(command);
      return true;
    } catch {
      return false;
    }
  }
  

  async getMediaDetails(filePath: string): Promise<MediaDetails> {
    // Get file metadata from S3
    const headCommand = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: filePath,
    });

    const headResponse = await this.s3Client.send(headCommand);
    
    const filename = filePath.split('/').pop();
    const extension = filename.split('.').pop();

    const mediaDetails: MediaDetails = {
      url: this.getUrl(filePath),
      filename: filename,
      size: headResponse.ContentLength,
      mimeType: headResponse.ContentType,
      extension: extension,
      createdAt: headResponse.LastModified,
    };

    return mediaDetails;
  }

}