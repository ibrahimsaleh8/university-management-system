"use client";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { TeacherDataResponse } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import TeacherCourseCard from "./TeacherCourseCard";
import TeacherParagraphInfo from "./TeacherParagraphInfo";
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
import SectionHead from "./SectionHead";
import CalendarTable from "@/app/dashboard/_components/Calender/CalenderTable";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import TeacherOperations from "./TeacherOperations";

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
  return (
    <div className="flex flex-col gap-3 sm:p-2">
      {isLoading ? (
        <>Loading</>
      ) : (
        data && (
          <>
            <div className="flex items-center justify-between">
              <BackButton withText={false} />
              <p className="text-xl line-clamp-1 capitalize font-bold text-start">
                <span>{data.gender == "MALE" ? "Mr/ " : "Mrs/ "}</span>{" "}
                {data.first_name} {data.last_name} Page
              </p>
              <div className="flex items-center gap-2">
                <img
                  className="w-11 h-11 rounded-full object-cover object-center"
                  src={data.image}
                  alt={`image ${data.first_name}`}
                />
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
                    <TeacherOperations token={token} type="delete" key={1} />,
                  ]}
                />
              </div>
            </div>
            {/* Main Data */}
            <SectionHead title="Main Data" />
            <div className="flex items-start md:gap-[1%] gap-3 p-4 flex-wrap">
              <div className="flex flex-col gap-3 md:w-[48%] w-full">
                <TeacherParagraphInfo
                  icon={<User className="w-5 h-5" />}
                  head="Name"
                  content={`${data.first_name} ${data.last_name}`}
                />
                <TeacherParagraphInfo
                  icon={<Mail className="w-5 h-5" />}
                  head="Email"
                  content={data.email}
                />
                <TeacherParagraphInfo
                  icon={<VenusAndMars className="w-5 h-5" />}
                  head="Gender"
                  content={data.gender}
                />
                <TeacherParagraphInfo
                  icon={<MapPin className="w-5 h-5" />}
                  head="Address"
                  content={data.address}
                />
              </div>
              <div className="flex flex-col gap-3 md:w-[48%] w-full">
                <TeacherParagraphInfo
                  icon={<Calendar1 className="w-5 h-5" />}
                  head="Date of birth"
                  content={GetDateFromTime(data.date_of_birth)}
                />
                <TeacherParagraphInfo
                  icon={<CalendarRange className="w-5 h-5" />}
                  head="Hire date"
                  content={GetDateFromTime(data.hire_date)}
                />
                <TeacherParagraphInfo
                  icon={<Phone className="w-5 h-5" />}
                  head="Phone"
                  content={data.phone}
                />
                <TeacherParagraphInfo
                  icon={<GraduationCap className="w-5 h-5" />}
                  head="Qualification"
                  content={data.qualification}
                />
              </div>
            </div>

            {/* Courses */}
            <SectionHead title="courses" />
            <div
              style={{
                gridTemplateColumns: "repeat(auto-fit,minmax(280px , 1fr))",
              }}
              className="grid gap-4 p-4">
              {data.courses.map((course) => (
                <TeacherCourseCard
                  courseName={course.name}
                  department={course.department}
                  semester={course.semester.name}
                  key={course.id}
                />
              ))}
            </div>
            <SectionHead title="Schedual" />
            <CalendarTable canDelete={false} events={data.schedules} />
          </>
        )
      )}
    </div>
  );
}
