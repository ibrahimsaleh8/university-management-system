import TestTable from "./TestTable";

export type TeacherCourseDataType = {
  id: string;
  name: string;
  code: string;
  semester: string;
  students: number;
};

export default function TeacherCoursesDashboard({
  courses,
}: {
  courses: TeacherCourseDataType[];
}) {
  return (
    <div className="bg-Second-black rounded-2xl w-full p-4 flex flex-col gap-5 relative">
      <div className="absolute right-[-1px] top-0 folder-clip-path lg:w-[20%] md:w-[30%] w-1/2 h-2 bg-Main-black p-2 rounded-tr-2xl"></div>
      <p className="font-bold">
        My <span className="text-main-text">Active</span> Courses
      </p>
      <TestTable courses={courses} />
    </div>
  );
}
