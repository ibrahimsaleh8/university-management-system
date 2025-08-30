import { z } from "zod";
import { userGenderEnum } from "./AddTeacherSchema";
import { differenceInYears } from "date-fns";

export const editStudentSchema = z
  .object({
    student_id: z
      .string()
      .length(14, { message: "Student ID must be exactly 14 digits" })
      .regex(/^\d+$/, { message: "Student ID must contain only digits" }),
    first_name: z
      .string()
      .min(1, { message: "First name is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    image: z.string({
      required_error: "image is required",
    }),
    last_name: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    gender: userGenderEnum,
    date_of_birth: z.coerce.date({ message: "Date of birth is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    phone: z
      .string()
      .min(1, { message: "Phone is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    academicYearId: z.number({
      invalid_type_error: "Academic Year Id should be number",
      required_error: "Academic Year is Required",
    }),
    departmentId: z.number({
      invalid_type_error: "Department Id should be number",
      required_error: "Department is Required",
    }),
  })
  .refine((data) => differenceInYears(new Date(), data.date_of_birth) >= 18, {
    message: "Age must be at least 18 years",
    path: ["date_of_birth"],
  });
export type editStudentDataType = z.infer<typeof editStudentSchema>;
