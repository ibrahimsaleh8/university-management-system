import { cookies } from "next/headers";
import ShowClassInfo from "../_components/ShowClassInfo";

export default async function ClassTeacherPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const token = (await (await cookies()).get("token")?.value) as string;
  const { name } = await params;
  return <ShowClassInfo className={name} token={token} />;
}
