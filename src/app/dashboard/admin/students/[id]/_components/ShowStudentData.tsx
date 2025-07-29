"use client";

import DetailsHeader from "@/app/dashboard/_components/Details/DetailsHeader";
import DetailsMainData from "@/app/dashboard/_components/Details/DetailsMainData";
import DetailsParagraphInfo from "@/app/dashboard/_components/Details/DetailsParagraphInfo";
import SectionHead from "@/app/dashboard/_components/Details/SectionHead";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { StudentResponse } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Calendar1,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Settings,
  User,
  VenusAndMars,
} from "lucide-react";

type Props = {
  id: string;
  token: string;
};
async function getAllStudents(id: string): Promise<StudentResponse> {
  const res = await axios.get(`${MainDomain}/api/get/students/${id}`);
  return res.data;
}
export default function ShowStudentData({ id }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["student_data_details", id],
    queryFn: () => getAllStudents(id),
  });
  if (isError && error) throw new Error(error.message);

  return isLoading ? (
    <div className="text-center">Loading...</div>
  ) : (
    data && (
      <div className="flex flex-col gap-3">
        {/* Header */}
        <DetailsHeader
          Title={
            <p className="text-xl line-clamp-1 capitalize font-bold text-start">
              {data.first_name} {data.last_name} Page
            </p>
          }
          image={data.image}
          operations={
            <OperationsDropdown verticalIcon={true} components={[<></>]} />
          }
        />
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
              icon={<GraduationCap className="w-5 h-5" />}
              head="Year"
              content={data.academicYear}
              key={1}
            />,
            <DetailsParagraphInfo
              icon={<Phone className="w-5 h-5" />}
              head="Phone"
              content={data.phone}
              key={2}
            />,
            <DetailsParagraphInfo
              icon={<Settings className="w-5 h-5" />}
              head="Department"
              content={`${data.department.name} - ${data.department.code}`}
              key={3}
            />,
          ]}
        />
      </div>
    )
  );
}
