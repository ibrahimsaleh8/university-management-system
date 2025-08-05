import { z } from "zod";
//   courseId: 0,
//         academicYearId: 0,
//         hall: "hall-1",
//         maxCapacity: 20,
//         semesterId: "sa",
//         teacherId: 10,
//         requiredCourses: {
//           create: {
//             courseId: 1,
//           },
//         },
export const addCourseOfferingSchema = z.object({
  courseId: z.number({
    required_error: "Course is required",
  }),
  academicYearId: z.number({
    required_error: "Acadimic Year is required",
  }),
});
