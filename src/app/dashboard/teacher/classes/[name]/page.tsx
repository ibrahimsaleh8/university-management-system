import { cookies } from "next/headers";
import ShowClassInfo from "../_components/ShowClassInfo";

export default async function ClassTeacherPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const token = (await (await cookies()).get("token")?.value) as string;
  const { name } = await params;
  console.log("CLASS NAME ", name);
  return (
    <div>
      <ShowClassInfo className={name} token={token} />
    </div>
  );
}
