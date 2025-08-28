"use client";
import { TeacherDataResponse } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import CalendarTable from "@/app/dashboard/_components/Calender/CalenderTable";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import TeacherOperations from "./TeacherOperations";
import TeacherDetailsSkeleton from "./TeacherDetailsSkeleton";
import DetailsHeader from "@/app/dashboard/_components/Details/DetailsHeader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  Contact,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Trash2,
  UserCog,
} from "lucide-react";
import TeacherMainDetailsParagraph from "./TeacherMainDetailsParagraph";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import TeacherContactInfo from "./TeacherContactInfo";

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
        <div className="flex items-start gap-3 lg:flex-row flex-col">
          <div className="bg-Second-black rounded-2xl lg:w-80 w-full pb-10 flex flex-col gap-5 items-center p-2">
            <div className="bg-soft-border w-fit rounded-full p-0.5">
              <Image
                src={data.image}
                alt="Teacher Image"
                width={1000}
                height={1000}
                className="w-32 h-32 rounded-full"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-1 text-center">
              <p className="text-lg font-bold capitalize">{`${
                data.gender == "MALE" ? "Mr. " : "Mrs. "
              } ${data.first_name} ${data.last_name}`}</p>

              <p className="text-xs text-main-text font-medium">
                ID: {data.teacher_id}
              </p>
            </div>

            {/* Operations */}
            <div className="flex items-center gap-2">
              <Button variant={"mainWithShadow"}>
                <PencilLine />
                Edit Profile
              </Button>
              <Button className="mt-1" variant={"destructive"}>
                <Trash2 />
              </Button>
            </div>
          </div>

          <div className="bg-Second-black rounded-2xl lg:flex-1 w-full p-4 px-6 pb-10 flex flex-col gap-4">
            <p className="flex items-center gap-1 font-bold">
              <UserCog className="w-5 h-5 text-main-text" />
              Teacher Details
            </p>
            {/* Text */}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 flex-wrap sm:gap-10 gap-5">
              <TeacherMainDetailsParagraph
                header="First Name"
                value={data.first_name}
              />
              <TeacherMainDetailsParagraph
                header="Last Name"
                value={data.last_name}
              />
              <TeacherMainDetailsParagraph
                header="Date of birth"
                value={GetDateFromTime(data.date_of_birth)}
              />
              <TeacherMainDetailsParagraph
                header="Gender"
                value={data.gender}
              />
              <TeacherMainDetailsParagraph
                header="qualification"
                value={data.qualification}
              />
              <TeacherMainDetailsParagraph
                header="Hire Date"
                value={GetDateFromTime(data.hire_date)}
              />
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
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 lg:flex-row flex-col">
          <div className="bg-Second-black rounded-2xl lg:w-80 w-full pb-10 flex flex-col gap-5 p-5">
            <p className="flex items-center gap-1.5 font-bold">
              <Contact className="w-5 h-5 text-main-text" />
              Contact Information
            </p>

            <div className="flex flex-col gap-4 items-start">
              <TeacherContactInfo
                header="Email"
                icon={<Mail className="w-4 h-4" />}
                value={data.email}
              />
              <TeacherContactInfo
                header="Phone"
                icon={<Phone className="w-4 h-4" />}
                value={data.phone}
              />
              <TeacherContactInfo
                header="Address"
                icon={<MapPin className="w-4 h-4" />}
                value={data.address}
              />
            </div>
          </div>
          <div className="bg-Second-black rounded-2xl lg:flex-1 w-full p-4 px-6 pb-10 flex flex-col gap-4">
            <p className="flex items-center gap-1.5 font-bold">
              <BookMarked className="w-5 h-5 text-main-text" />
              Assigned Courses
            </p>
          </div>
        </div>

        <DetailsHeader
          Title={
            <p className="text-xl line-clamp-1 capitalize font-bold text-start">
              <span>{data.gender == "MALE" ? "Mr/ " : "Mrs/ "}</span>{" "}
              {data.first_name} {data.last_name} Page
            </p>
          }
          image={data.image}
          operations={
            <OperationsDropdown
              verticalIcon={true}
              components={[
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
                  key={0}
                />,
                <TeacherOperations
                  teacher_id={data.teacher_id}
                  token={token}
                  type="delete"
                  key={1}
                />,
              ]}
            />
          }
        />

        <CalendarTable canDelete={false} events={data.schedules} />
      </div>
    )
  );
}
