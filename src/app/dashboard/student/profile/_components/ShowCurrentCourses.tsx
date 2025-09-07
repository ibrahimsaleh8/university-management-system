import { BookOpenText } from "lucide-react";
import { StudentProfileCoursesDataType } from "../page";
import StudentProfileCourseCard from "./StudentProfileCourseCard";

export default function ShowCurrentCourses({
  courses,
}: {
  courses: StudentProfileCoursesDataType[];
}) {
  return (
    <div className="w-full  min-h-full bg-Second-black rounded-2xl p-4">
      <p className="font-bold text-white flex items-center gap-1 capitalize">
        <BookOpenText className="w-5 h-5 text-main-text" />
        current courses
      </p>

      <div className="flex flex-col gap-4 pt-2">
        {courses.length > 0 ? (
          courses.map((course) => (
            <StudentProfileCourseCard courseData={course} key={course.id} />
          ))
        ) : (
          <div className="p-4 w-full flex items-center justify-center text-low-white capitalize">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
}
