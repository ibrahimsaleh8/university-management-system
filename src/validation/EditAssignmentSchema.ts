import { z } from "zod";

export const updateAssignmentSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title cannot be empty")
    .max(255, "Title must be less than 255 characters"),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description cannot be empty")
    .max(5000, "Description must be less than 5000 characters"),

  deadline: z.coerce
    .date({ message: "Deadline is required" })
    .refine((date) => date > new Date(), {
      message: "Deadline must be a future date",
    }),
  external_url: z
    .string({
      required_error: "External URL is required",
    })
    .optional()
    .or(z.literal("")),
});
export type updateAssignmentDataType = z.infer<typeof updateAssignmentSchema>;
