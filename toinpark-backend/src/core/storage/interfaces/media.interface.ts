export interface MediaDetails {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  extension: string;
  createdAt?: Date;
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  AUDIO = 'audio',
  OTHER = 'other',
}