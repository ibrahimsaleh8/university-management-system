import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    role: z
      .string({ message: "Role is required" })
      .min(1, { message: "Role is required" }),
    gender: z
      .string({ message: "Gender is required" })
      .min(1, { message: "Gender is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

export const RegisterServerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  role: z
    .string({ message: "Role is required" })
    .min(1, { message: "Role is required" }),
  gender: z
    .string({ message: "Gender is required" })
    .min(1, { message: "Gender is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" }),
});
