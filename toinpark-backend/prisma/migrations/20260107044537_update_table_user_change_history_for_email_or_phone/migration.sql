-- CreateIndex
CREATE INDEX "user_change_history_for_email_or_phone_user_id_idx" ON "user_change_history_for_email_or_phone"("user_id");

-- CreateIndex
CREATE INDEX "user_change_history_for_email_or_phone_created_at_idx" ON "user_change_history_for_email_or_phone"("created_at");

-- CreateIndex
CREATE INDEX "user_change_history_for_email_or_phone_deleted_at_idx" ON "user_change_history_for_email_or_phone"("deleted_at");
