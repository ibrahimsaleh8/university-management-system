import { Skeleton } from "@/components/ui/skeleton";
import { NumberOfTeachers } from "@/variables/Pagination";

export default function TabelSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: NumberOfTeachers }).map((_e, i) => (
        <Skeleton key={i} className="h-12 rounded-none" />
      ))}
    </div>
  );
}
