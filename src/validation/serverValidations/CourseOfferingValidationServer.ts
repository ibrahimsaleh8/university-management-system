import { z } from "zod";

export const courseOfferingValidationServer = z.object({
  courseId: z.number().min(1, { message: "Course is required" }),
  academicYearId: z.number().min(1, { message: "Academic Year is required" }),
  maxCapacity: z.number().min(1, { message: "Max Capacity is required" }),
  teacherId: z.number().min(1, { message: "Teacher is required" }),
  requiredCoursesId: z
    .number()
    .min(1, { message: "Required Course is required" })
    .optional(),
  hall: z.string().min(1, { message: "Hall is required" }),
  semesterId: z.string().min(1, { message: "Semester is required" }),
});

export type courseOfferingDataType = z.infer<
  typeof courseOfferingValidationServer
>;
