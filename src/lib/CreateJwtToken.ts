import Jwt from "jsonwebtoken";
export type jwtPayloadType = {
  userId: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};
export const CreateJwtToken = (user: jwtPayloadType) => {
  const token = Jwt.sign(user, process.env.jwt_token as string, {
    expiresIn: "7d",
  });
  return token;
};
