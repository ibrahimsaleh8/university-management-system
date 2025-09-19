import { cookies } from "next/headers";
import ShowStudentsSubmissons from "./_components/ShowStudentsSubmissons";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Exam Submissions",
};
export default async function ExamSubmissons({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const { id, name } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <h1 className="text-2xl font-bold mx-auto w-fit">Submissions</h1>
      <ShowStudentsSubmissons className={name} examId={id} token={token} />
    </div>
  );
}
