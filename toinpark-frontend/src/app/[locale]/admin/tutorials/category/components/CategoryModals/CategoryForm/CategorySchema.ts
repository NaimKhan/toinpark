import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean(),
  description: z.string().optional(),
});

export type TAddCategoryFormData = z.infer<typeof addCategorySchema>;
