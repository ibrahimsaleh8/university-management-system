"use client";

import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import { GenderType } from "@/lib/globalTypes";
import StudentClassCard from "./StudentClassCard";

type Props = {
  token: string;
};

export type StudentClassesResponseType = {
  id: number;
  name: string;
  wideImage: string;
  teacher: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    gender: GenderType;
  };
  course: {
    name: string;
    department: {
      name: string;
      code: string;
    };
  };
  studentsNumber: number;
  assignmentsNumber: number;
  announcementsNumber: number;
  created_at: Date;
};

async function getUnregisterdClasses(
  token: string
): Promise<StudentClassesResponseType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-unregisterd-classes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowUnRegisterdClasses({ token }: Props) {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["unregisterd_classes"],
    queryFn: () => getUnregisterdClasses(token),
  });
  if (isError && error) throw new Error(error.message);

  return isLoading ? (
    <div className="text-low-white">Loading unregisterd courses ...</div>
  ) : (
    data && data.length > 0 && (
      <div className="flex flex-col gap-3 ">
        {/* Header */}

        <div>
          <p className="font-medium">Unregistered Classes for joined Courses</p>
        </div>
        {data.map((classData) => (
          <StudentClassCard
            type="join"
            key={classData.id}
            token={token}
            classData={classData}
          />
        ))}
      </div>
    )
  );
}
