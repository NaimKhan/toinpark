-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'KYC_BONUS';

-- AlterTable
ALTER TABLE "user_wallets" ADD COLUMN     "total_kyc_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000;
