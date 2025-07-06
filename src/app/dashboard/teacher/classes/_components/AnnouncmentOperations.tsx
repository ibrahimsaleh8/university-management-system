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
import { Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UpdateAnn from "./UpdateAnn";

type Props = {
  type: "delete" | "edit" | "replies";
  annId: string;
  title?: string;
  content?: string;
  className?: string;
  token: string;
};

export default function AnnouncmentOperations({
  type,
  content,
  title,
  annId,
  token,
  className,
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
      : "";

  return (
    <AlertDialog
      onOpenChange={() => {
        if (close) {
          setClose(false);
        }
      }}>
      <AlertDialogTrigger
        className={`cursor-pointer flex items-center gap-1 border  w-fit px-4 py-1 rounded-md text-sm  font-medium duration-300 ${classes}`}>
        <Pencil className="w-4 h-4" /> Edit
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-Main-black text-white border-soft-border sm:!max-w-[37rem] max-h-[97vh] sm:overflow-visible overflow-y-auto overflow-x-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "delete"
              ? "Confirm Deletion"
              : type == "edit"
              ? "Edit Announcement"
              : ""}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "delete" &&
              "This action is irreversible. Deleting this item will permanently remove it and its data from the system."}
          </AlertDialogDescription>
          {type == "edit" && (
            <UpdateAnn
              className={className ?? ""}
              annId={annId}
              content={content as string}
              title={title as string}
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
