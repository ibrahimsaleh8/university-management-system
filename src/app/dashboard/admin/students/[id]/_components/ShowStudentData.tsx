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
        {/* Top */}
        <div className="flex gap-5">
          {/* Left */}
          <div className="bg-Second-black rounded-2xl w-[30rem] h-96"></div>
          {/* Right */}
          <div className="bg-Second-black rounded-2xl w-full h-96"></div>
        </div>
      </div>
    )
  );
}
