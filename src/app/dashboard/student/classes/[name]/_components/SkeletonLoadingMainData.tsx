import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoadingMainData() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 md:flex-row flex-col">
        <Skeleton className="w-full md:w-60 h-28 rounded-2xl" />
        <Skeleton className="w-full h-28 rounded-2xl" />
      </div>
      <Skeleton className="w-96 h-14 rounded-md mx-auto" />
    </div>
  );
}
