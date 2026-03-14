/*
  Warnings:

  - You are about to drop the column `total_reward` on the `user_toins` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'COMMISSION_BONUS';

-- AlterTable
ALTER TABLE "user_toins" DROP COLUMN "total_reward",
ADD COLUMN     "total_commission_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000;
