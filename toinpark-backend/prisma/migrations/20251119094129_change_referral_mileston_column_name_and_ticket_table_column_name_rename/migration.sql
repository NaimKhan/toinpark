/*
  Warnings:

  - You are about to drop the column `Description` on the `referral_milestones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "referral_milestones" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
