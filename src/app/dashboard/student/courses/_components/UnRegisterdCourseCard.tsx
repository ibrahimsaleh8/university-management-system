import { Hourglass, MapPin, Users } from "lucide-react";
import { StudentCourseDataType } from "./RegisterAvailabelCourses";
import { differenceInHours } from "date-fns";
import RegisterCourseBtn from "./RegisterCourseBtn";
import Image from "next/image";

type Props = {
  courseData: StudentCourseDataType;
  token: string;
};

export default function UnRegisterdCourseCard({ courseData, token }: Props) {
  const isPassed = differenceInHours(
    new Date(courseData.semester.registerDeadline),
    new Date()
  );
  return (
    <div className="w-full flex flex-col gap-4 bg-card-bg rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 text-sm flex-wrap">
        <p className="font-medium text-main-text capitalize">
          {courseData.course_department.name} -{" "}
          {courseData.course_department.code.toUpperCase()}
        </p>
        <p className="flex items-center gap-1 font-bold text-low-white">
          <Users className="w-4 h-4" />
          {courseData.registerd} / {courseData.maxCapacity}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold capitalize">
          {courseData.course_name}{" "}
          <span className="text-sm text-low-white pt-2 font-medium">
            ({courseData.course_code})
          </span>
          {courseData.course_isElective && (
            <span className="text-sm text-low-white">(Elective)</span>
          )}
        </p>
        {courseData.requiredCourses.length > 0 && (
          <div className="text-sm text-[#ff0000] bg-[#2e1617] px-4 py-0.5 w-fit rounded-sm">
            Required Courses: {courseData.requiredCourses[0].name}
          </div>
        )}

        {/* Some Info */}
        <div className="flex items-center gap-1 flex-wrap">
          <p className="text-xs flex items-center gap-1 font-medium bg-Second-black w-fit px-4 py-0.5 rounded-sm text-low-white">
            <Hourglass className="w-3 h-3" />
            Hours : {courseData.course_hours}
          </p>
          <p className="text-xs flex items-center gap-1 font-medium bg-Second-black w-fit px-4 py-0.5 rounded-sm text-low-white">
            <MapPin className="w-3 h-3" />
            Hall : {courseData.hall}
          </p>
        </div>

        {/* Teacher Info */}
        <div className="flex items-start gap-2 w-full sm:w-fit">
          <Image
            width={1000}
            height={1000}
            src={courseData.teacher.image}
            alt={courseData.teacher.first_name}
            className="w-9 h-9 object-center object-cover rounded-full"
          />
          <div className="flex flex-col gap-[1px] text-low-white">
            <p className="text-xs font-medium">
              {courseData.teacher.gender == "MALE" ? "Mr" : "Mrs"} /{" "}
              {`${courseData.teacher.first_name} ${courseData.teacher.last_name}`}
            </p>
            <p className="text-xs">{courseData.teacher.email}</p>
          </div>
        </div>
      </div>
      <RegisterCourseBtn
        courseId={courseData.id}
        course_hours={courseData.course_hours}
        isEnrolled={courseData.isEnrolled}
        isPassed={isPassed}
        token={token}
        totalRegisterdHours={courseData.registerd}
      />
    </div>
  );
}
