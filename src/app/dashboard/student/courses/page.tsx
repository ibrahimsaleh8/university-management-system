import { cookies } from "next/headers";
import ShowStudentCourses from "./_components/ShowStudentCourses";
import RegisterAvailabelCourses from "./_components/RegisterAvailabelCourses";

export default async function StudentCourses() {
  const token = (await cookies()).get("token")?.value as string;
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="sm:text-3xl text-2xl font-bold">My Courses Enrollment</p>
        <p className="text-sm text-low-white">
          Manage your registered courses and explore new ones
        </p>
      </div>
      <div className="flex gap-10 w-full xl:flex-row flex-col">
        <div className="xl:w-[70%] w-full xl:min-w-96">
          <ShowStudentCourses token={token} />
        </div>
        <div className="xl:w-[30%] w-full xl:min-w-96">
          <RegisterAvailabelCourses token={token} />
        </div>
      </div>
    </div>
  );
}
