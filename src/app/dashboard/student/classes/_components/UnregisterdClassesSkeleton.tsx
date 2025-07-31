import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function UnregisterdClassesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-56 h-3" />
      <Skeleton className="w-full h-36 rounded-sm" />
    </div>
  );
}
