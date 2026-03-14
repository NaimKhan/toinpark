/*
  Warnings:

  - You are about to drop the column `is_labeling_bonus_calculated` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "is_labeling_bonus_calculated",
ADD COLUMN     "is_leveling_bonus_calculated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level_name" TEXT;
