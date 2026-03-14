-- AlterTable
ALTER TABLE "user_staking_packages" ALTER COLUMN "toin_amount" DROP NOT NULL,
ALTER COLUMN "bonus_amount" DROP NOT NULL,
ALTER COLUMN "daily_profit_percent" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "is_active" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;
