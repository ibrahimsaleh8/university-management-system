import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
  user_id: z
    .string()
    .length(14, { message: "ID must be exactly 14 digits" })
    .regex(/^\d+$/, { message: "ID must contain only digits" }),
});

export type ForgotPasswordDataType = z.infer<typeof ForgotPasswordSchema>;
