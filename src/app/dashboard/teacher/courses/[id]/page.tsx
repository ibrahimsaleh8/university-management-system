import { Calendar, CalendarRange, CircleUser, Users } from "lucide-react";
import CourseCardDetails from "./_components/CourseCardDetails";
import { GetCourseMainData } from "./_components/actions/GetCourseMainData";
import ErrorMessageCard from "@/app/dashboard/_components/ErrorMessageCard";
import ShowCourseStudents from "./_components/ShowCourseStudents";
import { cookies } from "next/headers";
import BackButton from "@/app/dashboard/_components/forms/BackButton";

export default async function AssignCourseGrades({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value as string;

  const course = await GetCourseMainData(id);

  return !course ? (
    <ErrorMessageCard errorDescription="Invalid course id" />
  ) : (
    course && (
      <div className="flex flex-col gap-3 sm:p-2">
        <BackButton withText={false} />
        <div className="w-full rounded-2xl p-4 flex items-center flex-col gap-5 pb-8">
          <h1 className="text-2xl font-bold text-white capitalize">
            {course.course.name}{" "}
            {!course.course.name.toLowerCase().endsWith("course") && "Course"}
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            }}
            className="w-full gap-4">
            <CourseCardDetails
              icon={<CircleUser className="w-7 h-7 text-main-text" />}
              title="Teacher"
              value={`${course.teacher.gender == "MALE" ? "Mr." : "Mrs."} ${
                course.teacher.first_name
              } ${course.teacher.last_name}`}
            />
            <CourseCardDetails
              icon={<Calendar className="w-7 h-7 text-main-text" />}
              title="Year"
              value={course.academicYear.year_label}
            />
            <CourseCardDetails
              icon={<CalendarRange className="w-7 h-7 text-main-text" />}
              title="Semester"
              value={course.semester.name}
            />
            <CourseCardDetails
              icon={<Users className="w-7 h-7 text-main-text" />}
              title="Enrolled"
              value={`${course._count.students} / ${course.maxCapacity}`}
            />
          </div>
        </div>

        {/* Students */}
        <ShowCourseStudents courseId={id} token={token} />
      </div>
    )
  );
}
