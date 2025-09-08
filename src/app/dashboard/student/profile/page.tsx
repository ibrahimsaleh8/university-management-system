import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";
import { EnrollmentStatus, GenderType } from "@/lib/globalTypes";
import ShowUserData from "./_components/ShowUserData";
import ShowCurrentCourses from "./_components/ShowCurrentCourses";
import StudentProfileTopData from "./_components/StudentProfileTopData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export type StudentProfileCoursesDataType = {
  id: string;
  status: EnrollmentStatus;
  courseOffering: {
    course: {
      name: string;
      code: string;
    };
  };
};
export type StudentResponse = {
  student_id: string;
  first_name: string;
  last_name: string;
  image: string;
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
  courses: StudentProfileCoursesDataType[];
  _count: {
    courses: number;
    classes: number;
  };
  academicYear: {
    year_label: string;
  };
};

export default async function StudentProfilePage() {
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(`${MainDomain}/api/get/profile/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["student_data"],
    },
  });

  const studentData: StudentResponse = await res.json();

  return (
    <div className="sm:p-4 flex flex-col gap-6">
      <StudentProfileTopData
        department={studentData.department.name}
        first_name={studentData.first_name}
        image={studentData.image}
        last_name={studentData.last_name}
        student_id={studentData.student_id}
        token={token}
        year_label={studentData.academicYear.year_label}
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
          <TabsTrigger className="profile-tab-trigger" value="courses">
            Courses
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 sm:p-1 mt-5 lg:mt-5">
          <ShowUserData
            userData={{
              date_of_birth: studentData.date_of_birth,
              department: studentData.department,
              first_name: studentData.first_name,
              gender: studentData.gender,
              last_name: studentData.last_name,
              student_id: studentData.student_id,
              created_at: studentData.created_at,
              _count: studentData._count,
              address: studentData.address,
              email: studentData.email,
              phone: studentData.phone,
            }}
          />
        </TabsContent>
        <TabsContent className="p-4 sm:p-1 mt-5 lg:mt-5" value="password">
          <UpdateUserPasswrod role="student" token={token} />
        </TabsContent>
        <TabsContent className="p-4 sm:p-1 mt-5 lg:mt-5" value="courses">
          <ShowCurrentCourses courses={studentData.courses} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
