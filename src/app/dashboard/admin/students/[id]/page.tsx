import { cookies } from "next/headers";
import ShowStudentData from "./_components/ShowStudentData";

export default async function ShowStudentDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <ShowStudentData token={token} id={id} />
    </div>
  );
}
