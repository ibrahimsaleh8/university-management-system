import { ChevronsRight, Megaphone, Settings } from "lucide-react";
import { PiStudent } from "react-icons/pi";
import ClassSmallData from "./ClassSmallData";
import { MdOutlineAssignment } from "react-icons/md";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { StudentClassesResponseType } from "./ShowUnRegisterdClasses";
import JoinClassBtn from "./JoinClassBtn";
import Link from "next/link";
type Props = {
  classData: StudentClassesResponseType;
  token: string;
  type: "join" | "show";
};
export default function StudentClassCard({ classData, token, type }: Props) {
  return (
    <div className="max-w-96 overflow-hidden bg-card-bg flex flex-col gap-3 rounded-sm p-4 border border-soft-border">
      <div className="w-full rounded-md overflow-hidden flex items-center justify-center">
        <img
          className="w-full"
          src={classData.wideImage}
          alt="Class Room Image"
        />
      </div>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Class Name */}
        <div className="flex gap-[1px] items-center justify-between flex-wrap">
          <p className="font-bold text-xl uppercase line-clamp-1 text-main-text">
            {classData.name}
          </p>
          <p className="text-sm text-low-white font-medium">
            ({classData.course.name})
          </p>
        </div>
        {/* Created At */}
        <p className="text-xs text-low-white hidden sm:flex ml-auto">
          {GetDateFromTime(classData.created_at)}
        </p>

        {/* Teacher Info */}
        <div className="flex items-start gap-2 w-full sm:w-fit">
          <img
            src={classData.teacher.image}
            alt={`teacher iamge ${classData.teacher.first_name}`}
            className="w-10 h-10 object-center object-cover rounded-full"
          />
          <div className="flex flex-col gap-0.5 pt-1">
            <p className="text-sm font-medium">
              {classData.teacher.gender == "MALE" ? "Mr/ " : "Mrs/ "}

              {`${classData.teacher.first_name} ${classData.teacher.last_name}`}
            </p>
            <p className="text-xs text-low-white">{classData.teacher.email}</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex items-center justify-between gap-4 flex-wrap mt-auto">
          <ClassSmallData
            icon={<Settings className="w-4 h-4 text-low-white" />}
            text={`Department: ${
              classData.course.department.name
            } - ${classData.course.department.code.toUpperCase()}`}
          />
          <ClassSmallData
            icon={<PiStudent className="w-4 h-4 text-low-white" />}
            text="Students"
            number={classData.studentsNumber}
          />
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap mt-auto">
          <ClassSmallData
            icon={<Megaphone className="w-4 h-4 text-low-white" />}
            text="Announcements"
            number={classData.announcementsNumber}
          />
          <ClassSmallData
            icon={<MdOutlineAssignment className="w-4 h-4 text-low-white" />}
            text="Assignments"
            number={classData.assignmentsNumber}
          />
        </div>
        {type == "join" ? (
          <JoinClassBtn classId={classData.id} token={token} />
        ) : (
          <Link
            className="bg-transparent flex items-center gap-1 px-4 py-1 border text-sm border-main-text rounded-sm text-main-text hover:bg-main-text hover:text-black duration-300 font-medium w-full  justify-center"
            href={`/dashboard/student/classes/${classData.name}`}>
            Enter Class Room
            <ChevronsRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
