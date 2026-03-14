/**
 * Common OTP Email Template
 * ==========================
 * A minimal, professional email template for OTP verification.
 * Used for registration, password reset, and other verification flows.
 */

export interface CommonOtpTemplateData {
  otp: string;
  subject: string;
  logoUrl?: string;
  expiresInMinutes?: number;
  body?: string;
  companyName?: string;
}

export const commonOtpTemplate = (data: CommonOtpTemplateData) => {
  const {
    otp,
    subject,
    logoUrl,
    expiresInMinutes,
    body = 'Your otp code',
    companyName = 'TOI Platform',
  } = data;

  const expiryText = expiresInMinutes
    ? `<p style="color: #6b7280; font-size: 13px; margin: 20px 0 0 0;">This code expires in ${expiresInMinutes} minutes.</p>`
    : '';

  const logoSection = logoUrl
    ? `<img src="${logoUrl}" alt="${companyName}" style="max-height: 40px; max-width: 150px;" />`
    : `<span style="font-size: 20px; font-weight: 600; color: #1f2937;">${companyName}</span>`;

  return {
    subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 480px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #e5e7eb;">
              ${logoSection}
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                ${body}:
              </p>
              
              <!-- OTP Code Box -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; text-align: center; margin: 0 0 24px 0;">
                <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #111827; font-family: 'SF Mono', Monaco, 'Courier New', monospace;">
                  ${otp}
                </span>
              </div>
              
              ${expiryText}
              
              <p style="color: #6b7280; font-size: 13px; margin: 20px 0 0 0;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #e5e7eb; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
                © ${new Date().getFullYear()} ${companyName}. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
    text: `
${subject}

${body}:

${otp}

${expiresInMinutes ? `This code expires in ${expiresInMinutes} minutes.` : ''}

If you didn't request this code, you can safely ignore this email.

© ${new Date().getFullYear()} ${companyName}. All rights reserved.
    `.trim(),
  };
};
