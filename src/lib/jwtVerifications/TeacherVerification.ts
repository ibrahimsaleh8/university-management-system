import prisma from "@/variables/PrismaVar";
import { VerifyUserFromToken } from "../VerifyUserFromToken";

export const teacherVerification = async (token: string) => {
  const verifyUser = VerifyUserFromToken(token);
  if (!verifyUser) {
    return { isTeacher: false, data: null };
  }
  const teacherAccount = await prisma.teacher.findUnique({
    where: { email: verifyUser.email },
  });

  return teacherAccount
    ? {
        isTeacher: true,
        data: {
          email: teacherAccount.email,
          id: teacherAccount.id,
        },
      }
    : { isTeacher: false, data: null };
};
