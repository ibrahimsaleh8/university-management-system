import { Skeleton } from "@/components/ui/skeleton";

export default function ClassSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:w-[86%] w-full mx-auto">
      <Skeleton className="w-10 h-8" />

      <div className="flex items-center gap-3">
        <Skeleton className="w-48 h-28" />
        <Skeleton className="w-full h-28" />
      </div>
      <div className="flex items-center gap-5">
        <Skeleton className="w-44 h-8" />
        <Skeleton className="w-36 h-8" />
        <Skeleton className="w-36 h-8" />
        <Skeleton className="w-36 h-8" />
      </div>
    </div>
  );
}
