import { EditTeacherDataType } from "@/validation/EditTeacherSchema";

export type RoleType = "admin" | "teacher" | "student";
export type GenderType = "MALE" | "FEMALE";
export type AssignmentSubmissionStatus = "SUBMITTED" | "COMPLETED";
export type ErrorResponseType = {
  response: {
    data: {
      message: string;
    };
  };
};
export type EnrollmentStatus = "ACTIVE" | "WITHDRAWN" | "COMPLETED";

export type ExamStatusType = "SCHEDULED" | "ONGOING" | "ENDED" | "CANCELLED";
export type ExamQuestionType = "CHOOSE" | "TRUE_FALSE" | "WRITE";
export type TeacherDataResponse = {
  image: string;

  courses: {
    id: string;
    name: string;
    department: string;
    semester: {
      name: string;
      isActive: boolean;
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
  gender: string;
  date_of_birth: string;
  email: string;
  phone: string;
  image: string;
  courses: {
    id: string;
    name: string;
    code: string;
    status: string;
    finalGrade: number;
    enrollmentDate: string;
  }[];
  academicYear: string;
  department: {
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
};
