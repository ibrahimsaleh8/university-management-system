import z from "zod";

export const CreateMessageSchema = z.object({
  emailFrom: z
    .string({ required_error: "Sender email is required" })
    .email("Sender email must be a valid email address"),

  emailTo: z
    .string({ required_error: "Recipient email is required" })
    .email("Recipient email must be a valid email address"),

  message: z
    .string({ required_error: "Message is required" })
    .min(1, "Message cannot be empty"),

  senderRole: z.string({ required_error: "Sender Role is Required" }),

  receiverRole: z.string({ required_error: "Receiverole is Required" }),
});

export type CreateMessageDataType = z.infer<typeof CreateMessageSchema>;
export type MessageRoles = "ADMIN" | "TEACHER" | "STUDENT";
