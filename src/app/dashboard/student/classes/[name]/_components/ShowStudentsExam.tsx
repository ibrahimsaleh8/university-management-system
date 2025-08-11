import { MainDomain } from "@/variables/MainDomain";
import axios from "axios";
import StudentExamCard from "./StudentExamCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ExamStatusType } from "@/lib/globalTypes";

type Props = {
  name: string;
  token: string;
};
export type StudentExamResponse = {
  id: string;
  title: string;
  duration: number;
  created_at: Date;
  endDate: Date;
  totalMark: number;
  startDate: Date;
  status: ExamStatusType;
  questions: number;
  isSubmitted: boolean;
  autoMark: boolean;
  studentScore: number | null;
};

async function getExams(
  className: string,
  token: string
): Promise<StudentExamResponse[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/exams`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentsExam({ name, token }: Props) {
  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["student_class_exams", name],
    queryFn: () => getExams(name, token),
  });
  if (error && isError) throw new Error(error.message);

  return isLoading ? (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fit,minmax(330px , 1fr))",
      }}
      className="grid gap-4">
      <Skeleton className="w-full rounded-2xl h-56" />
      <Skeleton className="w-full rounded-2xl h-56" />
      <Skeleton className="w-full rounded-2xl h-56" />
      <Skeleton className="w-full rounded-2xl h-56" />
    </div>
  ) : (
    data && (
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(330px , 1fr))",
        }}
        className="grid gap-4">
        {data.length > 0 ? (
          data.map((exam) => (
            <StudentExamCard className={name} examData={exam} key={exam.id} />
          ))
        ) : (
          <div className="w-full h-32 rounded-2xl bg-Second-black flex items-center justify-center text-low-white">
            No Exams Found ...
          </div>
        )}
      </div>
    )
  );
}
