/*
  Warnings:

  - You are about to drop the column `referral_bounce_percentage` on the `referral_levels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "referral_levels" DROP COLUMN "referral_bounce_percentage",
ADD COLUMN     "referral_bonus_percentage" INTEGER NOT NULL DEFAULT 0;
