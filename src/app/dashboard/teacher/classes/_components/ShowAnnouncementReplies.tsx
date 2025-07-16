import AnnouncmentReplyCard from "@/app/dashboard/_components/AnnouncmentReplyCard";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageCircle, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
export type ReplyDataType = {
  id: string;
  student: {
    name: string;
    image: string;
  };
  content: string;
  created_at: string;
};

async function getAnnReplies(annId: string): Promise<ReplyDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/announcement-replies/${annId}`
  );
  return res.data;
}

type Props = {
  replies: number;
  annId: string;
};
type repliesTimes = "most_recent" | "oldest_first";
export default function ShowAnnouncementReplies({ replies, annId }: Props) {
  const [filterTime, setFilterTime] = useState<repliesTimes>("most_recent");
  const [open, setOpen] = useState(false);

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["announcement_replies", annId],
    queryFn: () => getAnnReplies(annId),
    enabled: open,
  });
  if (error && isError) throw new Error(error.message);
  const repliesData = useMemo(() => {
    if (data) {
      const rep = [...data];
      rep.sort((a, b) =>
        filterTime === "oldest_first"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      return rep;
    }
  }, [data, filterTime]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="cursor-pointer flex items-center gap-1 border border-[#3f3f3f] hover:bg-white hover:text-black duration-300 w-fit px-4 py-1 rounded-md text-sm font-medium">
        <MessageCircle className="w-4 h-4" />
        Replies ({replies})
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="flex items-start gap-3 justify-between">
            <AlertDialogTitle>Replies</AlertDialogTitle>

            <Select
              value={filterTime}
              onValueChange={(e: repliesTimes) => setFilterTime(e)}>
              <SelectTrigger className="w-fit border-0">
                <SelectValue placeholder="Time of Replies" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="most_recent">Most Recent</SelectItem>
                  <SelectItem value="oldest_first">Oldest First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {isLoading && !repliesData ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-32 rounded-md" />
              <Skeleton className="w-full h-32 rounded-md" />
              <Skeleton className="w-full h-32 rounded-md" />
            </div>
          ) : (
            repliesData &&
            (repliesData.length > 0 ? (
              <ScrollArea className="h-96 flex flex-col gap-3 w-full rounded-md p-2">
                <div className="flex flex-col gap-3 w-full">
                  {repliesData.map((reply) => (
                    <AnnouncmentReplyCard {...reply} key={reply.id} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="w-full text-low-white h-32 bg-Second-black rounded-md flex items-center justify-center">
                No replies found..
              </div>
            ))
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
