-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_trx_reference_id_fkey" FOREIGN KEY ("trx_reference_id") REFERENCES "transactions"("transaction_auto_id") ON DELETE SET NULL ON UPDATE CASCADE;
