import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const token = await (await cookies()).get("token");
  if (!token) {
    redirect("/");
  }
  const user = await VerifyUserFromToken(token.value);
  if (!user) {
    redirect("/");
  }
  if (user.role) {
    redirect(`/dashboard/${user.role}`);
  }

  return <></>;
}
