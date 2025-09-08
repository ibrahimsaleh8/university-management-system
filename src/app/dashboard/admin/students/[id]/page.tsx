import { cookies } from "next/headers";
import ShowStudentData from "./_components/ShowStudentData";
import { GetStudentSchedual } from "./_components/actions/GetStudentSchedual";

export default async function ShowStudentDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;
  const schedualData = await GetStudentSchedual(id);

  return (
    <div className="flex flex-col gap-3">
      <ShowStudentData schedualData={schedualData} token={token} id={id} />
    </div>
  );
}
