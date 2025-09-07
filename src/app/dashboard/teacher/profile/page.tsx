import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";
import { GenderType } from "@/lib/globalTypes";
import UpdateUserImage from "../../_components/profile/UpdateUserImage";
import UserContactInformation from "../../_components/Details/UserContactInformation";
import ShowTeacherProfileData from "./_components/ShowTeacherProfileData";
import { Mail, Phone } from "lucide-react";
export type TeacherResponse = {
  teacher_id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  address: string;
  date_of_birth: Date;
  gender: GenderType;
  phone: string;
  hire_date: Date;
  qualification: string;
  _count: {
    courses: number;
    classes: number;
  };
};

export default async function StudentProfilePage() {
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(`${MainDomain}/api/get/profile/teacher`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["teacher_data"],
    },
  });

  const teacherData: TeacherResponse = await res.json();

  return (
    <div className="sm:p-4 flex flex-col gap-6 w-[80%] mx-auto ">
      {/* Top */}
      <div className="bg-Second-black border border-soft-border rounded-2xl p-4 flex gap-3 flex-wrap">
        <div className="flex justify-between gap-3 w-fit">
          <UpdateUserImage
            role="teacher"
            token={token}
            userImage={teacherData.image}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Dr. {teacherData.first_name} {teacherData.last_name}
          </h1>
          <p className="text-sm text-main-text">ID: {teacherData.teacher_id}</p>
          <p className="flex items-center gap-3 text-low-white">
            <Mail className="w-4 h-4" />
            {teacherData.email}
          </p>
          <p className="flex items-center gap-3 text-low-white">
            <Phone className="w-4 h-4" />
            {teacherData.phone}
          </p>
        </div>
      </div>

      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="sm:min-w-96">
          <UserContactInformation
            address={teacherData.address}
            email={teacherData.email}
            phone={teacherData.phone}
          />
        </div>

        <ShowTeacherProfileData
          userData={{
            _count: teacherData._count,
            date_of_birth: teacherData.date_of_birth,
            first_name: teacherData.first_name,
            gender: teacherData.gender,
            hire_date: teacherData.hire_date,
            last_name: teacherData.last_name,
            qualification: teacherData.qualification,
            teacher_id: teacherData.teacher_id,
          }}
        />
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <UpdateUserPasswrod role="teacher" token={token} />
      </div>
    </div>
  );
}
