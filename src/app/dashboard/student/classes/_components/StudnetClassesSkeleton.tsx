import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function StudnetClassesSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full flex flex-col items-center gap-3">
        <Skeleton className="w-32 h-3" />
        <Skeleton className="w-60 h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
      <Skeleton className="w-96 h-96 rounded-sm" />
    </div>
  );
}
