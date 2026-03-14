-- CreateTable
CREATE TABLE "user_wallet_addresses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "wallet_account_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "user_wallet_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_wallet_addresses" ADD CONSTRAINT "user_wallet_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
