-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'SUSPENDED', 'DORMANT', 'CLOSED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateTable
CREATE TABLE "countries" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "phone_code" VARCHAR(10),
    "currency_code" VARCHAR(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" BIGSERIAL NOT NULL,
    "country_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "phone_number" VARCHAR(20),
    "email" VARCHAR(255),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(6),
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified_at" TIMESTAMP(6),
    "password_hash" VARCHAR(255) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "toi_account_number" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "date_of_birth" DATE,
    "gender" VARCHAR(20),
    "profile_image_url" VARCHAR(500),
    "bio" TEXT,
    "address_line1" VARCHAR(255),
    "address_line2" VARCHAR(255),
    "city" VARCHAR(100),
    "state_id" BIGINT,
    "country_id" BIGINT,
    "zip_code" VARCHAR(20),
    "user_role" VARCHAR(50) DEFAULT 'Admin',
    "status" VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_secret" VARCHAR(255),
    "lockout_enabled" BOOLEAN NOT NULL DEFAULT true,
    "lockout_end" TIMESTAMP(6),
    "access_failed_count" INTEGER NOT NULL DEFAULT 0,
    "referrer_id" BIGINT,
    "referral_code" VARCHAR(20) NOT NULL,
    "total_referrals" INTEGER NOT NULL DEFAULT 0,
    "wallet_balance" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_earnings" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "total_withdrawals" DECIMAL(18,4) NOT NULL DEFAULT 0.0000,
    "last_login_at" TIMESTAMP(6),
    "last_login_ip" VARCHAR(45),
    "login_count" INTEGER NOT NULL DEFAULT 0,
    "is_kyc_verified" BOOLEAN NOT NULL DEFAULT false,
    "kyc_verified_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(6),
    "deleted_by" BIGINT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150),
    "normalized_name" VARCHAR(150),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "created_by" VARCHAR(150),
    "updated_at" TIMESTAMP(3),
    "updated_by" VARCHAR(150),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" VARCHAR(150),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "menu_and_permission_setups" (
    "id" BIGSERIAL NOT NULL,
    "parent_id" BIGINT,
    "head_title" VARCHAR(255),
    "level" INTEGER,
    "title" VARCHAR(255),
    "icon" VARCHAR(100),
    "type" VARCHAR(100),
    "horizontal_list" BOOLEAN,
    "path" VARCHAR(255),
    "bookmark" VARCHAR(255),
    "feature_name" VARCHAR(255),
    "controller_name" VARCHAR(255),
    "method_name" VARCHAR(255),
    "method_type" VARCHAR(50),
    "application_name" VARCHAR(150),
    "application_base_url" VARCHAR(255),
    "menu_sequence" INTEGER,
    "is_visible" BOOLEAN,
    "show_in_menu_item" BOOLEAN,
    "allow_anonymous" BOOLEAN,
    "restriction_allow" BOOLEAN,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "created_by" VARCHAR(150),
    "updated_at" TIMESTAMP(3),
    "updated_by" VARCHAR(150),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" VARCHAR(150),

    CONSTRAINT "menu_and_permission_setups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_wise_menu_and_permissions" (
    "id" BIGSERIAL NOT NULL,
    "menu_and_permission_setup_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "role_name" VARCHAR(150),
    "user_id" BIGINT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "created_by" VARCHAR(150),
    "updated_at" TIMESTAMP(3),
    "updated_by" VARCHAR(150),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" VARCHAR(150),

    CONSTRAINT "role_wise_menu_and_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_responses_log" (
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
    "created_at" TIMESTAMP(3),
    "created_by" VARCHAR(150),
    "updated_at" TIMESTAMP(3),
    "updated_by" VARCHAR(150),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" VARCHAR(150),

    CONSTRAINT "request_responses_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "success_or_error_or_sms_or_email_text" (
    "id" BIGSERIAL NOT NULL,
    "message_code" INTEGER,
    "success_or_error_message" TEXT,
    "sms_message" TEXT,
    "email_message" TEXT,
    "message_type" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "created_by" VARCHAR(150),
    "updated_at" TIMESTAMP(3),
    "updated_by" VARCHAR(150),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" VARCHAR(150),

    CONSTRAINT "success_or_error_or_sms_or_email_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "official_announcements" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255),
    "type" VARCHAR(50),
    "message" TEXT,
    "send_email" BOOLEAN NOT NULL DEFAULT false,
    "email_subject" VARCHAR(255),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3),
    "created_by" VARCHAR(150),
    "updated_at" TIMESTAMP(3),
    "updated_by" VARCHAR(150),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" VARCHAR(150),

    CONSTRAINT "official_announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "official_announcement_users" (
    "id" BIGSERIAL NOT NULL,
    "official_announcement_id" BIGINT NOT NULL,
    "model_type" VARCHAR(100),
    "model_id" BIGINT NOT NULL,
    "is_seen" BOOLEAN NOT NULL DEFAULT false,
    "seen_at" TIMESTAMP(3),

    CONSTRAINT "official_announcement_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorial_categories" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150),
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "tutorial_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorials" (
    "id" BIGSERIAL NOT NULL,
    "tutorial_category_id" BIGINT NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "type" VARCHAR(50),
    "file_path" VARCHAR(500),
    "source_link" VARCHAR(500),
    "duration" VARCHAR(50),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_events" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "event_date" TIMESTAMP(3),
    "location_name" VARCHAR(255),
    "address" VARCHAR(500),
    "map_link" VARCHAR(500),
    "event_link" VARCHAR(500),
    "banner_image_url" VARCHAR(500),
    "event_type" VARCHAR(50),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT,
    "updated_at" TIMESTAMP(3),
    "updated_by" BIGINT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" BIGINT,

    CONSTRAINT "community_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE INDEX "states_country_id_idx" ON "states"("country_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_toi_account_number_key" ON "users"("toi_account_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_referral_code_key" ON "users"("referral_code");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_number_idx" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_toi_account_number_idx" ON "users"("toi_account_number");

-- CreateIndex
CREATE INDEX "users_referral_code_idx" ON "users"("referral_code");

-- CreateIndex
CREATE INDEX "users_referrer_id_idx" ON "users"("referrer_id");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "users"("deleted_at");

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_and_permission_setups" ADD CONSTRAINT "menu_and_permission_setups_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu_and_permission_setups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_wise_menu_and_permissions" ADD CONSTRAINT "role_wise_menu_and_permissions_menu_and_permission_setup_i_fkey" FOREIGN KEY ("menu_and_permission_setup_id") REFERENCES "menu_and_permission_setups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_wise_menu_and_permissions" ADD CONSTRAINT "role_wise_menu_and_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_wise_menu_and_permissions" ADD CONSTRAINT "role_wise_menu_and_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_responses_log" ADD CONSTRAINT "request_responses_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_announcement_users" ADD CONSTRAINT "official_announcement_users_official_announcement_id_fkey" FOREIGN KEY ("official_announcement_id") REFERENCES "official_announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_announcement_users" ADD CONSTRAINT "official_announcement_users_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorial_categories" ADD CONSTRAINT "tutorial_categories_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_tutorial_category_id_fkey" FOREIGN KEY ("tutorial_category_id") REFERENCES "tutorial_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_events" ADD CONSTRAINT "community_events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
