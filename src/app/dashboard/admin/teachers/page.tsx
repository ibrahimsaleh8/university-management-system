import { cookies } from "next/headers";
import TableShowTeachers from "./_components/TableShowTeachers";

export default async function TeachersTable() {
  const token = (await cookies()).get("token")?.value as string;
  return <TableShowTeachers token={token} />;
}
