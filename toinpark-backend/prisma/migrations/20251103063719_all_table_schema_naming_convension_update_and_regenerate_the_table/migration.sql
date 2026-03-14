/*
  Warnings:

  - You are about to drop the `air_drop_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `challanges_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referal_milestone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referance_commission_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referance_level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `request_responses_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staking_package_plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `success_or_error_or_sms_or_email_text` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_stakeing_package` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."challanges_history" DROP CONSTRAINT "challanges_history_challange_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referal_histories" DROP CONSTRAINT "referal_histories_referal_milestone_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."referance_commission_history" DROP CONSTRAINT "referance_commission_history_referance_level_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."request_responses_log" DROP CONSTRAINT "request_responses_log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transaction" DROP CONSTRAINT "transaction_stake_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transaction" DROP CONSTRAINT "transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_stakeing_package" DROP CONSTRAINT "user_stakeing_package_package_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_stakeing_package" DROP CONSTRAINT "user_stakeing_package_user_id_fkey";

-- DropTable
DROP TABLE "public"."air_drop_event";

-- DropTable
DROP TABLE "public"."challanges_history";

-- DropTable
DROP TABLE "public"."referal_milestone";

-- DropTable
DROP TABLE "public"."referance_commission_history";

-- DropTable
DROP TABLE "public"."referance_level";

-- DropTable
DROP TABLE "public"."request_responses_log";

-- DropTable
DROP TABLE "public"."setting";

-- DropTable
DROP TABLE "public"."staking_package_plan";

-- DropTable
DROP TABLE "public"."success_or_error_or_sms_or_email_text";

-- DropTable
DROP TABLE "public"."transaction";

-- DropTable
DROP TABLE "public"."user_stakeing_package";

-- CreateTable
CREATE TABLE "request_responses_logs" (
    "id" BIGSERIAL NOT NULL,
    "request" TEXT,
    "response" TEXT,
    "user_id" BIGINT,
    "error_log" TEXT,
    "method_name" VARCHAR(150),
    "requested_ip" VARCHAR(100),
    "full_route" VARCHAR(255),
    "action_verb" VARCHAR(20),
    "old_data" TEXT,
    "new_data" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "request_responses_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "success_or_error_or_sms_or_email_texts" (
    "id" BIGSERIAL NOT NULL,
    "message_code" INTEGER,
    "success_or_error_message" TEXT,
    "sms_message" TEXT,
    "email_message" TEXT,
    "message_type" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "success_or_error_or_sms_or_email_texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staking_package_plans" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "min_amount" DECIMAL(18,2) NOT NULL,
    "max_amount" DECIMAL(18,2) NOT NULL,
    "daily_profit_percent" DECIMAL(5,2) NOT NULL,
    "profit_days_per_week" INTEGER NOT NULL,
    "bonus_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "staking_package_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stakeing_packages" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "package_id" BIGINT NOT NULL,
    "toin_amount" DECIMAL(18,2) NOT NULL,
    "usd_amount" DECIMAL(18,2) NOT NULL,
    "usd_conversion_rate" DECIMAL(18,6) NOT NULL,
    "bonus_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "daily_profit_percent" DECIMAL(5,2) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "total_profit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "user_stakeing_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" BIGSERIAL NOT NULL,
    "transaction_auto_id" VARCHAR(100) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "stake_id" BIGINT,
    "type" "TransactionType" NOT NULL DEFAULT 'STAKE',
    "toin_amount" DECIMAL(18,2) NOT NULL,
    "usd_amount" DECIMAL(18,2) NOT NULL,
    "usd_conversion_rate" DECIMAL(18,6) NOT NULL,
    "trx_initiat_datetime" TIMESTAMP(3),
    "trx_success_datetime" TIMESTAMP(3),
    "trx_payment_gateway" VARCHAR(100),
    "trx_payment_reference_id" VARCHAR(150),
    "trxStatus" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "trxNote" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "air_drop_events" (
    "id" BIGSERIAL NOT NULL,
    "event_name" VARCHAR(100) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "used_amount" DECIMAL(18,2) NOT NULL,
    "usd_conversion_rate" DECIMAL(18,6) NOT NULL,
    "event_start_date" TIMESTAMP(3) NOT NULL,
    "event_end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "air_drop_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referal_milestones" (
    "id" BIGSERIAL NOT NULL,
    "referal_name" VARCHAR(100) NOT NULL,
    "toin_amount" INTEGER NOT NULL DEFAULT 0,
    "terget_person" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referal_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challanges_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "challange_id" BIGINT NOT NULL,
    "challange_status" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "challanges_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referance_levels" (
    "id" BIGSERIAL NOT NULL,
    "level_name" VARCHAR(100) NOT NULL,
    "referance_bonuce_persentage" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referance_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referance_commission_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "referance_level_id" BIGINT NOT NULL,
    "level_name" VARCHAR(100) NOT NULL,
    "toin_amount" DECIMAL(18,2) NOT NULL,
    "usd_amount" DECIMAL(18,2) NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "referance_commission_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" BIGSERIAL NOT NULL,
    "key_name" VARCHAR(100) NOT NULL,
    "value" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transaction_auto_id_key" ON "transactions"("transaction_auto_id");

-- CreateIndex
CREATE UNIQUE INDEX "air_drop_events_event_name_key" ON "air_drop_events"("event_name");

-- CreateIndex
CREATE UNIQUE INDEX "referal_milestones_referal_name_key" ON "referal_milestones"("referal_name");

-- CreateIndex
CREATE UNIQUE INDEX "referance_levels_level_name_key" ON "referance_levels"("level_name");

-- AddForeignKey
ALTER TABLE "request_responses_logs" ADD CONSTRAINT "request_responses_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stakeing_packages" ADD CONSTRAINT "user_stakeing_packages_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "staking_package_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stakeing_packages" ADD CONSTRAINT "user_stakeing_packages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_stake_id_fkey" FOREIGN KEY ("stake_id") REFERENCES "user_stakeing_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referal_histories" ADD CONSTRAINT "referal_histories_referal_milestone_id_fkey" FOREIGN KEY ("referal_milestone_id") REFERENCES "referal_milestones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challanges_histories" ADD CONSTRAINT "challanges_histories_challange_id_fkey" FOREIGN KEY ("challange_id") REFERENCES "challanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referance_commission_histories" ADD CONSTRAINT "referance_commission_histories_referance_level_id_fkey" FOREIGN KEY ("referance_level_id") REFERENCES "referance_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
