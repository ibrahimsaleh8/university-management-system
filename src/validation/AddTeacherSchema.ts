import { z } from "zod";
import { differenceInYears } from "date-fns";

export const userGenderEnum = z.enum(["MALE", "FEMALE"], {
  message: "Gender is required",
});

export const addTeacherSchema = z
  .object({
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
    hire_date: z.coerce.date({ message: "Hire date is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    phone: z
      .string()
      .min(1, { message: "Phone is required" })
      .max(20, { message: "Maximum characters is 20 chars" }),
    qualification: z.string().min(1, { message: "Qualification is required" }),
    teacher_id: z
      .string()
      .length(14, { message: "Teacher ID must be exactly 14 digits" })
      .regex(/^\d+$/, { message: "Teacher ID must contain only digits" }),
  })
  .refine((data) => differenceInYears(new Date(), data.date_of_birth) >= 20, {
    message: "Age must be at least 20 years",
    path: ["date_of_birth"],
  })
  .refine(
    (data) => differenceInYears(data.hire_date, data.date_of_birth) >= 20,
    {
      message: "Hire date must be at least 20 years after birth",
      path: ["hire_date"],
    }
  );

export type AddTeacherDataType = z.infer<typeof addTeacherSchema>;
