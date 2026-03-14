-- CreateTable
CREATE TABLE "referral_hierarchy" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ancestor_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_hierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "referral_hierarchy_ancestor_id_level_idx" ON "referral_hierarchy"("ancestor_id", "level");

-- CreateIndex
CREATE INDEX "referral_hierarchy_user_id_idx" ON "referral_hierarchy"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_hierarchy_user_id_ancestor_id_level_key" ON "referral_hierarchy"("user_id", "ancestor_id", "level");

-- AddForeignKey
ALTER TABLE "referral_hierarchy" ADD CONSTRAINT "referral_hierarchy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_hierarchy" ADD CONSTRAINT "referral_hierarchy_ancestor_id_fkey" FOREIGN KEY ("ancestor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
