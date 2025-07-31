import { Button } from "@/components/ui/button";
import { Megaphone, Settings, UserPlus } from "lucide-react";
import { PiStudent } from "react-icons/pi";
import ClassSmallData from "./ClassSmallData";
import { MdOutlineAssignment } from "react-icons/md";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { UnregisterdClassesResponse } from "./ShowUnRegisterdClasses";
type Props = {
  classData: UnregisterdClassesResponse;
};
export default function UnRegisterdClassCard({ classData }: Props) {
  return (
    <div className="w-full bg-Second-black flex flex-col gap-8 rounded-sm p-4 border border-soft-border">
      {/* Header */}
      <div className="flex items-center sm:flex-row flex-col justify-between gap-3 flex-wrap">
        {/* Teacher Info */}
        <div className="flex items-start gap-2 w-full sm:w-fit  ">
          <img
            src={classData.teacher.image}
            alt={`teacher iamge ${classData.teacher.first_name}`}
            className="w-12 h-12 object-center object-cover rounded-full"
          />
          <div className="flex flex-col gap-0.5 pt-1">
            <p className="text-sm font-medium">
              {classData.teacher.gender == "MALE" ? "Mr/ " : "Mrs/ "}

              {`${classData.teacher.first_name} ${classData.teacher.last_name}`}
            </p>
            <p className="text-xs text-low-white">{classData.teacher.email}</p>
          </div>
        </div>

        {/* Class Name */}
        <div className="flex flex-col gap-[1px] text-center">
          <p className="font-bold text-lg uppercase">{classData.name}</p>
          <p className="text-sm text-low-white font-medium">
            ({classData.course.name})
          </p>
        </div>

        {/* Created At */}
        <p className="text-xs text-low-white mb-auto hidden sm:flex">
          {GetDateFromTime(classData.created_at)}
        </p>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <div className="flex items-center gap-4 flex-wrap mt-auto">
          <ClassSmallData
            icon={<Settings className="w-5 h-5 text-low-white" />}
            text={`Department: ${
              classData.course.department.name
            } - ${classData.course.department.code.toUpperCase()}`}
          />
          <ClassSmallData
            icon={<PiStudent className="w-5 h-5 text-low-white" />}
            text="Students"
            number={classData.studentsNumber}
          />
          <ClassSmallData
            icon={<Megaphone className="w-5 h-5 text-low-white" />}
            text="Announcements"
            number={classData.announcementsNumber}
          />
          <ClassSmallData
            icon={<MdOutlineAssignment className="w-5 h-5 text-low-white" />}
            text="Assignments"
            number={classData.assignmentsNumber}
          />
        </div>
        <Button className="sm:w-28 w-full" variant={"mainWithShadow"}>
          <UserPlus />
          Join
        </Button>
      </div>
    </div>
  );
}
