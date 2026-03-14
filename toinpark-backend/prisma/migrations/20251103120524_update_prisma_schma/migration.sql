/*
  Warnings:

  - You are about to drop the column `toi_account_number` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `toi_account_number` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[toin_account_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `toin_account_number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."user_profiles_email_key";

-- DropIndex
DROP INDEX "public"."user_profiles_phone_number_key";

-- DropIndex
DROP INDEX "public"."user_profiles_toi_account_number_idx";

-- DropIndex
DROP INDEX "public"."user_profiles_toi_account_number_key";

-- DropIndex
DROP INDEX "public"."user_profiles_username_idx";

-- DropIndex
DROP INDEX "public"."user_profiles_username_key";

-- DropIndex
DROP INDEX "public"."users_toi_account_number_idx";

-- DropIndex
DROP INDEX "public"."users_toi_account_number_key";

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "toi_account_number",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "user_toins" ALTER COLUMN "created_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "toi_account_number",
ADD COLUMN     "toin_account_number" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE INDEX "user_profiles_user_id_idx" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_toin_account_number_key" ON "users"("toin_account_number");

-- CreateIndex
CREATE INDEX "users_toin_account_number_idx" ON "users"("toin_account_number");
