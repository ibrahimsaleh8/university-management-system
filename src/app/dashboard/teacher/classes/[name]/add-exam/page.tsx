import { cookies } from "next/headers";
import ShowAddingExam from "./_components/ShowAddingExam";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Exam",
};
export default async function AddExamPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const token = (await cookies()).get("token")?.value as string;
  const { name } = await params;
  return <ShowAddingExam className={name} token={token} />;
}
