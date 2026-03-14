/*
  Warnings:

  - You are about to drop the column `event_type` on the `community_events` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `community_events` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `menu_and_permission_setups` table. All the data in the column will be lost.
  - The `created_by` column on the `menu_and_permission_setups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `menu_and_permission_setups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `menu_and_permission_setups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_seen` on the `official_announcement_users` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `official_announcements` table. All the data in the column will be lost.
  - The `created_by` column on the `official_announcements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `official_announcements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `official_announcements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_deleted` on the `request_responses_log` table. All the data in the column will be lost.
  - The `created_by` column on the `request_responses_log` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `request_responses_log` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `request_responses_log` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_deleted` on the `role_wise_menu_and_permissions` table. All the data in the column will be lost.
  - The `created_by` column on the `role_wise_menu_and_permissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `role_wise_menu_and_permissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `role_wise_menu_and_permissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_deleted` on the `roles` table. All the data in the column will be lost.
  - The `created_by` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_deleted` on the `success_or_error_or_sms_or_email_text` table. All the data in the column will be lost.
  - The `created_by` column on the `success_or_error_or_sms_or_email_text` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `success_or_error_or_sms_or_email_text` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `success_or_error_or_sms_or_email_text` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `file_path` on the `tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `source_link` on the `tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `tutorial_category_id` on the `tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `address_line1` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address_line2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `country_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `users` table. All the data in the column will be lost.
  - Made the column `created_at` on table `menu_and_permission_setups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `official_announcements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `request_responses_log` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `role_wise_menu_and_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `success_or_error_or_sms_or_email_text` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tutorialCategoryId` to the `tutorials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('STAKE', 'PROFIT', 'WITHDRAWAL', 'REFUND', 'BONUS');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."tutorials" DROP CONSTRAINT "tutorials_tutorial_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_country_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_state_id_fkey";

-- AlterTable
ALTER TABLE "community_events" DROP COLUMN "event_type",
DROP COLUMN "is_featured",
ADD COLUMN     "eventType" VARCHAR(50),
ADD COLUMN     "event_location" VARCHAR(500),
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "created_by" BIGINT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" BIGINT,
ADD COLUMN     "updated_by" BIGINT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "menu_and_permission_setups" DROP COLUMN "is_deleted",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" BIGINT,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" BIGINT,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" BIGINT;

-- AlterTable
ALTER TABLE "official_announcement_users" DROP COLUMN "is_seen",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" BIGINT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" BIGINT,
ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" BIGINT;

-- AlterTable
ALTER TABLE "official_announcements" DROP COLUMN "is_deleted",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" BIGINT,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" BIGINT,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" BIGINT;

-- AlterTable
ALTER TABLE "request_responses_log" DROP COLUMN "is_deleted",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" BIGINT,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" BIGINT,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" BIGINT;

-- AlterTable
ALTER TABLE "role_wise_menu_and_permissions" DROP COLUMN "is_deleted",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" BIGINT,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" BIGINT,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" BIGINT;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "is_deleted",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" BIGINT,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" BIGINT,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" BIGINT;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "created_by" BIGINT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" BIGINT,
ADD COLUMN     "updated_by" BIGINT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "success_or_error_or_sms_or_email_text" DROP COLUMN "is_deleted",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" BIGINT,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" BIGINT,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" BIGINT;

-- AlterTable
ALTER TABLE "tutorials" DROP COLUMN "file_path",
DROP COLUMN "is_featured",
DROP COLUMN "source_link",
DROP COLUMN "tutorial_category_id",
ADD COLUMN     "filePath" VARCHAR(500),
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sourceLink" VARCHAR(500),
ADD COLUMN     "tutorialCategoryId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address_line1",
DROP COLUMN "address_line2",
DROP COLUMN "bio",
DROP COLUMN "city",
DROP COLUMN "country_id",
DROP COLUMN "date_of_birth",
DROP COLUMN "gender",
DROP COLUMN "profile_image_url",
DROP COLUMN "state_id",
DROP COLUMN "zip_code";

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" BIGSERIAL NOT NULL,
    "phone_number" VARCHAR(20),
    "email" VARCHAR(255),
    "username" VARCHAR(50) NOT NULL,
    "toi_account_number" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "date_of_birth" DATE,
    "gender" VARCHAR(20),
    "profile_image_url" VARCHAR(500),
    "bio" TEXT,
    "address_line1" VARCHAR(255),
    "address_line2" VARCHAR(255),
    "city" VARCHAR(100),
    "state_id" BIGINT,
    "country_id" BIGINT,
    "zip_code" VARCHAR(20),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(6),
    "deleted_by" BIGINT,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staking_package_plan" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "min_amount" DECIMAL(18,2) NOT NULL,
    "max_amount" DECIMAL(18,2) NOT NULL,
    "daily_profit_percent" DECIMAL(5,2) NOT NULL,
    "profit_days_per_week" INTEGER NOT NULL,
    "bonus_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "staking_package_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stakeing_package" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "package_id" BIGINT NOT NULL,
    "toin_amount" DECIMAL(18,2) NOT NULL,
    "usd_amount" DECIMAL(18,2) NOT NULL,
    "usd_conversion_rate" DECIMAL(18,6) NOT NULL,
    "bonus_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "daily_profit_percent" DECIMAL(5,2) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "total_profit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "user_stakeing_package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" BIGSERIAL NOT NULL,
    "transaction_auto_id" VARCHAR(100) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "stake_id" BIGINT,
    "type" "TransactionType" NOT NULL DEFAULT 'STAKE',
    "toin_amount" DECIMAL(18,2) NOT NULL,
    "usd_amount" DECIMAL(18,2) NOT NULL,
    "usd_conversion_rate" DECIMAL(18,6) NOT NULL,
    "trx_initiat_datetime" TIMESTAMP(3),
    "trx_success_datetime" TIMESTAMP(3),
    "trx_payment_gateway" VARCHAR(100),
    "trx_payment_reference_id" VARCHAR(150),
    "trxStatus" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "trxNote" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "air_drop_event" (
    "id" BIGSERIAL NOT NULL,
    "event_name" VARCHAR(100) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "used_amount" DECIMAL(18,2) NOT NULL,
    "usd_conversion_rate" DECIMAL(18,6) NOT NULL,
    "event_start_date" TIMESTAMP(3) NOT NULL,
    "event_end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "air_drop_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referal_milestone" (
    "id" BIGSERIAL NOT NULL,
    "referal_name" VARCHAR(100) NOT NULL,
    "toin_amount" INTEGER NOT NULL DEFAULT 0,
    "terget_person" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referal_milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referal_history" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "referal_milestone_id" BIGINT NOT NULL,
    "referal_code" VARCHAR(20) NOT NULL,
    "toin_amount" INTEGER NOT NULL DEFAULT 0,
    "referal_commission" DECIMAL(18,2) NOT NULL,
    "referal_bonus" DECIMAL(18,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referal_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challanges" (
    "id" BIGSERIAL NOT NULL,
    "challange_title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "reward_toin_amount" DECIMAL(18,2) NOT NULL,
    "post_details" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "challanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challanges_history" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "challange_id" BIGINT NOT NULL,
    "challange_status" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "challanges_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referance_level" (
    "id" BIGSERIAL NOT NULL,
    "level_name" VARCHAR(100) NOT NULL,
    "referance_bonuce_persentage" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referance_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referance_commission_history" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "referance_level_id" BIGINT NOT NULL,
    "level_name" VARCHAR(100) NOT NULL,
    "toin_amount" DECIMAL(18,2) NOT NULL,
    "usd_amount" DECIMAL(18,2) NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referance_commission_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" BIGSERIAL NOT NULL,
    "key_name" VARCHAR(100) NOT NULL,
    "value" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_phone_number_key" ON "user_profiles"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_username_key" ON "user_profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_toi_account_number_key" ON "user_profiles"("toi_account_number");

-- CreateIndex
CREATE INDEX "user_profiles_email_idx" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_phone_number_idx" ON "user_profiles"("phone_number");

-- CreateIndex
CREATE INDEX "user_profiles_username_idx" ON "user_profiles"("username");

-- CreateIndex
CREATE INDEX "user_profiles_toi_account_number_idx" ON "user_profiles"("toi_account_number");

-- CreateIndex
CREATE INDEX "user_profiles_created_at_idx" ON "user_profiles"("created_at");

-- CreateIndex
CREATE INDEX "user_profiles_deleted_at_idx" ON "user_profiles"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transaction_auto_id_key" ON "transaction"("transaction_auto_id");

-- CreateIndex
CREATE UNIQUE INDEX "air_drop_event_event_name_key" ON "air_drop_event"("event_name");

-- CreateIndex
CREATE UNIQUE INDEX "referal_milestone_referal_name_key" ON "referal_milestone"("referal_name");

-- CreateIndex
CREATE UNIQUE INDEX "referance_level_level_name_key" ON "referance_level"("level_name");

-- CreateIndex
CREATE INDEX "official_announcement_users_official_announcement_id_idx" ON "official_announcement_users"("official_announcement_id");

-- CreateIndex
CREATE INDEX "official_announcement_users_model_id_idx" ON "official_announcement_users"("model_id");

-- CreateIndex
CREATE INDEX "role_wise_menu_and_permissions_menu_and_permission_setup_id_idx" ON "role_wise_menu_and_permissions"("menu_and_permission_setup_id");

-- CreateIndex
CREATE INDEX "role_wise_menu_and_permissions_role_id_idx" ON "role_wise_menu_and_permissions"("role_id");

-- CreateIndex
CREATE INDEX "role_wise_menu_and_permissions_user_id_idx" ON "role_wise_menu_and_permissions"("user_id");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_tutorialCategoryId_fkey" FOREIGN KEY ("tutorialCategoryId") REFERENCES "tutorial_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stakeing_package" ADD CONSTRAINT "user_stakeing_package_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "staking_package_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stakeing_package" ADD CONSTRAINT "user_stakeing_package_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_stake_id_fkey" FOREIGN KEY ("stake_id") REFERENCES "user_stakeing_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referal_history" ADD CONSTRAINT "referal_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referal_history" ADD CONSTRAINT "referal_history_referal_milestone_id_fkey" FOREIGN KEY ("referal_milestone_id") REFERENCES "referal_milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challanges_history" ADD CONSTRAINT "challanges_history_challange_id_fkey" FOREIGN KEY ("challange_id") REFERENCES "challanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referance_commission_history" ADD CONSTRAINT "referance_commission_history_referance_level_id_fkey" FOREIGN KEY ("referance_level_id") REFERENCES "referance_level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
