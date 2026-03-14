/*
  Warnings:

  - You are about to drop the column `referral_bonus` on the `referral_histories` table. All the data in the column will be lost.
  - You are about to drop the column `referral_commission` on the `referral_histories` table. All the data in the column will be lost.
  - You are about to drop the column `toin_amount` on the `referral_histories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "referral_histories" DROP COLUMN "referral_bonus",
DROP COLUMN "referral_commission",
DROP COLUMN "toin_amount",
ADD COLUMN     "referral_user_id" TEXT,
ALTER COLUMN "referral_code" DROP NOT NULL;
