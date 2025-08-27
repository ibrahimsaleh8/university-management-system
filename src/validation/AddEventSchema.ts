import { z } from "zod";

export const UniversityEventSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title of event should be more than 2 characters" }),
  location: z.string({
    required_error: "Location is required",
  }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters long" }),

  time: z.coerce
    .date({ required_error: "Time is required" })
    .refine((date) => date.getTime() > Date.now(), {
      message: "Time must be a valid future date",
    }),
});

export type UniversityEventDataType = z.infer<typeof UniversityEventSchema>;
