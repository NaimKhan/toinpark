import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = crypto
    .createHash('sha256')
    .update("SanjibDhar@123#123")
    .digest(); // 32 bytes

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16); // Initialization Vector
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(encryptedText: string): string {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  maskValue(value: string, type: 'email' | 'phone'): string {
    if (!value) return value;

    // If value is too short, handle safely
    if (value.length <= 6) {
      // show first 1 and last 1, mask the rest
      const first = value.slice(0, 1);
      const last = value.slice(-1);
      return first + '*'.repeat(Math.max(0, value.length - 2)) + last;
    }
    if (type === 'email') {
      const first = value.slice(0, 1);
      const lastDotIndex = value.lastIndexOf('.');
      const extension =
        lastDotIndex !== -1 ? value.slice(lastDotIndex) : '';
      // First 2 chars visible (or fewer if short)
      const visible = value.slice(0, 2);
      // Middle masked
      const maskedCount = Math.max(0, value.length - visible.length - extension.length);
      const stars = '*'.repeat(maskedCount);
      return `${visible}${stars}${extension}`;
    }

    if (type === 'phone') {
      const lastTwo = value.slice(-2);
      const stars = '*'.repeat(value.length - 6);
      return `${stars}${lastTwo}`;
    }
  }




}