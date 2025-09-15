import { Skeleton } from "@/components/ui/skeleton";

export default function TeacherDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>

      <div className="flex items-start gap-3 lg:flex-row flex-col">
        <Skeleton className="sm:w-96 w-full h-72 rounded-2xl" />
        <Skeleton className="w-full h-72 rounded-2xl" />
      </div>

      <div className="flex items-start gap-3 lg:flex-row flex-col">
        <Skeleton className="sm:w-96 w-full h-72 rounded-2xl" />
        <Skeleton className="w-full h-72 rounded-2xl" />
      </div>

      {/* Schedual */}
      <Skeleton className="w-full h-96 rounded-md" />
    </div>
  );
}
