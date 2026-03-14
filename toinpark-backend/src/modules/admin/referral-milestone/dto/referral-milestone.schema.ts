import { z } from 'zod';

// Create Referral Milestone Schema
export const createReferralMilestoneSchema = z.object({
  referralName: z
    .string('Referral name is required')
    .trim()
    .min(1, 'Referral name must be at least 1 character')
    .max(100, 'Referral name must not exceed 100 characters'),

  toinAmount: z.coerce
    .number({
      message: 'TOIN amount must be a number',
    })
    .int('TOIN amount must be an integer')
    .nonnegative('TOIN amount must be non-negative'),

  targetPerson: z.coerce
    .number({
      message: 'Target person must be a number',
    })
    .int('Target person must be an integer')
    .nonnegative('Target person must be non-negative'),

  isActive: z.boolean().optional().default(true),
});

export type CreateReferralMilestoneSchemaDto = z.infer<
  typeof createReferralMilestoneSchema
>;

// Update Referral Milestone Schema
export const updateReferralMilestoneSchema = z.object({
  referralName: z
    .string('Referral name is required')
    .trim()
    .min(1, 'Referral name must be at least 1 character')
    .max(100, 'Referral name must not exceed 100 characters')
    .optional(),

  toinAmount: z.coerce
    .number({
      message: 'TOIN amount must be a number',
    })
    .int('TOIN amount must be an integer')
    .nonnegative('TOIN amount must be non-negative')
    .optional(),

  targetPerson: z.coerce
    .number({
      message: 'Target person must be a number',
    })
    .int('Target person must be an integer')
    .nonnegative('Target person must be non-negative')
    .optional(),

  isActive: z.boolean().optional(),
});

export type UpdateReferralMilestoneSchemaDto = z.infer<
  typeof updateReferralMilestoneSchema
>;

