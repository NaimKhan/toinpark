-- AlterTable
ALTER TABLE "user_staking_packages" ADD COLUMN     "is_bonus_done" BOOLEAN DEFAULT true,
ADD COLUMN     "is_leveling_bonus_done" BOOLEAN DEFAULT false,
ADD COLUMN     "staked_toin" BOOLEAN DEFAULT false;
