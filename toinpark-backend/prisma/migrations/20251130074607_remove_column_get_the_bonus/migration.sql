-- AlterTable
CREATE SEQUENCE referral_milestones_sequence_number_seq;
ALTER TABLE "referral_milestones" ALTER COLUMN "sequence_number" SET DEFAULT nextval('referral_milestones_sequence_number_seq');
ALTER SEQUENCE referral_milestones_sequence_number_seq OWNED BY "referral_milestones"."sequence_number";
