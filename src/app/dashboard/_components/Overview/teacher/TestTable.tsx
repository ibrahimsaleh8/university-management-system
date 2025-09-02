import { TeacherCourseDataType } from "./TeacherCoursesDashboard";

export default function TestTable({
  courses,
}: {
  courses: TeacherCourseDataType[];
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-400 border-b border-[#2d2c2c]">
              <th className="py-3 px-4">COURSE NAME</th>
              <th className="py-3 px-4">CODE</th>
              <th className="py-3 px-4">SEMESTER</th>
              <th className="py-3 px-4">STUDENTS</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-[#2d2c2c] hover:bg-[#2d2c2c] transition-colors">
                <td className="py-3 px-4 text-white font-medium text-sm">
                  {course.name}
                </td>
                <td className="py-3 px-4 text-gray-300 sm:text-sm text-xs">
                  {course.code}
                </td>
                <td className="py-3 px-4 text-gray-300 sm:text-sm text-xs">
                  {course.semester}
                </td>
                <td className="py-3 px-4 text-gray-300 text-sm">
                  {course.students}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
