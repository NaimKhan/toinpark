-- CreateTable
CREATE TABLE "user_change_history_for_email_or_phone" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_changed_phone_number" VARCHAR(20),
    "last_changed_email" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(6),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(6),
    "deleted_by" TEXT,

    CONSTRAINT "user_change_history_for_email_or_phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_change_history_for_email_or_phone_user_id_key" ON "user_change_history_for_email_or_phone"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_change_history_for_email_or_phone_last_changed_phone_n_key" ON "user_change_history_for_email_or_phone"("last_changed_phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_change_history_for_email_or_phone_last_changed_email_key" ON "user_change_history_for_email_or_phone"("last_changed_email");

-- AddForeignKey
ALTER TABLE "user_change_history_for_email_or_phone" ADD CONSTRAINT "user_change_history_for_email_or_phone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
