import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const addAirdropEventModalSchema = z
  .object({
    eventName: z.string().min(1, "Event name is required"),
    totalAmount: z.number().min(0, "Total Amount must not be less than 0"),

    usdConversionRate: z
      .number()
      .min(0.01, "USD ConversionRate must not be less than 0"),
    eventStartDate: z.date().min(today, "Start date cannot be in the past"),
    eventEndDate: z.date(),
  })
  .refine((data) => data.eventEndDate >= data.eventStartDate, {
    path: ["eventEndDate"],
    message: "End date and time must be after start date and time",
  });

export type TAddAirdropEventFormData = z.infer<
  typeof addAirdropEventModalSchema
>;
