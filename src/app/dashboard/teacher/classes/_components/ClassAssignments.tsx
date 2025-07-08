import axios from "axios";
import AddAssignment from "./AddAssignment";
import { MainDomain } from "@/variables/MainDomain";
import AssignmentCard from "./AssignmentCard";
import { useQuery } from "@tanstack/react-query";

type Props = {
  classId: number;
  token: string;
  className: string;
};

export type ClassAssignmentsDataType = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  external_url: string | null;
  created_at: Date;
  submissions: number;
};

async function getAllAssignements(
  className: string
): Promise<ClassAssignmentsDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/assignment`
  );
  return res.data;
}

export default function ClassAssignments({ classId, token, className }: Props) {
  const {
    data: assignments,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["class_assignments", className],
    queryFn: () => getAllAssignements(className),
  });
  if (isError && error) throw new Error(error.message);
  return (
    <div className="flex flex-col gap-3">
      {/* Add Assignment */}
      <AddAssignment classId={classId} token={token} />
      {isLoading ? (
        <>Loading</>
      ) : (
        assignments &&
        assignments.map((assign) => (
          <AssignmentCard data={assign} key={assign.id} />
        ))
      )}
    </div>
  );
}
