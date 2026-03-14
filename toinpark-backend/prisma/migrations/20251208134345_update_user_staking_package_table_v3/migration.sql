/*
  Warnings:

  - You are about to drop the column `next_recurring_reward_date` on the `user_staking_packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_staking_packages" DROP COLUMN "next_recurring_reward_date",
ADD COLUMN     "next_reward_date" TIMESTAMP(3);
