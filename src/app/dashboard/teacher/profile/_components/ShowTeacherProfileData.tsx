import { CircleUserRound } from "lucide-react";
import StdSmallData from "./StdSmallData";
import { GenderType } from "@/lib/globalTypes";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
type Props = {
  userData: {
    teacher_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    gender: GenderType;
    hire_date: Date;
    qualification: string;
    _count: {
      courses: number;
      classes: number;
    };
  };
};
export default function ShowTeacherProfileData({ userData }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 bg-Second-black rounded-2xl p-4">
      <p className="font-bold text-white capitalize flex items-center gap-1">
        <CircleUserRound className="w-5 h-5 text-main-text" />
        main data
      </p>
      <div className="flex items-center flex-wrap gap-6">
        <StdSmallData title="teacher id" value={userData.teacher_id} />
        <StdSmallData title="first name" value={userData.first_name} />
        <StdSmallData title="last name" value={userData.last_name} />
        <StdSmallData title="gender" value={userData.gender.toLowerCase()} />

        <StdSmallData
          title="Date of birth"
          value={GetDateFromTime(userData.date_of_birth)}
        />
        <StdSmallData
          title="hire date"
          value={GetDateFromTime(userData.hire_date)}
        />
        <StdSmallData title="qualification" value={userData.qualification} />

        <StdSmallData
          title="Total courses you joined"
          value={`${userData._count.courses} Courses`}
        />
        <StdSmallData
          title="Total Classes you joined"
          value={`${userData._count.classes} Classes`}
        />
      </div>
    </div>
  );
}
