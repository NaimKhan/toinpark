/*
  Warnings:

  - Made the column `level_name` on table `referral_levels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "referral_levels" ALTER COLUMN "level_name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_level_name_fkey" FOREIGN KEY ("level_name") REFERENCES "referral_levels"("level_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_stake_id_fkey" FOREIGN KEY ("stake_id") REFERENCES "staking_package_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
