"use client";

import UserAssignedCard from "@/app/dashboard/_components/Details/UserAssignedCard";
import UserContactInformation from "@/app/dashboard/_components/Details/UserContactInformation";
import UserDetails from "@/app/dashboard/_components/Details/UserDetails";
import UserMainCardWithImage from "@/app/dashboard/_components/Details/UserMainCardWithImage";
import UserOperations from "@/app/dashboard/_components/Details/UserOperations";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { StudentResponse } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserCog } from "lucide-react";

type Props = {
  id: string;
  token: string;
};
async function getAllStudents(id: string): Promise<StudentResponse> {
  const res = await axios.get(`${MainDomain}/api/get/students/${id}`);
  return res.data;
}
export default function ShowStudentData({ id, token }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["student_data_details", id],
    queryFn: () => getAllStudents(id),
  });
  if (isError && error) throw new Error(error.message);

  return isLoading ? (
    <div className="text-center">Loading...</div>
  ) : (
    data && (
      <div className="flex flex-col gap-3 sm:p-2">
        <BackButton withText={false} />

        <div className="flex items-start gap-3 lg:flex-row flex-col">
          <UserMainCardWithImage
            id={data.student_id}
            image={data.image}
            name={`${data.first_name} ${data.last_name}`}
            operations={
              <div className="flex items-center gap-2">
                <UserOperations
                  token={token}
                  type="edit"
                  studentData={{
                    academicYearId: data.academicYearId,
                    address: data.address,
                    date_of_birth: data.date_of_birth,
                    departmentId: data.department.id,
                    email: data.email,
                    first_name: data.first_name,
                    gender: data.gender,
                    last_name: data.last_name,
                    phone: data.phone,
                    student_id: data.student_id,
                    image: data.image,
                  }}
                />
                <UserOperations
                  token={token}
                  type="delete"
                  student_id={data.student_id}
                />
              </div>
            }
          />

          <UserDetails
            title="Teacher Details"
            titleIcon={<UserCog className="w-5 h-5 text-main-text" />}
            department={
              <div className="flex flex-col gap-1">
                <p className="uppercase text-low-white">Departments</p>
                <div className="flex gap-2 items-center flex-wrap">
                  <p className="bg-glass-green w-fit px-2 py-1 rounded-md capitalize text-main-text text-xs">
                    {data.department.name}
                  </p>
                </div>
              </div>
            }
            details={[
              { header: "First Name", value: data.first_name },
              { header: "Last Name", value: data.last_name },
              {
                header: "Date of birth",
                value: GetDateFromTime(data.date_of_birth),
              },
              {
                header: "Gender",
                value: data.gender,
              },
              {
                header: "Year",
                value: data.academicYear,
              },
              {
                header: "Account Created",
                value: GetDateFromTime(data.created_at),
              },
            ]}
          />
        </div>

        <div className="flex items-start gap-3 lg:flex-row flex-col">
          <UserContactInformation
            address={data.address}
            email={data.email}
            phone={data.phone}
          />
          <UserAssignedCard courses={data.courses} />
        </div>
      </div>
    )
  );
}
