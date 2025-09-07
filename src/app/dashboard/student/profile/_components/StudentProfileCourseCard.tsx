import { Badge } from "@/components/ui/badge";
import { StudentProfileCoursesDataType } from "../page";

export default function StudentProfileCourseCard({
  courseData,
}: {
  courseData: StudentProfileCoursesDataType;
}) {
  return (
    <div className="bg-Second-Card-bg w-full rounded-2xl p-4 flex justify-between items-center">
      {/* left */}
      <div className="flex flex-col gap-0.5 ">
        <p className="font-bold capitalize">
          {courseData.courseOffering.course.name}
        </p>
        <p className="uppercase text-sm font-medium">
          {courseData.courseOffering.course.code}
        </p>
      </div>

      <Badge
        className="capitalize"
        variant={
          courseData.status == "ACTIVE"
            ? "secondary"
            : courseData.status == "COMPLETED"
            ? "success"
            : "warning"
        }
        appearance="light">
        {courseData.status.toLowerCase()}
      </Badge>
    </div>
  );
}
