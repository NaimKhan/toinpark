import { randomBytes } from "crypto";

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

/**
 * Remove all whitespace
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s/g, '');
}

/**
 * Generate random string
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mask email address
 */
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  const maskedName = name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  return `${maskedName}@${domain}`;
}

/**
 * Mask email address
 */
export function generateTransactionId(): string {
  const time = Date.now().toString(36).toUpperCase();
  const random = randomBytes(6).toString("base64url").toUpperCase(); // alphanumeric only
  return `${time}${random}`;
}


/**
 * Generate ticket number in format TCK-YYYY-XXXXXX
 * 6-character HEX code derived from UUID
 */
export function generateTicketNo(): string {
  const year = new Date().getFullYear();
  const uuid = crypto.randomUUID();
  const code = uuid.replace(/-/g, '').slice(0, 6).toUpperCase();
  return `TCK-${year}-${code}`;
}