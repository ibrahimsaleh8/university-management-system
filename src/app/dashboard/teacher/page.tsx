import React from "react";
import ShowMainSchedual from "./_components/ShowMainSchedual";
import { cookies } from "next/headers";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";

export default async function TeacherDashboardPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  const user = VerifyUserFromToken(token);

  return (
    <div>
      <ShowMainSchedual uid={user?.userId as number} />
    </div>
  );
}
