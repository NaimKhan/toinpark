import { z } from "zod";

const urlValidation = z
  .string()
  .refine(
    (value) =>
      value === "" ||
      /^https?:\/\/.+$/.test(value) ||
      /^www\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    {
      message:
        "Invalid URL. Must be a valid link like https://..., http://..., or www...",
    },
  );

export const communityEventSchema = z.object({
  title: z.string().min(2, "Event title is required"),

  eventDate: z.string().optional(),

  eventType: z
    .enum([
      "CONFERENCE",
      "MEETUP",
      "WORKSHOP",
      "WEBINAR",
      "NETWORKING",
      "OTHER",
    ])
    .pipe(
      z
        .enum([
          "CONFERENCE",
          "MEETUP",
          "WORKSHOP",
          "WEBINAR",
          "NETWORKING",
          "OTHER",
        ])
        .catch(() => {
          throw new Error("Event type is required");
        }),
    ),

  bannerImage: z
    .any()
    .optional()
    .refine((value) => !value || value instanceof File, "Invalid file")
    .refine(
      (value) =>
        !value || (value instanceof File && value.size <= 5 * 1024 * 1024),
      "Image size must be less than 5MB",
    ),

  mapLink: urlValidation.optional().or(z.literal("")),

  eventLink: urlValidation.optional().or(z.literal("")),

  description: z.string().optional(),
  eventLocation: z.string().optional(),
});

export type TCommunityEventFormData = z.infer<typeof communityEventSchema>;
