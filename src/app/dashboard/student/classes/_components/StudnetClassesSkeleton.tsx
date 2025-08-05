import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function StudnetClassesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-56 h-3" />
      <Skeleton className="w-96 h-96 rounded-sm" />
    </div>
  );
}
