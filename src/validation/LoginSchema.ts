import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" }),
  role: z
    .string({ message: "Role is Required" })
    .min(4, { message: "Role is Required" }),
});
