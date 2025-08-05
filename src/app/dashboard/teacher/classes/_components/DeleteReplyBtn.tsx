import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
type Props = {
  replyId: string;
  token: string;
};

async function deleteReply({ replyId, token }: Props) {
  await axios.delete(`${MainDomain}/api/delete/announcement-reply/${replyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function DeleteReplyBtn({
  announcmentId,
  replyId,
  token,
}: Props & { announcmentId: string }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (deleteData: Props) => deleteReply(deleteData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["announcment_replies", announcmentId],
      });
      closeRef.current?.click();
      GlobalToast({
        icon: "success",
        title: "Reply has been deleted success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-7 h-7" variant={"destructive"}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete your reply?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <Button
            disabled={isPending}
            onClick={() => {
              mutate({
                replyId,
                token,
              });
            }}
            variant={"destructive"}
            className="mt-2 ml-auto min-w-28">
            {isPending ? <SmallLoader color="white" /> : "Delete"}
          </Button>
          <DialogClose ref={closeRef}></DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
