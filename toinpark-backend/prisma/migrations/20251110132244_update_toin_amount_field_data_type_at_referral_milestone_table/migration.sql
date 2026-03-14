-- AlterTable
ALTER TABLE "referral_milestones" ALTER COLUMN "toin_amount" DROP DEFAULT,
ALTER COLUMN "toin_amount" SET DATA TYPE DECIMAL(18,2);
