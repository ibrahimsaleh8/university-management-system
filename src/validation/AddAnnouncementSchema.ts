import { z } from "zod";
export const AddAnnouncementSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  classId: z.number({ required_error: "Class is required" }),
});
export type addAnnouncementDataType = z.infer<typeof AddAnnouncementSchema>;
