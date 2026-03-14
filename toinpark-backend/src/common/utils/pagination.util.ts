import { PaginationMeta } from '../dto/pagination.dto';

/**
 * Calculate pagination metadata
 */
export function calculatePagination(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

/**
 * Calculate skip value for Prisma
 */
export function calculateSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}