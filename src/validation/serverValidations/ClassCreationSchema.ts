import { z } from "zod";

export const classCreationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    })
    .min(3, { message: "Name should be more than 3" })
    .max(20, { message: "Name should be less than 20" }),
  departmentId: z.number({
    required_error: "Department id is required",
    invalid_type_error: "Department id must be Number",
  }),
});

export type classCreationDataType = z.infer<typeof classCreationSchema>;
