export type RoleType = "admin" | "teacher" | "student";
export type GenderType = "MALE" | "FEMALE";
export type ErrorResponseType = {
  response: {
    data: {
      message: string;
    };
  };
};
