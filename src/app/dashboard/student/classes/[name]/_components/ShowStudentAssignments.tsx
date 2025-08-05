"use client";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  name: string;
  token: string;
};
async function getAssignmentsApi(className: string, token: string) {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/assignments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentAssignments({ name, token }: Props) {
  const { error, isError, data } = useQuery({
    queryKey: ["student_class_assignment", name],
    queryFn: () => getAssignmentsApi(name, token),
  });
  if (error && isError) throw new Error(error.message);
  console.log(data);

  return <div>ShowStudentAssignments</div>;
}
