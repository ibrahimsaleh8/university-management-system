import { UserRound } from "lucide-react";
import StdSmallData from "./StdSmallData";
import { GenderType } from "@/lib/globalTypes";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
type Props = {
  userData: {
    student_id: string;
    first_name: string;
    last_name: string;
    department: {
      name: string;
      code: string;
    };
    created_at: Date;
    date_of_birth: Date;
    gender: GenderType;
    email: string;
    address: string;
    phone: string;

    _count: {
      courses: number;
      classes: number;
    };
  };
};
export default function ShowUserData({ userData }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 bg-main-dark rounded-2xl">
      <p className="font-bold text-white capitalize flex items-center gap-1">
        <UserRound className="w-5 h-5 text-main-text" />
        main data
      </p>
      <div className="flex items-center flex-wrap gap-6">
        <StdSmallData title="std id" value={userData.student_id} />
        <StdSmallData title="first name" value={userData.first_name} />
        <StdSmallData title="last name" value={userData.last_name} />
        <StdSmallData title="email" value={userData.email} />
        <StdSmallData title="address" value={userData.address} />
        <StdSmallData title="phone" value={userData.phone} />
        <StdSmallData title="gender" value={userData.gender.toLowerCase()} />
        <StdSmallData
          title="department"
          value={`${
            userData.department.name
          } - ${userData.department.code.toUpperCase()}`}
        />
        <StdSmallData
          title="Date of birth"
          value={GetDateFromTime(userData.date_of_birth)}
        />
        <StdSmallData
          title="Account Created at"
          value={GetDateFromTime(userData.created_at)}
        />
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
