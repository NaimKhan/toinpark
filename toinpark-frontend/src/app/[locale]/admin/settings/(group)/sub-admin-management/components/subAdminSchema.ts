import { z } from "zod";

/* ---------------------- Add Schema ---------------------- */
export const addSubAdminSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email"),
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string().min(6, "Confirm password is required"),

    memberManagement: z.record(z.string(), z.boolean()).optional(),
    reportsManagement: z.record(z.string(), z.boolean()).optional(),
    queryTicketsManagement: z.record(z.string(), z.boolean()).optional(),
    settingsManagement: z.record(z.string(), z.boolean()).optional(),
    subAdminManagement: z.record(z.string(), z.boolean()).optional(),
    investmentManagement: z.record(z.string(), z.boolean()).optional(),
    walletManagement: z.record(z.string(), z.boolean()).optional(),
    fundRequest: z.record(z.string(), z.boolean()).optional(),
    withdrawalManagement: z.record(z.string(), z.boolean()).optional(),
    rankAchievers: z.record(z.string(), z.boolean()).optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export type TAddSubAdminFormSchema = z.infer<typeof addSubAdminSchema>;

/* ---------------------- Edit Schema ---------------------- */
export const editSubAdminSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email"),
    userName: z.string().min(1, "Username is required"),

    password: z.string().optional(),
    passwordConfirmation: z.string().optional(),

    memberManagement: z.record(z.string(), z.boolean()).optional(),
    reportsManagement: z.record(z.string(), z.boolean()).optional(),
    queryTicketsManagement: z.record(z.string(), z.boolean()).optional(),
    settingsManagement: z.record(z.string(), z.boolean()).optional(),
    subAdminManagement: z.record(z.string(), z.boolean()).optional(),
    investmentManagement: z.record(z.string(), z.boolean()).optional(),
    walletManagement: z.record(z.string(), z.boolean()).optional(),
    fundRequest: z.record(z.string(), z.boolean()).optional(),
    withdrawalManagement: z.record(z.string(), z.boolean()).optional(),
    rankAchievers: z.record(z.string(), z.boolean()).optional(),
  })
  .refine(
    (data) =>
      (!data.password && !data.passwordConfirmation) ||
      data.password === data.passwordConfirmation,
    {
      message: "Passwords must match",
      path: ["passwordConfirmation"],
    }
  );

export type TEditSubAdminFormSchema = z.infer<typeof editSubAdminSchema>;

export type TSubAdminFormSchema =
  | TAddSubAdminFormSchema
  | TEditSubAdminFormSchema;
