import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      <Skeleton className="w-44 h-3" />
      <Skeleton className="w-full h-36" />
    </div>
  );
}
