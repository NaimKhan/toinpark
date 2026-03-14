-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_deleted_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_referrer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_updated_by_fkey";
