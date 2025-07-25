import z from "zod";

export const sendMessageSchema = z.object({
  chatId: z
    .string({
      required_error: "chat id is required",
    })
    .min(5, { message: "invalid chat id" }),
  message: z
    .string({
      required_error: "message is required",
    })
    .min(1, { message: "message is required" }),
});

export type SendChatMessageType = z.infer<typeof sendMessageSchema>;
