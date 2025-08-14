import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeletonStudentsInClass() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-10 rounded-sm h-5" />
        <Skeleton className="sm:w-72 w-[96%] h-10" />
      </div>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(280px , 1fr))",
        }}
        className="grid gap-4">
        <Skeleton className="min-w-44 h-40 rounded-2xl" />
        <Skeleton className="min-w-44 h-40 rounded-2xl" />
        <Skeleton className="min-w-44 h-40 rounded-2xl" />
        <Skeleton className="min-w-44 h-40 rounded-2xl" />
      </div>
    </div>
  );
}
