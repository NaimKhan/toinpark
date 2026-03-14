/*
  Warnings:

  - A unique constraint covering the columns `[sequence_number]` on the table `referral_milestones` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "referral_milestones" ADD COLUMN     "sequence_number" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "referral_milestones_sequence_number_key" ON "referral_milestones"("sequence_number");
