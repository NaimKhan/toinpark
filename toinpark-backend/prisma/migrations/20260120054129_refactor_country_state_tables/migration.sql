-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionStatus" ADD VALUE 'WAITING';
ALTER TYPE "TransactionStatus" ADD VALUE 'CONFIRMING';
ALTER TYPE "TransactionStatus" ADD VALUE 'CONFIRMED';
ALTER TYPE "TransactionStatus" ADD VALUE 'SENDING';
ALTER TYPE "TransactionStatus" ADD VALUE 'PARTIALLY_PAID';
ALTER TYPE "TransactionStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "phone_code" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "currency_code" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "states" ALTER COLUMN "code" SET DATA TYPE VARCHAR(20);
