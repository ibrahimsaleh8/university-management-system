import { z } from "zod";

const DaysOfweek = z.enum(
  ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"],
  {
    message: "Day is required",
  }
);

export const courseTimeSchema = z.object({
  dayOfWeek: DaysOfweek,
  startTime: z.string({
    required_error: "Start time is required",
  }),
  courseOfferingId: z.string({
    required_error: "Course is required",
  }),
});

export type courseTimeDataType = z.infer<typeof courseTimeSchema>;
export type DaysOfweekType = z.infer<typeof DaysOfweek>;
