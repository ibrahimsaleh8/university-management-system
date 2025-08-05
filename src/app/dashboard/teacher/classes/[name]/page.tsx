import { cookies } from "next/headers";
import ShowClassInfo from "../_components/ShowClassInfo";

export default async function ClassTeacherPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <ShowClassInfo token={token} />
    </div>
  );
}
