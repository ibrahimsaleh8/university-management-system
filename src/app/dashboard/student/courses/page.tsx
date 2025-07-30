import { cookies } from "next/headers";
import ShowStudentCourses from "./_components/ShowStudentCourses";
import RegisterAvailabelCourses from "./_components/RegisterAvailabelCourses";

export default async function StudentCourses() {
  const token = (await cookies()).get("token")?.value as string;
  return (
    <div className="flex flex-col gap-10">
      <RegisterAvailabelCourses token={token} />
      <ShowStudentCourses token={token} />
    </div>
  );
}
