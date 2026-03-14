-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionStatus" ADD VALUE 'INITIATE';
ALTER TYPE "TransactionStatus" ADD VALUE 'REFUNDED';
ALTER TYPE "TransactionStatus" ADD VALUE 'VOIDED';

-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'VOID';

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "trx_type" DROP NOT NULL,
ALTER COLUMN "trx_type" DROP DEFAULT,
ALTER COLUMN "trx_status" DROP NOT NULL,
ALTER COLUMN "trx_status" DROP DEFAULT,
ALTER COLUMN "is_labeling_bonus_calculated" SET DEFAULT false,
ALTER COLUMN "trx_message" DROP NOT NULL,
ALTER COLUMN "trx_payment_gateway_response" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_staking_packages" ADD COLUMN     "recurring_profit_days" INTEGER,
ADD COLUMN     "submit_for_withdraw" BOOLEAN DEFAULT true,
ADD COLUMN     "withdrawal_status" BOOLEAN DEFAULT true,
ALTER COLUMN "total_profit" DROP NOT NULL,
ALTER COLUMN "purchase_price_in_usd" DROP NOT NULL;
