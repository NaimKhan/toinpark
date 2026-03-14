import { Prisma } from '@prisma/client';

/**
 * Converts any value safely to Prisma.Decimal
 */
export function toDecimal(value: any): Prisma.Decimal {
  if (value === null || value === undefined || value === '') {
    return new Prisma.Decimal(0);
  }

  if (value instanceof Prisma.Decimal) {
    return value;
  }

  return new Prisma.Decimal(value.toString());
}
