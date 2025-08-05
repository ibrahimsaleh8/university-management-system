import { z } from "zod";
export const classCreationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    })
    .min(3, { message: "Name should be more than 3" })
    .max(20, { message: "Name should be less than 20" }),

  teacherId: z.number({
    required_error: "Teacher is required",
  }),
  courseOfferingId: z.string({
    required_error: "Course is required",
  }),
});

export type classCreationDataType = z.infer<typeof classCreationSchema>;
