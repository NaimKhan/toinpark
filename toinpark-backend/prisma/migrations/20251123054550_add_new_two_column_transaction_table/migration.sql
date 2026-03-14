/*
  Warnings:

  - Added the required column `is_labeling_bonus_calculated` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trx_message` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "is_labeling_bonus_calculated" BOOLEAN NOT NULL,
ADD COLUMN     "trx_message" TEXT NOT NULL,
ADD COLUMN     "trx_payment_gateway_response" VARCHAR(150);
