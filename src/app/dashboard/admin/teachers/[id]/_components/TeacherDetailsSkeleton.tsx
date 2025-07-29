import { Skeleton } from "@/components/ui/skeleton";

export default function TeacherDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="w-36 h-10 rounded-md" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-2 h-6" />
        </div>
      </div>
      <Skeleton className="w-full h-16 rounded-md" />
      {/* Body */}
      <div className="flex items-start md:gap-[1%] gap-3 p-4 flex-wrap">
        <div className="flex flex-col gap-3 md:w-[48%] w-full">
          <Skeleton className="w-full h-8 rounded-md" />
          <Skeleton className="w-full h-8 rounded-md" />
          <Skeleton className="w-full h-8 rounded-md" />
          <Skeleton className="w-full h-8 rounded-md" />
        </div>
        <div className="flex flex-col gap-3 md:w-[48%] w-full">
          <Skeleton className="w-full h-8 rounded-md" />
          <Skeleton className="w-full h-8 rounded-md" />
          <Skeleton className="w-full h-8 rounded-md" />
          <Skeleton className="w-full h-8 rounded-md" />{" "}
        </div>
      </div>
      <Skeleton className="w-full h-16 rounded-md" />
      {/* Courses */}
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(280px , 1fr))",
        }}
        className="grid gap-4 p-4">
        <Skeleton className="w-full h-16 rounded-md" />
        <Skeleton className="w-full h-16 rounded-md" />
        <Skeleton className="w-full h-16 rounded-md" />
        <Skeleton className="w-full h-16 rounded-md" />
      </div>
      <Skeleton className="w-full h-16 rounded-md" />
      {/* Schedual */}
      <Skeleton className="w-full h-96 rounded-md" />
    </div>
  );
}
