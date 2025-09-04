import z from "zod";
const operation = z.enum(["ADD", "REMOVE"], {
  message: "Operation is required",
});
const reaction = z.enum(["LIKE", "DISLIKE"], {
  message: "Operation is required",
});
export const CreateAnnouncmentReactionSchema = z.object({
  announcmentId: z.string({
    required_error: "Announcment id is required",
  }),
  operation,
  reaction,
});

export type AnnouncmentReactionDataType = z.infer<
  typeof CreateAnnouncmentReactionSchema
>;
