/*
  Warnings:

  - You are about to drop the column `description` on the `referral_milestones` table. All the data in the column will be lost.
  - You are about to drop the `official_announcement_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "official_announcement_users" DROP CONSTRAINT "official_announcement_users_audience_model_id_fkey";

-- DropForeignKey
ALTER TABLE "official_announcement_users" DROP CONSTRAINT "official_announcement_users_official_announcement_id_fkey";

-- AlterTable
ALTER TABLE "referral_milestones" DROP COLUMN "description",
ADD COLUMN     "Description" TEXT;

-- DropTable
DROP TABLE "official_announcement_users";
