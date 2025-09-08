import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";
import { EnrollmentStatus, GenderType } from "@/lib/globalTypes";
import ShowUserData from "./_components/ShowUserData";
import UserContactInformation from "../../_components/Details/UserContactInformation";
import ShowCurrentCourses from "./_components/ShowCurrentCourses";
import ShowUserImageProfile from "../../_components/profile/ShowUserImageProfile";
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
      <div className="flex items-center gap-6 bg-main-dark p-4 rounded-2xl border border-soft-border flex-wrap">
        <ShowUserImageProfile
          role="student"
          token={token}
          userImage={studentData.image}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            {studentData.first_name} {studentData.last_name}
          </h1>
          <p className="text-sm text-low-white">
            Student ID: {studentData.student_id}
          </p>

          <p className="text-sm text-low-white capitalize">
            {studentData.academicYear.year_label} |{" "}
            {studentData.department.name}
          </p>
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
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
          }}
        />
        <div className="sm:min-w-96">
          <UserContactInformation
            address={studentData.address}
            email={studentData.email}
            phone={studentData.phone}
          />
        </div>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <UpdateUserPasswrod role="student" token={token} />
        <ShowCurrentCourses courses={studentData.courses} />
      </div>
    </div>
  );
}
