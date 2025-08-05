import { Skeleton } from "@/components/ui/skeleton";

export default function ChatMessagesSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* Header */}
      <div className="w-full p-3 bg-Second-black flex justify-between gap-3 items-center">
        <div className="flex items-center gap-1">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-7 h-2 " />
            <Skeleton className="w-7 h-2 " />
          </div>
        </div>
        <Skeleton className="w-5 h-5" />
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="w-36 h-16 rounded-md" />
        <Skeleton className="w-36 h-16 ml-auto rounded-md" />
        <Skeleton className="w-36 h-16 rounded-md" />
        <Skeleton className="w-36 h-16 ml-auto rounded-md" />
        <Skeleton className="w-36 h-16 rounded-md" />
        <Skeleton className="w-36 h-16 ml-auto rounded-md" />
      </div>
      <div className="mt-auto flex items-center gap-2 p-2">
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
}
