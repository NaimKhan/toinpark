/**
 * Mail Service Usage Examples
 * ============================
 * This file shows how to use the MailService in your application.
 *
 * IMPORTANT: This is for reference only. Copy the patterns to your actual services.
 */

import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';

// ============================================================
// Example 1: Using in a User Registration Service
// ============================================================
@Injectable()
export class UserRegistrationExample {
  constructor(private readonly mailService: MailService) {}

  async registerUser(email: string, name: string, _password: string) {
    // ... create user in database using _password

    // Send welcome email
    const result = await this.mailService.sendWelcomeEmail(
      email,
      name,
      'https://app.toiplatform.com/login',
    );

    if (!result.success) {
      console.error('Failed to send welcome email:', result.error);
      // Don't fail registration, just log the error
    }

    return { message: 'User registered successfully' };
  }
}

// ============================================================
// Example: OTP/2FA Authentication
// ============================================================
@Injectable()
export class TwoFactorAuthExample {
  constructor(private readonly mailService: MailService) {}

  async sendLoginOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    // Store OTP in cache/database with expiry
    // await this.cacheService.set(`otp:${email}`, otp, 600); // 10 min TTL

    const result = await this.mailService.sendOtpEmail(
      email,
      otp,
      'Login Verification Code', // subject
      'login verification',      // purpose
      10,                         // expiresInMinutes
    );

    return { success: result.success };
  }
}



// ============================================================
// Example: Bulk Email (Newsletters, Announcements)
// ============================================================
@Injectable()
export class BulkEmailExample {
  constructor(private readonly mailService: MailService) {}

  async sendAnnouncement(
    recipients: string[],
    subject: string,
    content: string,
  ) {
    const messages = recipients.map((email) => ({
      to: email,
      subject,
      html: content,
      tags: ['announcement', 'bulk'],
    }));

    const result = await this.mailService.sendBulk({
      messages,
      batchSize: 100, // Process 100 emails per batch
    });

    console.log(`Sent: ${result.sent}, Failed: ${result.failed}`);
    return result;
  }
}

// ============================================================
// Example: Using SendGrid Dynamic Templates
// ============================================================
@Injectable()
export class SendGridTemplateExample {
  constructor(private readonly mailService: MailService) {}

  async sendUsingTemplate() {
    // Use a template created in SendGrid's Template Editor
    await this.mailService.sendTemplate(
      'user@example.com',
      'd-xxxxxxxxxxxxxxxxxxxxxxxx', // SendGrid template ID
      {
        // Dynamic template data
        user_name: 'John Doe',
        order_id: '12345',
        order_total: '$99.99',
        order_items: [
          { name: 'Product 1', price: '$49.99' },
          { name: 'Product 2', price: '$50.00' },
        ],
      },
      {
        subject: 'Your Order Confirmation',
        tags: ['order', 'confirmation'],
      },
    );
  }
}
