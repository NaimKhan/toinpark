/*
  Warnings:

  - You are about to drop the `user_toins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_toins" DROP CONSTRAINT "user_toins_user_id_fkey";

-- DropTable
DROP TABLE "user_toins";

-- CreateTable
CREATE TABLE "user_wallets" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "wallet_balance" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_staking_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_claim_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_entry_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_leveling_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_referral" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_commission_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_staking" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_challenge_bonus" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_withdrawals" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_refund" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_void" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(6),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(6),
    "deleted_by" TEXT,

    CONSTRAINT "user_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_wallets_version_key" ON "user_wallets"("version");

-- CreateIndex
CREATE UNIQUE INDEX "user_wallets_user_id_key" ON "user_wallets"("user_id");

-- CreateIndex
CREATE INDEX "user_wallets_created_at_idx" ON "user_wallets"("created_at");

-- CreateIndex
CREATE INDEX "user_wallets_deleted_at_idx" ON "user_wallets"("deleted_at");

-- AddForeignKey
ALTER TABLE "user_wallets" ADD CONSTRAINT "user_wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
