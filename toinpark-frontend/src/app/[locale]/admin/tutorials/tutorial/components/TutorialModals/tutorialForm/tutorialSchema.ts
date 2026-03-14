import { z } from "zod";

export const tutorialSchema = z
  .object({
    title: z.string().min(2, "Title is required"),
    type: z.enum(["link", "file"]),
    tutorialCategoryId: z.string().uuid("Category is required"),
    videoFile: z
      .any()
      .optional()
      .refine((value) => !value || value instanceof File, "Invalid file"),
    videoFileUrl: z.string().optional().nullable(),
    thumbnail: z
      .any()
      .optional()
      .refine((value) => !value || value instanceof File, "Invalid file")
      .refine(
        (value) => !value || (value as File).size <= 5 * 1024 * 1024,
        "Thumbnail size must not exceed 5MB"
      ),

    sourceLink: z.string().optional(),
    description: z.string().optional(),
    isFeatured: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "file" && !data.videoFile && !data.videoFileUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video file is required when type is 'file'",
        path: ["videoFile"],
      });
    }

    if (data.type === "link" && !data.sourceLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Source link is required when type is 'link'",
        path: ["sourceLink"],
      });
    }
  });

export type TTutorialFormData = z.infer<typeof tutorialSchema>;
