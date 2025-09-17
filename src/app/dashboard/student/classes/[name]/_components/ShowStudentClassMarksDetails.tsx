import SmallLoader from "@/components/Global/SmallLoader";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type Props = {
  token: string;
  stdId: number;
  className: string;
};
export type StudentClassExamDataType = {
  id: number;
  title: string;
  totalMark: number;
  studentDegree: number;
};

export type StudentClassAssignmentDataType = {
  id: number;
  title: string;
  studentDegree: number;
};

export type StudentClassReportResponse = {
  exams: StudentClassExamDataType[];
  assignments: StudentClassAssignmentDataType[];
};
async function getStudentMarksDetiails({
  className,
  stdId,
  token,
}: Props): Promise<StudentClassReportResponse> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/class/${className}/students/${stdId}`,
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
export default function ShowStudentClassMarksDetails({
  className,
  stdId,
  token,
}: Props) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["student_class_marks", stdId],
    queryFn: () => getStudentMarksDetiails({ className, stdId, token }),
  });
  if (error && isError) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-4">
      {/* Exam */}
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <SmallLoader color="white" />
          </div>
        ) : (
          data && (
            <>
              {data.exams.length > 0 ? (
                <>
                  <p className="font-bold">Exams</p>
                  {data.exams.map((ex) => (
                    <div
                      key={ex.id}
                      className="flex items-center gap-3 justify-between flex-wrap pb-3 border-b border-soft-border">
                      <p className="text-main-text font-medium capitalize">
                        {ex.title}
                      </p>
                      <p>
                        <span className="font-medium">{ex.studentDegree}</span>{" "}
                        / {ex.totalMark}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center text-center text-low-white border-b border-soft-border pb-3">
                  No Exams Found
                </div>
              )}

              {data.assignments.length > 0 ? (
                <>
                  <p className="font-bold">Assignments</p>
                  {data.assignments.map((assign) => (
                    <div
                      key={assign.id}
                      className="flex items-center gap-3 justify-between flex-wrap pb-3 border-b border-soft-border">
                      <p className="text-main-text font-medium capitalize">
                        {assign.title}
                      </p>
                      <p>
                        <span className="font-medium">
                          {assign.studentDegree}
                        </span>
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center text-center text-low-white">
                  No Assignments Found
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
