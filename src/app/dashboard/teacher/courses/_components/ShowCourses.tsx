import { CalendarDays } from "lucide-react";
import { TeacherCoursesResponse } from "../page";
import TeacherCourseCard from "./TeacherCourseCard";

export default function ShowCourses({
  activeCourses,
  notActiveCourses,
}: {
  activeCourses: TeacherCoursesResponse[];
  notActiveCourses: TeacherCoursesResponse[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl text-main-text">My Courses</h1>
          <p className="text-sm text-low-white capitalize">
            all courses that registered to be their mentor at current semester
          </p>
        </div>
        {activeCourses.length > 0 && (
          <p className="flex items-center gap-1 font-medium text-sm bg-glass-green text-main-text w-fit p-3 rounded-md ml-auto">
            <CalendarDays className="w-4 h-4" />
            {activeCourses[0].semester.name}
          </p>
        )}
      </div>

      {activeCourses.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(330px , 1fr))",
            gap: "10px",
          }}>
          {activeCourses.map((course) => (
            <TeacherCourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="w-full bg-Second-black rounded-md h-32 flex items-center justify-center text-low-white">
          No courses Found..
        </div>
      )}
      {notActiveCourses.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="capitalize font-medium text-lg text-low-white ">
            past semester courses
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(330px , 1fr))",
              gap: "10px",
            }}>
            {notActiveCourses.map((course) => (
              <TeacherCourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
