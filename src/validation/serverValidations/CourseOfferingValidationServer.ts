import { z } from "zod";

export const courseOfferingValidationServer = z.object({
  courseId: z
    .number({
      required_error: "Course is required",
    })
    .min(1, { message: "Course is required" }),

  academicYearId: z
    .number({
      required_error: "Academic Year is required",
    })
    .min(1, { message: "Academic Year is required" }),

  teacherId: z
    .number({
      required_error: "Teacher is required",
    })
    .min(1, { message: "Teacher is required" }),

  requiredCoursesId: z
    .number({
      required_error: "Required Course is required",
    })
    .min(1, { message: "Required Course is required" })
    .optional(), // keep it optional if you actually want it optional, but still allows required_error for better error messages when provided incorrectly

  semesterId: z
    .string({
      required_error: "Semester is required",
    })
    .min(1, { message: "Semester is required" }),

  hall: z
    .string({
      required_error: "Hall is required",
    })
    .min(1, { message: "Hall is required" }),

  maxCapacity: z
    .number({
      required_error: "Max Capacity is required",
    })
    .min(1, { message: "Max Capacity is required" }),
});

export type courseOfferingDataType = z.infer<
  typeof courseOfferingValidationServer
>;
