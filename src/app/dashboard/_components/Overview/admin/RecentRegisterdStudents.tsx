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
      <p className="font-bold">Recent Registered Students</p>
      <div className="flex flex-col gap-4">
        {students.map((std) => (
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
        ))}
      </div>
    </div>
  );
}
