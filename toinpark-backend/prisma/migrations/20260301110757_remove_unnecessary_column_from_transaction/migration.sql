/*
  Warnings:

  - You are about to drop the column `air_drop_event_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `is_leveling_bonus_calculated` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `level_name` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `referred_user` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `stake_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `trx_initiate_datetime` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `trx_message` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `trx_reference_id` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[withdrawal_request_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staking_adjustment_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_level_name_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_stake_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_trx_reference_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "air_drop_event_id",
DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "is_active",
DROP COLUMN "is_leveling_bonus_calculated",
DROP COLUMN "level_name",
DROP COLUMN "referred_user",
DROP COLUMN "remark",
DROP COLUMN "stake_id",
DROP COLUMN "trx_initiate_datetime",
DROP COLUMN "trx_message",
DROP COLUMN "trx_reference_id",
ADD COLUMN     "level_id" TEXT,
ADD COLUMN     "staking_adjustment_id" TEXT,
ADD COLUMN     "user_staking_package_id" TEXT,
ADD COLUMN     "withdrawal_request_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "transactions_withdrawal_request_id_key" ON "transactions"("withdrawal_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_staking_adjustment_id_key" ON "transactions"("staking_adjustment_id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "referral_levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_staking_package_id_fkey" FOREIGN KEY ("user_staking_package_id") REFERENCES "user_staking_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_withdrawal_request_id_fkey" FOREIGN KEY ("withdrawal_request_id") REFERENCES "withdrawal_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_staking_adjustment_id_fkey" FOREIGN KEY ("staking_adjustment_id") REFERENCES "staking_adjustments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
