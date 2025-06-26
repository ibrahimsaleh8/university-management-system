import { z } from "zod";

export const academicYearValidation = z.object({
  year_label: z.string().min(1, { message: "Year Label is required" }),
  level_number: z
    .number({
      required_error: "Level Number is required",
      invalid_type_error: "Level Number must be a number",
    })
    .min(1, { message: "Minimum Level Number is 1" })
    .max(6, { message: "Maximum Level Number is 6" }),
});

export type academicYearDataType = z.infer<typeof academicYearValidation>;
