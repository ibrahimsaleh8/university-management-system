import { z } from "zod";

export const addSemesterValidation = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters" }),

    startDate: z.coerce.date({
      message: "Start date is required",
      required_error: "Start date is required",
    }),

    endDate: z.coerce.date({
      message: "End date is required",
      required_error: "End date is required",
    }),

    registerBegin: z.coerce.date({
      message: "Starting Register date is required",
      required_error: "Starting Register date is required",
    }),

    registerDeadline: z.coerce.date({
      message: "Deadline Register date is required",
      required_error: "Deadline Register date is required",
    }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  })
  .refine((data) => data.registerBegin < data.registerDeadline, {
    message: "Register begin date must be before deadline",
    path: ["registerDeadline"],
  })
  .refine((data) => data.registerBegin >= data.startDate, {
    message: "Register begin date must be after or equal to semester start",
    path: ["registerBegin"],
  });

export type addSemesterDataType = z.infer<typeof addSemesterValidation>;
