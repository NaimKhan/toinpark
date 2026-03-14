/*
  Warnings:

  - You are about to drop the column `total_Challenge_bonus` on the `user_toins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_toins" DROP COLUMN "total_Challenge_bonus",
ADD COLUMN     "total_challenge_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000;
