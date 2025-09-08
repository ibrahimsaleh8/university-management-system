import { EditTeacherDataType } from "@/validation/EditTeacherSchema";

export type RoleType = "admin" | "teacher" | "student";
export type GenderType = "MALE" | "FEMALE";
export type AssignmentSubmissionStatus = "SUBMITTED" | "GRADED";
export type ErrorResponseType = {
  response: {
    data: {
      message: string;
    };
  };
};
export type EnrollmentStatus = "ACTIVE" | "WITHDRAWN" | "COMPLETED";

export type ExamStatusType =
  | "SCHEDULED"
  | "ONGOING"
  | "ENDED"
  | "CANCELLED"
  | "GRADED";
export type ExamQuestionType = "CHOOSE" | "TRUE_FALSE" | "WRITE";
export type TeacherDataResponse = {
  image: string;
  department: string;
  courses: {
    id: string;
    name: string;
    code: string;
    credits: number;
    semester: {
      name: string;
    };
  }[];
  schedules: {
    id: string;
    day: string;
    time: string;
    title: string;
    hall: string;
    academicYear: string;
    teacher: string;
  }[];
} & EditTeacherDataType;

export type StudentResponse = {
  student_id: string;
  first_name: string;
  last_name: string;
  address: string;
  gender: GenderType;
  date_of_birth: Date;
  email: string;
  phone: string;
  image: string;
  courses: {
    id: string;
    name: string;
    code: string;
    credits: number;
    semester: {
      name: string;
    };
    studentData: {
      finalGrade: number;
      status: EnrollmentStatus;
    };
  }[];
  academicYear: string;
  academicYearId: number;
  department: {
    id: number;
    name: string;
    code: string;
  };
  classes: {
    name: string;
    classGrade: number;
    teacher: {
      first_name: string;
      last_name: string;
      image: string;
    };
  }[];
  created_at: Date;
};
