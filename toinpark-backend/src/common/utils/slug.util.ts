/**
 * Generate URL-friendly slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate unique slug with timestamp
 */
export function generateUniqueSlug(text: string): string {
  const slug = generateSlug(text);
  const timestamp = Date.now();
  return `${slug}-${timestamp}`;
}