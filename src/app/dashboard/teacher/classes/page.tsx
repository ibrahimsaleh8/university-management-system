import { cookies } from "next/headers";
import AddingModel from "../../_components/forms/AddingModel";
import ShowTeacherClasses from "./_components/ShowTeacherClasses";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";

export default async function TeacherClassesPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  const user = VerifyUserFromToken(token);
  return (
    <div>
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <p className="text-sm font-bold">Classes</p>
        <AddingModel token={token} AddType="Class" />
      </div>

      <ShowTeacherClasses uid={user?.userId as number} />
    </div>
  );
}
