import { z } from "zod";

export const AttachmentFileTypeEnum = z.enum(["IMAGE", "PDF"]);

export const AnnouncementAttachmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Invalid URL"),
  type: AttachmentFileTypeEnum,
});

export type AnnouncementAttachmentDataType = z.infer<
  typeof AnnouncementAttachmentSchema
>;
