import Jwt from "jsonwebtoken";

export const VerifyUserFromToken = (token: string) => {
  try {
    const UserPayload = Jwt.verify(token, process.env.jwt_token as string) as {
      userId: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
    };
    return UserPayload;
  } catch {
    return null;
  }
};
