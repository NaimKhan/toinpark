/*
  Warnings:

  - The primary key for the `air_drop_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `challenges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `challenges_histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `community_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `countries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `menu_and_permission_setups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `official_announcement_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isSeen` on the `official_announcement_users` table. All the data in the column will be lost.
  - You are about to drop the column `model_id` on the `official_announcement_users` table. All the data in the column will be lost.
  - You are about to drop the column `model_type` on the `official_announcement_users` table. All the data in the column will be lost.
  - The primary key for the `official_announcements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `announcement_category` on the `official_announcements` table. All the data in the column will be lost.
  - You are about to drop the column `email_subject` on the `official_announcements` table. All the data in the column will be lost.
  - You are about to drop the column `send_email` on the `official_announcements` table. All the data in the column will be lost.
  - The primary key for the `referral_commission_histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usd_amount` on the `referral_commission_histories` table. All the data in the column will be lost.
  - The primary key for the `referral_histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `referral_levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `referral_milestones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `request_responses_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `role_wise_menu_and_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `staking_package_plans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `states` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `success_or_error_or_sms_or_email_texts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tutorial_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tutorials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_staking_packages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_toins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `total_referrals` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `general_settings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `audience_model_id` to the `official_announcement_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audience_model_type` to the `official_announcement_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `official_announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audience_type` to the `official_announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_number` to the `referral_commission_histories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AudienceType" AS ENUM ('MEMBER', 'SYSTEM_USER');

-- DropForeignKey
ALTER TABLE "public"."challenges_histories" DROP CONSTRAINT "challenges_histories_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."community_events" DROP CONSTRAINT "community_events_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."menu_and_permission_setups" DROP CONSTRAINT "menu_and_permission_setups_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."official_announcement_users" DROP CONSTRAINT "official_announcement_users_model_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."official_announcement_users" DROP CONSTRAINT "official_announcement_users_official_announcement_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referral_commission_histories" DROP CONSTRAINT "referral_commission_histories_referral_level_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referral_histories" DROP CONSTRAINT "referral_histories_referral_milestone_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referral_histories" DROP CONSTRAINT "referral_histories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."request_responses_logs" DROP CONSTRAINT "request_responses_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_wise_menu_and_permissions" DROP CONSTRAINT "role_wise_menu_and_permissions_menu_and_permission_setup_i_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_wise_menu_and_permissions" DROP CONSTRAINT "role_wise_menu_and_permissions_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_wise_menu_and_permissions" DROP CONSTRAINT "role_wise_menu_and_permissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."states" DROP CONSTRAINT "states_country_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_stake_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tutorial_categories" DROP CONSTRAINT "tutorial_categories_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."tutorials" DROP CONSTRAINT "tutorials_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."tutorials" DROP CONSTRAINT "tutorials_tutorialCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_profiles" DROP CONSTRAINT "user_profiles_country_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_profiles" DROP CONSTRAINT "user_profiles_state_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_profiles" DROP CONSTRAINT "user_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_staking_packages" DROP CONSTRAINT "user_staking_packages_package_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_staking_packages" DROP CONSTRAINT "user_staking_packages_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_toins" DROP CONSTRAINT "user_toins_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_deleted_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_referrer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_updated_by_fkey";

-- DropIndex
DROP INDEX "public"."official_announcement_users_model_id_idx";

-- AlterTable
ALTER TABLE "air_drop_events" DROP CONSTRAINT "air_drop_events_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "air_drop_events_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "air_drop_events_id_seq";

-- AlterTable
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "challenges_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "challenges_id_seq";

-- AlterTable
ALTER TABLE "challenges_histories" DROP CONSTRAINT "challenges_histories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "challenge_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "challenges_histories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "challenges_histories_id_seq";

-- AlterTable
ALTER TABLE "community_events" DROP CONSTRAINT "community_events_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "community_events_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "community_events_id_seq";

-- AlterTable
ALTER TABLE "countries" DROP CONSTRAINT "countries_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "countries_id_seq";

-- AlterTable
ALTER TABLE "menu_and_permission_setups" DROP CONSTRAINT "menu_and_permission_setups_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parent_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "menu_and_permission_setups_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "menu_and_permission_setups_id_seq";

-- AlterTable
ALTER TABLE "official_announcement_users" DROP CONSTRAINT "official_announcement_users_pkey",
DROP COLUMN "isSeen",
DROP COLUMN "model_id",
DROP COLUMN "model_type",
ADD COLUMN     "audience_model_id" TEXT NOT NULL,
ADD COLUMN     "audience_model_type" VARCHAR(100) NOT NULL,
ADD COLUMN     "is_seen" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "official_announcement_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "official_announcement_users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "official_announcement_users_id_seq";

-- AlterTable
ALTER TABLE "official_announcements" DROP CONSTRAINT "official_announcements_pkey",
DROP COLUMN "announcement_category",
DROP COLUMN "email_subject",
DROP COLUMN "send_email",
ADD COLUMN     "category_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "audience_type",
ADD COLUMN     "audience_type" "AudienceType" NOT NULL,
ADD CONSTRAINT "official_announcements_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "official_announcements_id_seq";

-- AlterTable
ALTER TABLE "referral_commission_histories" DROP CONSTRAINT "referral_commission_histories_pkey",
DROP COLUMN "usd_amount",
ADD COLUMN     "level_number" VARCHAR(100) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "referral_level_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "referral_commission_histories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "referral_commission_histories_id_seq";

-- AlterTable
ALTER TABLE "referral_histories" DROP CONSTRAINT "referral_histories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "referral_milestone_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "referral_histories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "referral_histories_id_seq";

-- AlterTable
ALTER TABLE "referral_levels" DROP CONSTRAINT "referral_levels_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "referral_levels_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "referral_levels_id_seq";

-- AlterTable
ALTER TABLE "referral_milestones" DROP CONSTRAINT "referral_milestones_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "referral_milestones_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "referral_milestones_id_seq";

-- AlterTable
ALTER TABLE "request_responses_logs" DROP CONSTRAINT "request_responses_logs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "request_responses_logs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "request_responses_logs_id_seq";

-- AlterTable
ALTER TABLE "role_wise_menu_and_permissions" DROP CONSTRAINT "role_wise_menu_and_permissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "menu_and_permission_setup_id" SET DATA TYPE TEXT,
ALTER COLUMN "role_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "role_wise_menu_and_permissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "role_wise_menu_and_permissions_id_seq";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "roles_id_seq";

-- AlterTable
ALTER TABLE "settings" DROP CONSTRAINT "settings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "settings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "settings_id_seq";

-- AlterTable
ALTER TABLE "staking_package_plans" DROP CONSTRAINT "staking_package_plans_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "staking_package_plans_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "staking_package_plans_id_seq";

-- AlterTable
ALTER TABLE "states" DROP CONSTRAINT "states_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "country_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "states_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "states_id_seq";

-- AlterTable
ALTER TABLE "success_or_error_or_sms_or_email_texts" DROP CONSTRAINT "success_or_error_or_sms_or_email_texts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "success_or_error_or_sms_or_email_texts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "success_or_error_or_sms_or_email_texts_id_seq";

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "stake_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "transactions_id_seq";

-- AlterTable
ALTER TABLE "tutorial_categories" DROP CONSTRAINT "tutorial_categories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "tutorial_categories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tutorial_categories_id_seq";

-- AlterTable
ALTER TABLE "tutorials" DROP CONSTRAINT "tutorials_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ALTER COLUMN "tutorialCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tutorials_id_seq";

-- AlterTable
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "state_id" SET DATA TYPE TEXT,
ALTER COLUMN "country_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_profiles_id_seq";

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "role_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- AlterTable
ALTER TABLE "user_staking_packages" DROP CONSTRAINT "user_staking_packages_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "package_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_staking_packages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_staking_packages_id_seq";

-- AlterTable
ALTER TABLE "user_toins" DROP CONSTRAINT "user_toins_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_toins_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_toins_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "total_referrals",
ADD COLUMN     "total_referred" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "referrer_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_by" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- DropTable
DROP TABLE "public"."general_settings";

-- CreateTable
CREATE TABLE "announcement_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "announcement_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_key_key" ON "system_settings"("key");

-- CreateIndex
CREATE INDEX "official_announcement_users_audience_model_id_idx" ON "official_announcement_users"("audience_model_id");

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_toins" ADD CONSTRAINT "user_toins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_and_permission_setups" ADD CONSTRAINT "menu_and_permission_setups_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu_and_permission_setups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_wise_menu_and_permissions" ADD CONSTRAINT "role_wise_menu_and_permissions_menu_and_permission_setup_i_fkey" FOREIGN KEY ("menu_and_permission_setup_id") REFERENCES "menu_and_permission_setups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_wise_menu_and_permissions" ADD CONSTRAINT "role_wise_menu_and_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_wise_menu_and_permissions" ADD CONSTRAINT "role_wise_menu_and_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_responses_logs" ADD CONSTRAINT "request_responses_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_announcements" ADD CONSTRAINT "official_announcements_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "announcement_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_announcement_users" ADD CONSTRAINT "official_announcement_users_official_announcement_id_fkey" FOREIGN KEY ("official_announcement_id") REFERENCES "official_announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_announcement_users" ADD CONSTRAINT "official_announcement_users_audience_model_id_fkey" FOREIGN KEY ("audience_model_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorial_categories" ADD CONSTRAINT "tutorial_categories_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_tutorialCategoryId_fkey" FOREIGN KEY ("tutorialCategoryId") REFERENCES "tutorial_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_events" ADD CONSTRAINT "community_events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_staking_packages" ADD CONSTRAINT "user_staking_packages_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "staking_package_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_staking_packages" ADD CONSTRAINT "user_staking_packages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_stake_id_fkey" FOREIGN KEY ("stake_id") REFERENCES "user_staking_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_histories" ADD CONSTRAINT "referral_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_histories" ADD CONSTRAINT "referral_histories_referral_milestone_id_fkey" FOREIGN KEY ("referral_milestone_id") REFERENCES "referral_milestones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges_histories" ADD CONSTRAINT "challenges_histories_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_commission_histories" ADD CONSTRAINT "referral_commission_histories_referral_level_id_fkey" FOREIGN KEY ("referral_level_id") REFERENCES "referral_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
