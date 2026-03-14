-- AlterTable
ALTER TABLE "user_staking_packages" ALTER COLUMN "submit_for_withdraw" SET DEFAULT false,
ALTER COLUMN "withdrawal_status" DROP DEFAULT,
ALTER COLUMN "withdrawal_status" SET DATA TYPE TEXT;
