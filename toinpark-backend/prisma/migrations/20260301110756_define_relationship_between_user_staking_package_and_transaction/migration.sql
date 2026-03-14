-- AddForeignKey
ALTER TABLE "user_staking_packages" ADD CONSTRAINT "user_staking_packages_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("transaction_auto_id") ON DELETE SET NULL ON UPDATE CASCADE;
