import prisma from "@/variables/PrismaVar";
import { VerifyUserFromToken } from "../VerifyUserFromToken";

export const adminVerification = async (token: string) => {
  const verifyUser = VerifyUserFromToken(token);
  if (!verifyUser) {
    return { isAdmin: false, data: null };
  }
  const adminAccount = await prisma.admin.findUnique({
    where: { email: verifyUser.email },
  });

  return adminAccount
    ? {
        isAdmin: true,
        data: {
          email: adminAccount.email,
        },
      }
    : { isAdmin: false, data: null };
};
