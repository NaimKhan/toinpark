/*
  Warnings:

  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "referral_milestones" ALTER COLUMN "target_person" DROP NOT NULL,
ALTER COLUMN "per_user_milestone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "success_or_error_or_sms_or_email_texts" ADD COLUMN     "status_code" INTEGER,
ADD COLUMN     "subject_name" CHAR(500);

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "type",
ADD COLUMN     "trx_type" "TransactionType" NOT NULL DEFAULT 'STAKE';
