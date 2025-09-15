import { MapPin } from "lucide-react";
import { StudentCourseResponse } from "./ShowStudentCourses";
import Image from "next/image";
type Props = {
  courseData: StudentCourseResponse;
};
export default function RegisterdCourseCard({ courseData }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 bg-card-bg rounded-lg p-4 border border-soft-border">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <p className="font-medium text-main-text capitalize text-sm">
          {courseData.courseDepartment.name} -{" "}
          {courseData.courseDepartment.code.toUpperCase()}
        </p>
        <p className="px-4 py-0.5 bg-[#302F33] rounded-sm text-xs">
          {courseData.courseHours} Hours
        </p>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-5">
        <p className="text-xl font-bold capitalize flex items-center gap-2">
          {courseData.courseName}{" "}
          <span className="text-sm text-low-white pt-2 font-medium">
            ({courseData.courseCode})
          </span>
          {courseData.courseIsElective && (
            <span className="text-sm text-low-white mt-2">(Elective)</span>
          )}
        </p>

        {/* Teacher Info */}
        <div className="flex items-end gap-3 flex-wrap justify-between">
          <div className="flex items-start gap-2 w-full sm:w-fit">
            <Image
              src={courseData.teacher.image}
              alt={"teacher-image"}
              className="w-9 h-9 object-center object-cover rounded-full"
              width={1000}
              height={1000}
            />
            <div className="flex flex-col gap-[1px] text-low-white">
              <p className="text-xs font-medium">
                {courseData.teacher.gender == "MALE" ? "Mr" : "Mrs"} /{" "}
                {`${courseData.teacher.first_name} ${courseData.teacher.last_name}`}
              </p>
              <p className="text-xs">{courseData.teacher.email}</p>
            </div>
          </div>

          <p className="px-4 py-1 bg-[#302F33] rounded-sm text-sm flex items-center gap-1">
            <MapPin className="w-4 h-4 text-main-text" />
            Hall : {courseData.hall}
          </p>
        </div>
      </div>
    </div>
  );
}
