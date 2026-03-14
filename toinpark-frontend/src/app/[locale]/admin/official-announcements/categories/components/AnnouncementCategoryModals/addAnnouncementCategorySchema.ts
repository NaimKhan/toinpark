import { z } from "zod";

export const addAnnouncementCategorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  isActive: z.boolean(),
  description: z.string().optional(),
});

export type TAddAnnouncementCategoryFormData = z.infer<
  typeof addAnnouncementCategorySchema
>;
