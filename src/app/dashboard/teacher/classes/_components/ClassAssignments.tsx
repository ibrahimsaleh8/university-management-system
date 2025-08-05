import axios from "axios";
import AddAssignment from "./AddAssignment";
import { MainDomain } from "@/variables/MainDomain";
import AssignmentCard from "./AssignmentCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="font-bold">Class Assignments</p>
        <AddAssignment className={className} classId={classId} token={token} />
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-36 rounded-md" />
      ) : assignments && assignments.length > 0 ? (
        assignments.map((assign) => (
          <AssignmentCard
            className={className}
            token={token}
            data={assign}
            key={assign.id}
          />
        ))
      ) : (
        <div className="w-full h-32 text-low-white rounded-md flex bg-Second-black p-4 items-center justify-center">
          No Assignments found..
        </div>
      )}
    </div>
  );
}
