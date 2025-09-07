import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";
import { EnrollmentStatus, GenderType } from "@/lib/globalTypes";
import UpdateUserImage from "../../_components/profile/UpdateUserImage";
import ShowUserData from "./_components/ShowUserData";
import UserContactInformation from "../../_components/Details/UserContactInformation";
import ShowCurrentCourses from "./_components/ShowCurrentCourses";
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
      <div className="flex justify-between gap-3">
        <UpdateUserImage
          role="student"
          token={token}
          userImage={studentData.image}
        />
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
