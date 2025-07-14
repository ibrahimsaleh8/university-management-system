import { cookies } from "next/headers";
import ShowAddingExam from "./_components/ShowAddingExam";

export default async function AddExamPage() {
  const token = (await cookies()).get("token")?.value as string;
  return <ShowAddingExam token={token} />;
}
