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
        <Skeleton className="w-full h-96 rounded-md" />
      ) : data && data.length > 0 ? (
        data.map((std) => (
          <StudentClassCard grade={std.grade} name={std.name} key={std.id} />
        ))
      ) : (
        <>No students Found</>
      )}
    </div>
  );
}
