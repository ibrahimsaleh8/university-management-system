import React from "react";
import ShowStudentClassInfo from "./_components/ShowStudentClassInfo";
import { cookies } from "next/headers";

export default async function StudentClassByNamePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const token = (await cookies()).get("token")?.value as string;
  const { name } = await await params;

  return (
    <div>
      <ShowStudentClassInfo name={name} token={token} />
    </div>
  );
}
