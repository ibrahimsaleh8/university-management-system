import { IoIosSchool } from "react-icons/io";
import { FaSchoolFlag } from "react-icons/fa6";
import { CalendarDays, Timer } from "lucide-react";
import { TeacherCoursesResponse } from "../page";
import CourseSmallData from "./CourseSmallData";
import { Progress } from "@/components/animate-ui/radix/progress";

type CourseWithoutStudents = Omit<TeacherCoursesResponse, "id">;

export default function TeacherCourseCard({
  acdemicYear,
  courseCode,
  courseHours,
  courseName,
  hall,
  courseIsElective,
  semester,
  maxCapacity,
  students,
}: CourseWithoutStudents) {
  return (
    <div className="bg-Second-black overflow-hidden pb-8 rounded-lg p-4 pt-5 flex flex-col gap-4 border border-soft-border">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap border-b border-Second-Card-bg pb-5">
        <div className="flex flex-col gap-2 w-fit line-clamp-2 text-ellipsis  ">
          <p className="text-main-text text-xl font-bold capitalize">
            {courseName}
          </p>
          <p className="text-sm text-low-white capitalize">{courseCode}</p>
        </div>

        <div>
          {courseIsElective ? (
            <p className="bg-glass-blue text-blue-400 px-3 py-1 rounded-md text-xs">
              Elective
            </p>
          ) : (
            <p className="bg-glass-green text-main-text px-3 py-1 rounded-md text-xs">
              Core
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 mt-3 border-b border-Second-Card-bg pb-4">
        <CourseSmallData
          title="Credit Hours"
          icon={<Timer className="w-4 h-4" />}
          value={`${courseHours}`}
        />
        <CourseSmallData
          title="Academic Year"
          icon={<IoIosSchool className="w-4 h-4" />}
          value={acdemicYear}
        />
        <CourseSmallData
          title="Lecture Hall"
          icon={<FaSchoolFlag className="w-4 h-4" />}
          value={hall}
        />
        <CourseSmallData
          title="Semester"
          icon={<CalendarDays className="w-4 h-4" />}
          value={semester.name}
        />
      </div>

      {/* Enrollment */}
      <div className="flex flex-col gap-1">
        {/* Text */}
        <div className="text-sm font-medium flex items-center justify-between gap-2 flex-wrap">
          <p className=" text-low-white">Enrollment</p>
          <p className="text-main-text">
            {students} / {maxCapacity}
          </p>
        </div>

        <Progress value={Math.round((students / maxCapacity) * 100)} />
      </div>
    </div>
  );
}
