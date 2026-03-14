/*
  Warnings:

  - A unique constraint covering the columns `[version]` on the table `user_toins` will be added. If there are existing duplicate values, this will fail.
  - The required column `version` was added to the `user_toins` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "user_toins" ADD COLUMN     "version" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_toins_version_key" ON "user_toins"("version");
