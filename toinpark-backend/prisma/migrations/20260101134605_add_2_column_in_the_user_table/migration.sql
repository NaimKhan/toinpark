-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_changing_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phone_changing_count" INTEGER NOT NULL DEFAULT 0;
