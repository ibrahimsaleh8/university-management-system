"use client";
import SmallLoader from "@/components/Global/SmallLoader";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessageSquareMore, X } from "lucide-react";
import { useMemo, useRef } from "react";
import AnnouncmentReplyCard from "@/app/dashboard/_components/AnnouncmentReplyCard";
import CreateAnnouncmentReply from "./CreateAnnouncmentReply";
import { ReplyDataType } from "@/app/dashboard/teacher/classes/_components/ShowAnnouncementReplies";

type Props = {
  repliesNumber: number;
  token: string;
  announcmentId: string;
};

async function getAnnouncmentsReplies(annId: string): Promise<ReplyDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/announcement-replies/${annId}`
  );
  return res.data;
}

export default function StudentAnnouncmentReplies({
  repliesNumber,
  announcmentId,
  token,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["announcment_replies", announcmentId],
    queryFn: () => getAnnouncmentsReplies(announcmentId),
  });
  if (error && isError) throw new Error(error.message);
  const allRepliesNumber = useMemo(() => {
    if (data) {
      return data.length;
    }
    return repliesNumber;
  }, [data, repliesNumber]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-glass-main-text text-main-text hover:bg-Main-black duration-300">
          <MessageSquareMore className="w-5 h-5 " />
          Replies ({allRepliesNumber})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replies</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="sm:!max-w-[37rem] overflow-hidden flex flex-col gap-2">
          {/* Write New Reply */}
          <CreateAnnouncmentReply token={token} announcmentId={announcmentId} />

          {/* Replies */}
          <ScrollArea className="p-2 rounded-sm h-96">
            {isLoading ? (
              <div className="w-full h-80 flex items-center justify-center text-low-white">
                <p className="pt-6 flex items-center gap-1">
                  Loading... <SmallLoader color="white" />
                </p>
              </div>
            ) : (
              data &&
              (data.length > 0 ? (
                data.map((reply) => (
                  <div key={reply.id} className="mb-2">
                    <AnnouncmentReplyCard {...reply} />
                  </div>
                ))
              ) : (
                <div className="w-full h-80 flex items-center justify-center text-low-white">
                  <p className="pt-6">No Relpies Found....</p>
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
