/*
  Warnings:

  - Added the required column `platform_fee` to the `withdrawal_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "withdrawal_requests" ADD COLUMN     "platform_fee" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "remark" VARCHAR(255);
