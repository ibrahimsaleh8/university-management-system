"use client";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { TeacherDataResponse } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import TeacherCourseCard from "./TeacherCourseCard";
import DetailsParagraphInfo from "../../../../_components/Details/DetailsParagraphInfo";
import {
  Calendar1,
  CalendarRange,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
  VenusAndMars,
} from "lucide-react";
import SectionHead from "../../../../_components/Details/SectionHead";
import CalendarTable from "@/app/dashboard/_components/Calender/CalenderTable";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import TeacherOperations from "./TeacherOperations";
import TeacherDetailsSkeleton from "./TeacherDetailsSkeleton";
import DetailsHeader from "@/app/dashboard/_components/Details/DetailsHeader";
import DetailsMainData from "@/app/dashboard/_components/Details/DetailsMainData";

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

        {/* Main Data */}
        <SectionHead title="Main Data" />
        <DetailsMainData
          leftData={[
            <DetailsParagraphInfo
              icon={<User className="w-5 h-5" />}
              head="Name"
              content={`${data.first_name} ${data.last_name}`}
              key={0}
            />,
            <DetailsParagraphInfo
              icon={<Mail className="w-5 h-5" />}
              head="Email"
              content={data.email}
              key={1}
            />,
            <DetailsParagraphInfo
              icon={<VenusAndMars className="w-5 h-5" />}
              head="Gender"
              content={data.gender}
              key={2}
            />,
            <DetailsParagraphInfo
              icon={<MapPin className="w-5 h-5" />}
              head="Address"
              content={data.address}
              key={3}
            />,
          ]}
          rightData={[
            <DetailsParagraphInfo
              icon={<Calendar1 className="w-5 h-5" />}
              head="Date of birth"
              content={GetDateFromTime(data.date_of_birth)}
              key={0}
            />,
            <DetailsParagraphInfo
              icon={<CalendarRange className="w-5 h-5" />}
              head="Hire date"
              content={GetDateFromTime(data.hire_date)}
              key={1}
            />,
            <DetailsParagraphInfo
              icon={<Phone className="w-5 h-5" />}
              head="Phone"
              content={data.phone}
              key={2}
            />,
            <DetailsParagraphInfo
              icon={<GraduationCap className="w-5 h-5" />}
              head="Qualification"
              content={data.qualification}
              key={3}
            />,
          ]}
        />

        {/* Courses */}
        <SectionHead title="courses" />
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(280px , 1fr))",
          }}
          className="grid gap-4 p-4">
          {data.courses.length > 0 ? (
            data.courses.map((course) => (
              <TeacherCourseCard
                courseName={course.name}
                department={course.department}
                semester={course.semester.name}
                key={course.id}
              />
            ))
          ) : (
            <div className="flex items-center justify-center p-4 text-low-white">
              No Courses Found..
            </div>
          )}
        </div>
        <SectionHead title="Schedual" />
        <CalendarTable canDelete={false} events={data.schedules} />
      </div>
    )
  );
}
