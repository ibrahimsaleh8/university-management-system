export type RoleType = "admin" | "teacher" | "student";
export type GenderType = "MALE" | "FEMALE";
export type ErrorResponseType = {
  response: {
    data: {
      message: string;
    };
  };
};
export type ExamStatusType = "SCHEDULED" | "ONGOING" | "ENDED" | "CANCELLED";
export type ExamQuestionType = "CHOOSE" | "TRUE_FALSE" | "WRITE";
