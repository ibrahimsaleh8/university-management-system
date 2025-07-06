import { z } from "zod";

export const AnnouncementUpdateSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title cannot be empty")
    .trim(),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1, "Content cannot be empty")
    .trim(),
});

export type annUpdateDataType = z.infer<typeof AnnouncementUpdateSchema>;
