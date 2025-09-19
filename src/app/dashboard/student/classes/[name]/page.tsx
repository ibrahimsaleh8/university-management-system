import React from "react";
import ShowStudentClassInfo from "./_components/ShowStudentClassInfo";
import { cookies } from "next/headers";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Class",
};
export default async function StudentClassByNamePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const token = (await cookies()).get("token")?.value as string;
  const { name } = await await params;

  return (
    <div className="flex flex-col gap-2">
      <BackButton withText={false} />
      <ShowStudentClassInfo name={name} token={token} />
    </div>
  );
}
