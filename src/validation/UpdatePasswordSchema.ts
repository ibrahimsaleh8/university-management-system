import z from "zod";

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Your current password is required",
      })
      .min(1, { message: "Your current password is required" }),
    newPassword: z
      .string({
        required_error: "New password is required",
      })
      .min(8, { message: "Minimum password length is 8 characters" }),
    reEnterNewPassword: z
      .string({
        required_error: "Please re-enter the new password",
      })
      .min(8, { message: "Minimum password length is 8 characters" }),
  })
  .refine((data) => data.newPassword === data.reEnterNewPassword, {
    path: ["reEnterNewPassword"],
    message: "Passwords don't match",
  });

export type UpdatePasswordDataType = z.infer<typeof UpdatePasswordSchema>;
