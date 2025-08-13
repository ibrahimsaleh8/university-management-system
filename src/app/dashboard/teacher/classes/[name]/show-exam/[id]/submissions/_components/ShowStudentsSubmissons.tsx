"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentCardWithImage from "./StudentCardWithImage";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import SubmissonStatus from "./SubmissonStatus";
import ShowStudentAnswers from "./ShowStudentAnswers";
import SmallLoader from "@/components/Global/SmallLoader";
type StudentsSubmissonsDataType = {
  student: {
    student_id: string;
    image: string;
    first_name: string;
    last_name: string;
  };
  score: number;
  exam: {
    totalMark: number;
  };
  isSubmitted: boolean;
};

type Props = {
  className: string;
  token: string;
  examId: string;
};

async function getSubmissions(
  className: string,
  token: string,
  examId: string
): Promise<StudentsSubmissonsDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/exams/${examId}/submissons`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowStudentsSubmissons({
  className,
  examId,
  token,
}: Props) {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["students_submissons", examId, className],
    queryFn: () => getSubmissions(className, token, examId),
  });
  if (error && isError) throw new Error(error.message);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Mark</TableHead>
          <TableHead>Answers</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4}>
              <div className="w-full flex items-center justify-center gap-2">
                <SmallLoader color="white" />
                Loading...
              </div>
            </TableCell>
          </TableRow>
        ) : data && data.length > 0 ? (
          data.map((submisson) => (
            <TableRow key={submisson.student.student_id}>
              <TableCell>
                <StudentCardWithImage
                  id={submisson.student.student_id}
                  imageUrl={submisson.student.image}
                  name={`${submisson.student.first_name} ${submisson.student.last_name}`}
                />
              </TableCell>
              <TableCell>
                <SubmissonStatus isSubmitted={submisson.isSubmitted} />
              </TableCell>
              <TableCell>
                {submisson.score}/{submisson.exam.totalMark}
              </TableCell>
              <TableCell>
                <ShowStudentAnswers
                  id={submisson.student.student_id}
                  imageUrl={submisson.student.image}
                  name={`${submisson.student.first_name} ${submisson.student.last_name}`}
                  className={className}
                  examId={examId}
                  token={token}
                  studentMark={submisson.score}
                  totalMark={submisson.exam.totalMark}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>
              <div className="w-full flex items-center justify-center gap-2 text-low-white">
                No Submissions Founded ....
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
