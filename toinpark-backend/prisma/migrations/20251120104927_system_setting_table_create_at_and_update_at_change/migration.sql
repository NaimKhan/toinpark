/*
  Warnings:

  - You are about to drop the column `createdAt` on the `system_settings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `system_settings` table. All the data in the column will be lost.
  - You are about to drop the column `trxNote` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `trxStatus` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "system_settings" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "trxNote",
DROP COLUMN "trxStatus",
ADD COLUMN     "trx_note" VARCHAR(255),
ADD COLUMN     "trx_status" "TransactionStatus" NOT NULL DEFAULT 'PENDING';
