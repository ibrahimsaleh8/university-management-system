import { z } from "zod";

export const AddExamSchema = z
  .object({
    title: z.string().min(1, "Title cannot be empty"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    duration: z.number().min(5, "Duration must be at least 5 minutes"),
    totalMark: z.number().min(5, "Total mark must be at least 5 degrees"),
    autoMark: z.boolean().default(true),
    className: z.string().min(1, "Class Name is required"),

    questions: z
      .array(
        z.object({
          type: z.enum(["CHOOSE", "TRUE_FALSE", "WRITE"]),
          mark: z.number().min(1, "Mark must be at least 1"),
          question: z.string().min(1, "Question Title cannot be empty"),
          rightAnswer: z.string().min(1, "Right answer cannot be empty"),
          chooses: z
            .array(z.string().min(1, "Choice cannot be empty"))
            .optional(),
        })
      )
      .min(1, "At least one question is required")
      .superRefine((questions, ctx) => {
        questions.forEach((q, idx) => {
          if (q.type === "CHOOSE") {
            if (!q.chooses || q.chooses.length < 2) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CHOOSE questions must have at least two choices",
                path: [idx, "chooses"],
              });
            }
          } else {
            if (q.chooses && q.chooses.length > 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${q.type} questions must not have choices`,
                path: [idx, "chooses"],
              });
            }
          }
        });
      }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine((data) => data.startDate > new Date(), {
    message: "Start date must be in the future",
    path: ["startDate"],
  });

export type ExamDataType = z.infer<typeof AddExamSchema>;
