import z from "zod";

export const TicketCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  // status: z.boolean(),
});

export type TTicketCategoryForm = z.infer<typeof TicketCategorySchema>;
