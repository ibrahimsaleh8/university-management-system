import { cookies } from "next/headers";
import ShowTeacherData from "./_components/ShowTeacherData";

export default async function TeacherPageById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;

  return <ShowTeacherData teacher_id={id} token={token} />;
}
