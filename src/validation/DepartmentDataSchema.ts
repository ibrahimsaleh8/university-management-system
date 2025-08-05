import { z } from "zod";

export const departmentDataSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters" }),
  code: z
    .string({
      required_error: "Code is required",
    })
    .min(2, { message: "Code should be more than 2 chars" }),
});

export type departmentDataType = z.infer<typeof departmentDataSchema>;
