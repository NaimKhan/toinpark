/*
  Warnings:

  - You are about to drop the column `type` on the `official_announcements` table. All the data in the column will be lost.
  - You are about to drop the column `max_amount` on the `staking_package_plans` table. All the data in the column will be lost.
  - You are about to drop the column `min_amount` on the `staking_package_plans` table. All the data in the column will be lost.
  - You are about to drop the column `profit_days_per_week` on the `staking_package_plans` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `user_staking_packages` table. All the data in the column will be lost.
  - You are about to drop the column `usd_amount` on the `user_staking_packages` table. All the data in the column will be lost.
  - You are about to drop the column `usd_conversion_rate` on the `user_staking_packages` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - Added the required column `max_toin_amount` to the `staking_package_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_toin_amount` to the `staking_package_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimum_duration_in_days` to the `staking_package_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurring_profit_days` to the `staking_package_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_price_in_usd` to the `user_staking_packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "official_announcements" DROP COLUMN "type",
ADD COLUMN     "announcement_category" VARCHAR(100),
ADD COLUMN     "audience_type" VARCHAR(50);

-- AlterTable
ALTER TABLE "referral_levels" ADD COLUMN     "level_number" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "referral_milestones" ADD COLUMN     "Description" TEXT,
ADD COLUMN     "per_user_milestone" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "staking_package_plans" DROP COLUMN "max_amount",
DROP COLUMN "min_amount",
DROP COLUMN "profit_days_per_week",
ADD COLUMN     "max_toin_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "min_toin_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "minimum_duration_in_days" INTEGER NOT NULL,
ADD COLUMN     "recurring_profit_days" INTEGER NOT NULL,
ADD COLUMN     "total_toin_purchased_with_usd" DECIMAL(18,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user_staking_packages" DROP COLUMN "end_date",
DROP COLUMN "usd_amount",
DROP COLUMN "usd_conversion_rate",
ADD COLUMN     "initial_end_date" TIMESTAMP(3),
ADD COLUMN     "next_reward_date" TIMESTAMP(3),
ADD COLUMN     "purchase_price_in_usd" DECIMAL(18,2) NOT NULL;

-- AlterTable
ALTER TABLE "user_toins" ADD COLUMN     "total_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_referral" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_referral_by_leveling" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_reward" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
ADD COLUMN     "total_staking" DECIMAL(18,4) NOT NULL DEFAULT 0.0000;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ADD COLUMN     "Password_hashed" VARCHAR(255) NOT NULL DEFAULT 'Password@123';
