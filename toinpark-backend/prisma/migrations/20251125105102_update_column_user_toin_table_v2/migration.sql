/*
  Warnings:

  - You are about to drop the column `total_Leveling_bonus` on the `user_toins` table. All the data in the column will be lost.
  - You are about to drop the column `total_referral_by_leveling` on the `user_toins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_toins" DROP COLUMN "total_Leveling_bonus",
DROP COLUMN "total_referral_by_leveling",
ADD COLUMN     "total_leveling_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000;
