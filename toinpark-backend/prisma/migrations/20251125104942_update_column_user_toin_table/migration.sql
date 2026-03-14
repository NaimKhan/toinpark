/*
  Warnings:

  - You are about to drop the column `total_earnings` on the `user_toins` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionType" ADD VALUE 'ENTRY_BONUS';
ALTER TYPE "TransactionType" ADD VALUE 'CHALLENGE_BONUS';
ALTER TYPE "TransactionType" ADD VALUE 'LEVELING_BONUS';
ALTER TYPE "TransactionType" ADD VALUE 'SOCIAL_REFERRAL';
ALTER TYPE "TransactionType" ADD VALUE 'CLAIM_BONUS';

-- AlterTable
ALTER TABLE "user_toins" DROP COLUMN "total_earnings",
ADD COLUMN     "total_Challenge_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_Leveling_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_claim_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_entry_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_refund" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_void" DECIMAL(18,4) NOT NULL DEFAULT 0.0000;
