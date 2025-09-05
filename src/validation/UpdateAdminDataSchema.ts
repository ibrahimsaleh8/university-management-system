import z from "zod";

export const UpdateAdminDataSchema = z.object({
  first_name: z
    .string({ required_error: "first name is required" })
    .min(3, { message: "min first name length is 3" }),
  last_name: z
    .string({ required_error: "last name is required" })
    .min(3, { message: "min last name length is 3" }),
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .min(1, { message: "Email is required" }),
  password: z
    .string({ required_error: "input your password" })
    .min(1, { message: "input your password" }),
});

export type UpdateAdminDataType = z.infer<typeof UpdateAdminDataSchema>;
