import { MainDomain } from "@/variables/MainDomain";
import axios, { AxiosError } from "axios";
import StudentExamCard from "./StudentExamCard";
import { useQuery } from "@tanstack/react-query";
import { ExamStatusType } from "@/lib/globalTypes";
import LoadingTab from "./LoadingTab";

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
  isMarked: boolean;
  autoMark: boolean;
  studentScore: number | null;
};

async function getExams(
  className: string,
  token: string
): Promise<StudentExamResponse[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/student-class/${className}/exams`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function ShowStudentsExam({ name, token }: Props) {
  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["student_class_exams", name],
    queryFn: () => getExams(name, token),
  });
  if (error && isError) throw new Error(error.message);

  return isLoading ? (
    <LoadingTab />
  ) : (
    data && (
      <div className="flex gap-4 flex-col">
        {data.length > 0 ? (
          data.map((exam) => (
            <StudentExamCard className={name} examData={exam} key={exam.id} />
          ))
        ) : (
          <div className="w-full h-36 rounded-md flex text-white items-center justify-center bg-main-dark border border-soft-border">
            No Exams Found ...
          </div>
        )}
      </div>
    )
  );
}
