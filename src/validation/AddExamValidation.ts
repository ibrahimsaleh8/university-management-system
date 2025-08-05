import { z } from "zod";

export const examValidationSchema = z
  .object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title cannot be empty"),

    startDate: z
      .string({
        required_error: "Start date is required",
      })
      .min(1, "Start date cannot be empty"),

    endDate: z
      .string({
        required_error: "End date is required",
      })
      .min(1, "End date cannot be empty"),

    duration: z
      .number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
      })
      .min(5, "Duration must be at least 5 minute"),

    totalMark: z
      .number({
        required_error: "Total mark is required",
        invalid_type_error: "Total mark must be a number",
      })
      .min(5, "Total mark must be at least 5 degree"),

    className: z.string({
      required_error: "Class Name is required",
    }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const examQuestionSchema = z.object({
  type: z.enum(["CHOOSE", "TRUE_FALSE", "WRITE"], {
    required_error: "Question type is required",
  }),

  mark: z
    .number({
      required_error: "Question mark is required",
      invalid_type_error: "Mark must be a number",
    })
    .min(1, "Mark must be at least 1"),

  question: z
    .string({
      required_error: "Question Title is required",
    })
    .min(1, "Question Title cannot be empty"),

  rightAnswer: z
    .string({
      required_error: "Right answer is required",
    })
    .min(1, "Right answer cannot be empty"),

  chooses: z
    .array(z.string().min(1, "Choice cannot be empty"))
    .min(2, "At least two choices are required")
    .optional(),
});

export type examMainDataType = z.infer<typeof examValidationSchema>;

export type examQuestionDataType = z.infer<typeof examQuestionSchema>;
