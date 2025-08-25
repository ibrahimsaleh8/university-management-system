import { z } from "zod";

export const addCourseSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),

  code: z
    .string({ required_error: "Code is required" })
    .min(3, { message: "Code should be at least 3 characters" }),

  credit_hours: z
    .number({
      required_error: "Credit hours is required",
      invalid_type_error: "Credit hours must be a number",
    })
    .int()
    .min(1, "Minimum 1 credit hour"),

  isElective: z
    .boolean({ required_error: "Is elective is required" })
    .default(false),

  departmentId: z
    .number({
      required_error: "Department is required",
      invalid_type_error: "Department ID must be a number",
    })
    .int(),
});

export type courseDataType = z.infer<typeof addCourseSchema>;
