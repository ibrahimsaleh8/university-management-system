import prisma from "@/variables/PrismaVar";
import { VerifyUserFromToken } from "../VerifyUserFromToken";

export const studentVerification = async (token: string) => {
  const verifyUser = VerifyUserFromToken(token);
  if (!verifyUser) {
    return { isStudent: false, data: null };
  }
  const studentAccount = await prisma.student.findUnique({
    where: { email: verifyUser.email },
  });

  return studentAccount
    ? {
        isStudent: true,
        data: {
          email: studentAccount.email,
          id: studentAccount.id,
        },
      }
    : { isStudent: false, data: null };
};
