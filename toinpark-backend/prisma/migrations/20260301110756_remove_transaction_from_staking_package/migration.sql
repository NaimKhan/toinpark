/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `user_staking_packages` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `user_staking_packages` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `user_staking_packages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_staking_packages" DROP CONSTRAINT "user_staking_packages_transaction_id_fkey";

-- AlterTable
ALTER TABLE "user_staking_packages" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
DROP COLUMN "transaction_id";
