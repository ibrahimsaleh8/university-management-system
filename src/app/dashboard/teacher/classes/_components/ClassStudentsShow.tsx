import { Skeleton } from "@/components/ui/skeleton";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentClassCard from "./StudentClassCard";

type Props = {
  className: string;
};

type ClassStudentDataType = {
  id: number;
  name: string;
  image: string;
  grade: number;
};

async function getClassStudents(
  className: string
): Promise<ClassStudentDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/students`
  );
  return res.data;
}
export default function ClassStudentsShow({ className }: Props) {
  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["class_students", className],
    queryFn: () => getClassStudents(className),
  });
  if (error && isError) throw new Error(error.message);
  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-24 rounded-md" />
          <Skeleton className="w-full h-24 rounded-md" />
          <Skeleton className="w-full h-24 rounded-md" />
        </div>
      ) : data && data.length > 0 ? (
        data.map((std) => (
          <StudentClassCard grade={std.grade} name={std.name} key={std.id} />
        ))
      ) : (
        <div className="flex items-center justify-center text-low-white w-full h-32 bg-Second-black rounded-md p-4">
          No students Found..
        </div>
      )}
    </div>
  );
}
