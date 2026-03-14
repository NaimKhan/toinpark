/*
  Warnings:

  - You are about to drop the `challenges_histories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."challenges_histories" DROP CONSTRAINT "challenges_histories_challenge_id_fkey";

-- AlterTable
ALTER TABLE "referral_milestones" ALTER COLUMN "toin_amount" DROP DEFAULT,
ALTER COLUMN "toin_amount" SET DATA TYPE DECIMAL(18,6);

-- DropTable
DROP TABLE "public"."challenges_histories";

-- CreateTable
CREATE TABLE "challenge_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "challenge_status" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "challenge_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challenge_histories" ADD CONSTRAINT "challenge_histories_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
