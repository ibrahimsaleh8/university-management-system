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
import { Pencil, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UpdateAnn from "./UpdateAnn";
import DeleteAnn from "./DeleteAnn";
import { AttachmentsFileType } from "@/lib/globalTypes";

type Props = {
  type: "delete" | "edit" | "replies";
  title?: string;
  content?: string;
  className?: string;
  token: string;
  annId: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: AttachmentsFileType;
  }[];
};

export default function AnnouncmentOperations({
  type,
  content,
  title,
  annId,
  token,
  className,
  attachments,
}: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (close) {
      closeRef.current?.click();
    }
  }, [close]);
  const classes =
    type == "edit"
      ? "border-main-text text-main-text hover:bg-main-text hover:text-black"
      : type == "delete"
      ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      : "";

  return (
    <AlertDialog
      onOpenChange={() => {
        if (close) {
          setClose(false);
        }
      }}>
      <AlertDialogTrigger
        className={`cursor-pointer flex items-center gap-1 border  w-full px-4 py-1 rounded-md text-sm  font-medium duration-300 ${classes}`}>
        {type == "edit" && (
          <>
            <Pencil className="w-4 h-4" /> Edit
          </>
        )}
        {type == "delete" && (
          <>
            <Trash2 className="w-4 h-4" /> Delete
          </>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "delete"
              ? "Confirm Deletion ?"
              : type == "edit"
              ? "Edit Announcement"
              : ""}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "delete" &&
              "This action is irreversible. Deleting this item will permanently remove it and its data from the system."}
          </AlertDialogDescription>
          {type == "edit" && attachments && (
            <UpdateAnn
              attachments={attachments}
              className={className ?? ""}
              annId={annId}
              content={content as string}
              title={title as string}
              token={token}
              setClose={setClose}
            />
          )}

          {type == "delete" && (
            <DeleteAnn
              className={className ?? ""}
              annId={annId}
              token={token}
              setClose={setClose}
            />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
