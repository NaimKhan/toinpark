/*
  Warnings:

  - You are about to drop the column `email_change_max_time` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_change_max_time` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_change_max_time",
DROP COLUMN "phone_change_max_time";
