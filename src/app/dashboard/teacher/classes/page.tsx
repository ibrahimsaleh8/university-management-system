import { cookies } from "next/headers";
import AddingModel from "../../_components/forms/AddingModel";
import ShowTeacherClasses from "./_components/ShowTeacherClasses";

export default async function TeacherClassesPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <div className="flex items-center justify-between flex-col sm:flex-row flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold text-main-text">My Classrooms</p>
          <p className="text-sm text-low-white">
            An overview of all your active teaching environments.
          </p>
        </div>
        <AddingModel token={token} AddType="Class" />
      </div>

      <ShowTeacherClasses token={token} />
    </div>
  );
}
