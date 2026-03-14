/*
  Warnings:

  - You are about to drop the column `next_reward_date` on the `user_staking_packages` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_price_in_usd` on the `user_staking_packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_staking_packages" DROP COLUMN "next_reward_date",
DROP COLUMN "purchase_price_in_usd",
ADD COLUMN     "next_recurring_reward_date" TIMESTAMP(3),
ADD COLUMN     "usd_conversion_rate" DECIMAL(18,2);
