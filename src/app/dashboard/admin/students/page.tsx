import { cookies } from "next/headers";
import ShowStudentsTable from "./_components/ShowStudentsTable";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Students",
};

export default async function StudentsPage() {
  const token = (await cookies()).get("token")?.value as string;
  return <ShowStudentsTable token={token} />;
}
