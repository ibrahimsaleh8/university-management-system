import { Skeleton } from "@/components/ui/skeleton";
import { NumberOfTeachers } from "@/variables/Pagination";

export default function TabelSkeleton({ count }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count ?? NumberOfTeachers }).map((_e, i) => (
        <Skeleton key={i} className="h-12 rounded-none" />
      ))}
    </div>
  );
}
