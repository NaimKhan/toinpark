-- CreateEnum
CREATE TYPE "StakeCreatedBy" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "user_staking_packages" ADD COLUMN     "stake_created_by" "StakeCreatedBy" NOT NULL DEFAULT 'MEMBER';
