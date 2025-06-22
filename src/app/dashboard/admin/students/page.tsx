import { cookies } from "next/headers";
import ShowStudentsTable from "./_components/ShowStudentsTable";

export default async function StudentsPage() {
  const token = (await cookies()).get("token");
  return (
    <div>
      <ShowStudentsTable token={token?.value as string} />
    </div>
  );
}
