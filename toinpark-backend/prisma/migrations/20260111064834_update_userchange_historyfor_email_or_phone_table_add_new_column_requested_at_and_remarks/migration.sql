-- AlterTable
ALTER TABLE "user_change_history_for_email_or_phone" ADD COLUMN     "remarks" VARCHAR(255),
ADD COLUMN     "requested_at" TIMESTAMP(3),
ADD COLUMN     "verified_at" TIMESTAMP(3);
