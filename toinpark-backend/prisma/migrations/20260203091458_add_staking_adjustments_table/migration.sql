-- CreateEnum
CREATE TYPE "StakingAdjustmentType" AS ENUM ('ADD', 'DEDUCT');

-- DropForeignKey
ALTER TABLE "withdrawal_requests" DROP CONSTRAINT "withdrawal_requests_user_staking_package_id_fkey";

-- CreateTable
CREATE TABLE "staking_adjustments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_staking_package_id" TEXT NOT NULL,
    "toin_amount" DECIMAL(18,8) NOT NULL,
    "usdt_amount" DECIMAL(18,8) NOT NULL,
    "usdt_conversion_rate" DECIMAL(18,8) NOT NULL,
    "type" "StakingAdjustmentType" NOT NULL,
    "remark" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,

    CONSTRAINT "staking_adjustments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "staking_adjustments" ADD CONSTRAINT "staking_adjustments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_adjustments" ADD CONSTRAINT "staking_adjustments_user_staking_package_id_fkey" FOREIGN KEY ("user_staking_package_id") REFERENCES "user_staking_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_adjustments" ADD CONSTRAINT "staking_adjustments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal_requests" ADD CONSTRAINT "withdrawal_requests_user_staking_package_id_fkey" FOREIGN KEY ("user_staking_package_id") REFERENCES "user_staking_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
