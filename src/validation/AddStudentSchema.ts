import { z } from "zod";
import { userGenderEnum } from "./AddTeacherSchema";
import { differenceInYears } from "date-fns";

export const addStudentSchema = z
  .object({
    student_id: z
      .string()
      .length(14, { message: "Student ID must be exactly 14 digits" })
      .regex(/^\d+$/, { message: "Student ID must contain only digits" }),
    first_name: z
      .string()
      .min(1, { message: "First name is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    last_name: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    gender: userGenderEnum,
    password: z.string().min(8, { message: "Minimum for password is 8 chars" }),
    date_of_birth: z.coerce.date({ message: "Date of birth is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    phone: z
      .string()
      .min(1, { message: "Phone is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    classId: z.number({
      invalid_type_error: "Class Id should be number",
      required_error: "Class is Required",
    }),
  })
  .refine((data) => differenceInYears(new Date(), data.date_of_birth) >= 18, {
    message: "Age must be at least 18 years",
    path: ["date_of_birth"],
  });
export type addStudentDataType = z.infer<typeof addStudentSchema>;
