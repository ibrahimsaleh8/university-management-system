import { cookies } from "next/headers";
import ShowExamDetails from "./_components/ShowExamDetails";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Exam",
};
export default async function ShowStudentExamById({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const { id, name } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div className="flex flex-col gap-3">
      <BackButton withText={false} />

      <ShowExamDetails
        className={name.split("%20").join(" ")}
        examId={id}
        token={token}
      />
    </div>
  );
}
