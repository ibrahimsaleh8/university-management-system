import { z } from "zod";

export const UniversityEventSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title of event should be more than 2 characters" }),

  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters long" }),

  time: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    },
    {
      message: "Time must be a valid future date",
    }
  ),
});

export type UniversityEventDataType = z.infer<typeof UniversityEventSchema>;
