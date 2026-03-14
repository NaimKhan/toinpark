/*
  Warnings:

  - You are about to drop the column `email` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user_profiles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_profiles_email_idx";

-- DropIndex
DROP INDEX "user_profiles_phone_number_idx";

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "email",
DROP COLUMN "phone_number";
