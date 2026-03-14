import { z } from "zod";

export const addAnnouncementSchema = z.object({
  title: z.string().min(2, "Title is required"),
  isActive: z.boolean(),
  message: z.string().min(2, "Message is required"),
  categoryId: z.string().min(1, "Category is required"),
  audienceType: z.enum(["MEMBER", "SYSTEM_USER"]),
});

export type TAddAnnouncementFormData = z.infer<typeof addAnnouncementSchema>;
