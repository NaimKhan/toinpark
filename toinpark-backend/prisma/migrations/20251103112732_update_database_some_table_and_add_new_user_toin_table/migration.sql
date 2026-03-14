/*
  Warnings:

  - You are about to drop the column `trx_initiat_datetime` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `total_earnings` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `total_withdrawals` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_balance` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `challanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `challanges_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referal_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referal_milestones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referance_commission_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referance_levels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_stakeing_packages` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."challanges_histories" DROP CONSTRAINT "challanges_histories_challange_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referal_histories" DROP CONSTRAINT "referal_histories_referal_milestone_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referal_histories" DROP CONSTRAINT "referal_histories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referance_commission_histories" DROP CONSTRAINT "referance_commission_histories_referance_level_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_stake_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_stakeing_packages" DROP CONSTRAINT "user_stakeing_packages_package_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_stakeing_packages" DROP CONSTRAINT "user_stakeing_packages_user_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "trx_initiat_datetime",
ADD COLUMN     "trx_initiate_datetime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "user_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "total_earnings",
DROP COLUMN "total_withdrawals",
DROP COLUMN "wallet_balance";

-- DropTable
DROP TABLE "public"."challanges";

-- DropTable
DROP TABLE "public"."challanges_histories";

-- DropTable
DROP TABLE "public"."referal_histories";

-- DropTable
DROP TABLE "public"."referal_milestones";

-- DropTable
DROP TABLE "public"."referance_commission_histories";

-- DropTable
DROP TABLE "public"."referance_levels";

-- DropTable
DROP TABLE "public"."user_stakeing_packages";

-- CreateTable
CREATE TABLE "user_toins" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "wallet_balance" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_earnings" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_withdrawals" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(6),
    "deleted_by" BIGINT,

    CONSTRAINT "user_toins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_settings" (
    "id" BIGSERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_staking_packages" (
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

    CONSTRAINT "user_staking_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_milestones" (
    "id" BIGSERIAL NOT NULL,
    "referral_name" VARCHAR(100) NOT NULL,
    "toin_amount" INTEGER NOT NULL DEFAULT 0,
    "target_person" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referral_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "referral_milestone_id" BIGINT NOT NULL,
    "referral_code" VARCHAR(20) NOT NULL,
    "toin_amount" INTEGER NOT NULL DEFAULT 0,
    "referral_commission" DECIMAL(18,2) NOT NULL,
    "referral_bonus" DECIMAL(18,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referral_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" BIGSERIAL NOT NULL,
    "challenge_title" VARCHAR(255) NOT NULL,
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

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "challenge_id" BIGINT NOT NULL,
    "challenge_status" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "challenges_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_levels" (
    "id" BIGSERIAL NOT NULL,
    "level_name" VARCHAR(100) NOT NULL,
    "referral_bounce_percentage" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referral_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_commission_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "referral_level_id" BIGINT NOT NULL,
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

    CONSTRAINT "referral_commission_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_toins_user_id_key" ON "user_toins"("user_id");

-- CreateIndex
CREATE INDEX "user_toins_created_at_idx" ON "user_toins"("created_at");

-- CreateIndex
CREATE INDEX "user_toins_deleted_at_idx" ON "user_toins"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "general_settings_key_key" ON "general_settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "referral_milestones_referral_name_key" ON "referral_milestones"("referral_name");

-- CreateIndex
CREATE UNIQUE INDEX "referral_levels_level_name_key" ON "referral_levels"("level_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "user_toins" ADD CONSTRAINT "user_toins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_staking_packages" ADD CONSTRAINT "user_staking_packages_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "staking_package_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_staking_packages" ADD CONSTRAINT "user_staking_packages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
