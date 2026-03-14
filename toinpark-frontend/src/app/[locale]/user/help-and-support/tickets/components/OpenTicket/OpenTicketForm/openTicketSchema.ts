import { z } from "zod";

export const openTicketSchema = z.object({
  ticketCategoryId: z.string().nonempty("Category is required"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  description: z.string().nonempty("Description is required"),
});

export type TOpenTicketSchema = z.infer<typeof openTicketSchema>;
