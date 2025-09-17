import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";
import { GenderType } from "@/lib/globalTypes";
import ShowTeacherProfileData from "./_components/ShowTeacherProfileData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherTopData from "./_components/TeacherTopData";
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
  department: {
    name: string;
  };
  created_at: Date;
  biography: string | null;
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
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const teacherData: TeacherResponse = await res.json();
  return (
    <div className="sm:p-4 flex flex-col gap-6 xl:w-[80%] md:w-[95%] w-full mx-auto ">
      {/* Top */}
      <TeacherTopData
        bio={teacherData.biography}
        created_at={teacherData.created_at}
        departmentName={teacherData.department.name}
        email={teacherData.email}
        first_name={teacherData.first_name}
        last_name={teacherData.last_name}
        image={teacherData.image}
        phone={teacherData.phone}
        teacher_id={teacherData.teacher_id}
        token={token}
      />

      <Tabs
        defaultValue="overview"
        className="bg-main-dark border border-soft-border p-4 rounded-2xl">
        <TabsList className="profile-tab-list">
          <TabsTrigger className="profile-tab-trigger" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="profile-tab-trigger" value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 sm:p-1 mt-5 lg:mt-5">
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
        </TabsContent>
        <TabsContent className="p-4 sm:p-1" value="password">
          <UpdateUserPasswrod role="teacher" token={token} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
