/*
  Warnings:

  - The values [BONUS] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('STAKE', 'COMMISSION_BONUS', 'PROFIT', 'WITHDRAWAL', 'REFUND', 'STAKING_BONUS', 'VOID', 'ENTRY_BONUS', 'CHALLENGE_BONUS', 'LEVELING_BONUS', 'SOCIAL_REFERRAL', 'CLAIM_BONUS');
ALTER TABLE "transactions" ALTER COLUMN "trx_type" TYPE "TransactionType_new" USING ("trx_type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "public"."TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "request_responses_logs" DROP CONSTRAINT "request_responses_logs_user_id_fkey";

-- AlterTable
ALTER TABLE "user_staking_packages" ALTER COLUMN "is_bonus_done" SET DEFAULT false,
ALTER COLUMN "staked_toin" SET DEFAULT true;
