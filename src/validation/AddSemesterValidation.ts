import { z } from "zod";

export const addSemesterValidation = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters" }),

    startDate: z.coerce
      .date({
        message: "Start date is required",
        required_error: "Start date is required",
      })
      .min(new Date(), { message: "Start date must be in the future" }),

    endDate: z.coerce
      .date({
        message: "End date is required",
        required_error: "End date is required",
      })
      .min(new Date(), { message: "End date must be in the future" }),

    registerBegin: z.coerce
      .date({
        message: "Starting Register date is required",
        required_error: "Starting Register date is required",
      })
      .min(new Date(), {
        message: "Register begin date must be in the future",
      }),

    registerDeadline: z.coerce
      .date({
        message: "Deadline Register date is required",
        required_error: "Deadline Register date is required",
      })
      .min(new Date(), {
        message: "Register deadline date must be in the future",
      }),

    isActive: z
      .boolean({
        message: "Is Active is required",
        required_error: "Is Active is required",
      })
      .default(false),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const twoMonthsLater = new Date(data.startDate);
      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
      return data.endDate >= twoMonthsLater;
    },
    {
      message: "End date must be at least 2 months after start date",
      path: ["endDate"],
    }
  )
  .refine((data) => data.registerBegin < data.registerDeadline, {
    message: "Register begin date must be before deadline",
    path: ["registerDeadline"],
  })
  .refine((data) => data.registerBegin < data.startDate, {
    message: "Register date must be before semester starting date",
    path: ["registerBegin"],
  })
  .refine((data) => data.registerDeadline < data.startDate, {
    message: "Register deadline must be before semester starting date",
    path: ["registerDeadline"],
  });

export type addSemesterDataType = z.infer<typeof addSemesterValidation>;
