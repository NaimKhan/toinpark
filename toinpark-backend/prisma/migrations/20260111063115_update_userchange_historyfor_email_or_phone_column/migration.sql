/*
  Warnings:

  - You are about to drop the column `last_changed_email` on the `user_change_history_for_email_or_phone` table. All the data in the column will be lost.
  - You are about to drop the column `last_changed_phone_number` on the `user_change_history_for_email_or_phone` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_change_history_for_email_or_phone_last_changed_email_key";

-- DropIndex
DROP INDEX "user_change_history_for_email_or_phone_last_changed_phone_n_key";

-- DropIndex
DROP INDEX "user_change_history_for_email_or_phone_user_id_key";

-- AlterTable
ALTER TABLE "user_change_history_for_email_or_phone" DROP COLUMN "last_changed_email",
DROP COLUMN "last_changed_phone_number",
ADD COLUMN     "change_type" TEXT,
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "logId" SERIAL NOT NULL,
ADD COLUMN     "new_value" VARCHAR(255),
ADD COLUMN     "old_value" VARCHAR(255),
ADD COLUMN     "user_name" TEXT;
