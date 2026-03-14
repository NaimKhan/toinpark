/*
  Warnings:

  - You are about to drop the column `usd_amount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `usd_conversion_rate` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `usdt_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usdt_conversion_rate` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "usd_amount",
DROP COLUMN "usd_conversion_rate",
ADD COLUMN     "usdt_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "usdt_conversion_rate" DECIMAL(18,6) NOT NULL;
