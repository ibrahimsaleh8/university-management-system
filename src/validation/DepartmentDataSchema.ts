import { z } from "zod";

export const departmentDataSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name should be more than 3 chars" }),
  code: z
    .string({
      required_error: "Code is required",
    })
    .min(2, { message: "Code should be more than 2 chars" }),
});

export type departmentDataType = z.infer<typeof departmentDataSchema>;
