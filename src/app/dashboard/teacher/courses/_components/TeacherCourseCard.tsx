import { IoIosSchool } from "react-icons/io";
import { FaSchoolFlag } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { BookOpenText, Timer } from "lucide-react";
import { TeacherCoursesResponse } from "../page";
type CourseWithoutStudents = Omit<TeacherCoursesResponse, "id">;

export default function TeacherCourseCard({
  acdemicYear,
  courseCode,
  courseHours,
  courseName,
  hall,
  semester,
  students,
}: CourseWithoutStudents) {
  return (
    <div className="bg-Second-black  course-teacher-card overflow-hidden pb-8 rounded-lg p-3 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="p-2 bg-white rounded-md ">
          <BookOpenText className="w-5 h-5 text-Main-black" />
        </div>
        <p className="flex items-end gap-1">
          {courseName}
          <span className="text-xs">({courseCode})</span>
        </p>
        <p
          className={`ml-auto text-sm px-3 py-2 ${
            semester.isActive
              ? "bg-green-600 text-white"
              : "bg-amber-400 text-black"
          }  rounded-md`}>
          {semester.name}
        </p>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <p className="flex items-center gap-1 border-b border-soft-border pb-1">
          <Timer className="w-5 h-5 text-amber-300" />
          <span className="font-bold">Hours:</span> <span>{courseHours}</span>
        </p>
        <p className="flex items-center gap-1  border-b border-soft-border pb-1">
          <IoIosSchool className="w-5 h-5 text-sky-400" />
          <span className="font-bold">Year:</span> <span>{acdemicYear}</span>
        </p>
        <p className="flex items-center gap-1  border-b border-soft-border pb-1">
          <FaSchoolFlag className="w-5 h-5 text-red-500" />
          <span className="font-bold">Hall:</span> <span>{hall}</span>
        </p>
        <p className="flex items-center gap-1  border-b border-soft-border pb-1">
          <PiStudentBold className="w-5 h-5 text-main-text" />
          <span className="font-bold">Students:</span>
          <span>{students}</span>
        </p>
      </div>
    </div>
  );
}
