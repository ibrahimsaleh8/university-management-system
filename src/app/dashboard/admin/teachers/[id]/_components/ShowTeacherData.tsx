"use client";
import { TeacherDataResponse } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import CalendarTable from "@/app/dashboard/_components/Calender/CalenderTable";
import TeacherOperations from "./TeacherOperations";
import TeacherDetailsSkeleton from "./TeacherDetailsSkeleton";
import { UserCog } from "lucide-react";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import UserDetails from "@/app/dashboard/_components/Details/UserDetails";
import UserMainCardWithImage from "@/app/dashboard/_components/Details/UserMainCardWithImage";
import UserContactInformation from "@/app/dashboard/_components/Details/UserContactInformation";
import UserAssignedCard from "@/app/dashboard/_components/Details/UserAssignedCard";

type Props = {
  teacher_id: string;
  token: string;
};

async function getTeacherDataApi(
  teacher_id: string
): Promise<TeacherDataResponse> {
  const res = await axios.get(`${MainDomain}/api/get/teachers/${teacher_id}`);
  return res.data;
}
export default function ShowTeacherData({ teacher_id, token }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["teacher_data_details", teacher_id],
    queryFn: () => getTeacherDataApi(teacher_id),
  });
  if (error && isError) throw new Error(error.message);

  return isLoading ? (
    <TeacherDetailsSkeleton />
  ) : (
    data && (
      <div className="flex flex-col gap-3 sm:p-2">
        <BackButton withText={false} />

        <div className="flex items-start gap-3 lg:flex-row flex-col">
          <UserMainCardWithImage
            id={data.teacher_id}
            image={data.image}
            name={`${data.gender == "MALE" ? "Mr. " : "Mrs. "} ${
              data.first_name
            } ${data.last_name}`}
            operations={
              <div className="flex items-center gap-2">
                <TeacherOperations
                  token={token}
                  teacherData={{
                    address: data.address,
                    date_of_birth: data.date_of_birth,
                    email: data.email,
                    first_name: data.first_name,
                    gender: data.gender,
                    hire_date: data.hire_date,
                    image: data.image,
                    last_name: data.last_name,
                    phone: data.phone,
                    qualification: data.qualification,
                    teacher_id: data.teacher_id,
                  }}
                  type="edit"
                />
                <TeacherOperations
                  teacher_id={data.teacher_id}
                  token={token}
                  type="delete"
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
                  {data.departments.length > 0 ? (
                    data.departments.map((dep) => (
                      <p
                        key={dep.id}
                        className="bg-glass-green w-fit px-2 py-1 rounded-md capitalize text-main-text text-xs">
                        {dep.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs font-medium">No Departments Found</p>
                  )}
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
                header: "qualification",
                value: data.qualification,
              },
              {
                header: "Hire Date",
                value: GetDateFromTime(data.hire_date),
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

        <CalendarTable canDelete={false} events={data.schedules} />
      </div>
    )
  );
}
