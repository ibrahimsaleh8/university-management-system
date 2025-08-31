import Link from "next/link";
import LatestStudentCard from "./LatestStudentCard";

export type LatestStudentsDataType = {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  created_at: Date;
  department: {
    name: string;
  } | null;
};
export default function RecentRegisterdStudents({
  students,
}: {
  students: LatestStudentsDataType[];
}) {
  return (
    <div className="w-full pb-5 bg-Second-black rounded-2xl flex flex-col gap-3 p-4">
      <Link
        href={"/dashboard/admin/students"}
        className="font-bold hover:underline">
        Recent Registered Students
      </Link>
      <div className="flex flex-col gap-4">
        {students.length > 0 ? (
          students.map((std) => (
            <LatestStudentCard
              key={std.id}
              studenData={{
                first_name: std.first_name,
                last_name: std.last_name,
                created_at: std.created_at,
                department: std.department,
                image: std.image,
              }}
            />
          ))
        ) : (
          <p className="w-full text-low-white capitalize text-base font-medium text-center p-4">
            No students found
          </p>
        )}
      </div>
    </div>
  );
}
