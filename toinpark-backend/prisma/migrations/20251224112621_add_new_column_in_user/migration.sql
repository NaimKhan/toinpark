-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_change_max_time" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phone_change_max_time" INTEGER NOT NULL DEFAULT 0;
