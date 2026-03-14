-- AddForeignKey
ALTER TABLE "user_staking_packages" ADD CONSTRAINT "user_staking_packages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
