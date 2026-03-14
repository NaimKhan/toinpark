/*
  Warnings:

  - You are about to drop the `referal_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."referal_history" DROP CONSTRAINT "referal_history_referal_milestone_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referal_history" DROP CONSTRAINT "referal_history_user_id_fkey";

-- DropTable
DROP TABLE "public"."referal_history";

-- CreateTable
CREATE TABLE "referal_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "referal_milestone_id" BIGINT NOT NULL,
    "referal_code" VARCHAR(20) NOT NULL,
    "toin_amount" INTEGER NOT NULL DEFAULT 0,
    "referal_commission" DECIMAL(18,2) NOT NULL,
    "referal_bonus" DECIMAL(18,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referal_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "referal_histories" ADD CONSTRAINT "referal_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referal_histories" ADD CONSTRAINT "referal_histories_referal_milestone_id_fkey" FOREIGN KEY ("referal_milestone_id") REFERENCES "referal_milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
