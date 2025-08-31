import { GetDateFromTime } from "@/lib/GetDateFromTime";
import Image from "next/image";

type studentDataType = {
  first_name: string;
  last_name: string;
  image: string;
  created_at: Date;
  department: {
    name: string;
  } | null;
};
export default function LatestStudentCard({
  studenData,
}: {
  studenData: studentDataType;
}) {
  return (
    <div className="p-3 pl-0 w-full flex items-center gap-2 justify-between border-b border-soft-border flex-wrap">
      <div className="flex items-center gap-2">
        {/* Image */}
        <Image
          alt={`${studenData.first_name} image`}
          src={studenData.image}
          width={1000}
          height={1000}
          className="w-10 h-10 rounded-full object-cover object-center"
        />
        {/* Text */}
        <div className="flex flex-col gap-0.5 text-xs">
          <p className="capitalize font-medium">
            {studenData.first_name} {studenData.last_name}
          </p>
          {studenData.department && (
            <p className="capitalize text-low-white">
              {studenData.department.name}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs px-4 py-1 bg-glass-blue text-blue-300 rounded-md">
        {GetDateFromTime(studenData.created_at)}
      </p>
    </div>
  );
}
