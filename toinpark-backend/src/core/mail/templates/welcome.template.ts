/**
 * Welcome Email Template
 * =======================
 * Sent to new users after registration.
 */

export interface WelcomeTemplateData {
  recipientName: string;
  recipientEmail: string;
  loginUrl?: string;
}

export const welcomeTemplate = (data: WelcomeTemplateData) => ({
  subject: 'Welcome to TOI Platform!',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to TOI Platform</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; text-align: center;">Welcome to TOI Platform!</h1>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Hello <strong>${data.recipientName}</strong>,</p>
        <p>Thank you for joining TOI Platform! We're excited to have you on board.</p>
        <p>Your account has been successfully created with the email: <strong>${data.recipientEmail}</strong></p>
        ${
          data.loginUrl
            ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.loginUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Login to Your Account</a>
        </div>
        `
            : ''
        }
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The TOI Platform Team</p>
      </div>
      <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
        <p>© ${new Date().getFullYear()} TOI Platform. All rights reserved.</p>
      </div>
    </body>
    </html>
  `,
  text: `
Welcome to TOI Platform!

Hello ${data.recipientName},

Thank you for joining TOI Platform! We're excited to have you on board.

Your account has been successfully created with the email: ${data.recipientEmail}

${data.loginUrl ? `Login to your account: ${data.loginUrl}` : ''}

If you have any questions, feel free to reach out to our support team.

Best regards,
The TOI Platform Team
  `.trim(),
  tags: ['welcome', 'onboarding'],
});
