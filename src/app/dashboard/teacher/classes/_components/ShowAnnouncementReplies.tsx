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
import { MessageSquareQuote, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
export type ReplyDataType = {
  id: string;
  student: {
    name: string;
    image: string;
  };
  content: string;
  created_at: string;
};

const dummyReplies = [
  {
    id: "rep1",
    student: {
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    content: "I found this announcement really helpful, thank you!",
    created_at: "2025-07-06T09:30:00Z",
  },
  {
    id: "rep2",
    student: {
      name: "Bob Smith",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    content: "Can you clarify the deadline mentioned?",
    created_at: "2025-07-06T10:15:00Z",
  },
  {
    id: "rep3",
    student: {
      name: "Clara Nguyen",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    content: "Thanks for the update!",
    created_at: "2025-07-06T11:00:00Z",
  },
  {
    id: "rep4",
    student: {
      name: "Daniel Kim",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    content: "Will there be a follow-up meeting?",
    created_at: "2025-07-06T11:45:00Z",
  },
];

type Props = {
  replies: number;
  annId: string;
};
type repliesTimes = "most_recent" | "oldest_first";
export default function ShowAnnouncementReplies({ replies }: Props) {
  const [filterTime, setFilterTime] = useState<repliesTimes>("most_recent");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer flex items-center gap-1 border border-white hover:bg-white hover:text-black duration-300 w-fit px-4 py-1 rounded-md text-sm font-medium">
        <MessageSquareQuote className="w-4 h-4" />
        Replies ({replies})
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="flex items-start gap-3 justify-between">
            <AlertDialogTitle>Replies</AlertDialogTitle>

            <Select
              defaultValue={filterTime}
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
          <ScrollArea className="h-96 flex flex-col gap-3 w-full rounded-md p-2">
            <div className="flex flex-col gap-3 items-start justify-start">
              {dummyReplies.map((reply) => (
                <AnnouncmentReplyCard {...reply} key={reply.id} />
              ))}
            </div>
          </ScrollArea>
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
