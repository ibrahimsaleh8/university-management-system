import { Skeleton } from "@/components/ui/skeleton";

export default function ClassSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full h-28" />
    </div>
  );
}
