/*
  Warnings:

  - You are about to drop the column `trx_payment_reference_id` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "trx_payment_reference_id",
ADD COLUMN     "trx_payment_gateway_reference_id" VARCHAR(150),
ADD COLUMN     "trx_reference_id" VARCHAR(150);
