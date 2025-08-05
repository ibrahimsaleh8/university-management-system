import { z } from "zod";

export const announcementReplySchema = z.object({
  announcementId: z
    .string({ required_error: "Announcement ID is required" })
    .min(1, { message: "Announcement ID cannot be empty" }),

  content: z
    .string({ required_error: "Reply content is required" })
    .min(1, { message: "Reply content cannot be empty" }),
});
export type announcementReplyDataType = z.infer<typeof announcementReplySchema>;
