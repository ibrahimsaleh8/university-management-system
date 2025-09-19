import { cookies } from "next/headers";
import ShowClassInfo from "../_components/ShowClassInfo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Class",
};
export default async function ClassTeacherPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const token = (await (await cookies()).get("token")?.value) as string;
  const { name } = await params;
  return <ShowClassInfo className={name} token={token} />;
}
