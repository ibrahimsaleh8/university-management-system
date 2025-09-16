import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteEvent from "./DeleteEvent";
import { useEffect, useRef, useState } from "react";
import EditEvent, { UpdateEventDataType } from "./EditEvent";
import { X } from "lucide-react";
type Props = {
  type: "Delete Event" | "Edit Event";
  token: string;
  id?: string;
  eventData?: UpdateEventDataType;
};
export default function EventOperations({ type, id, token, eventData }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (close) {
      closeRef.current?.click();
    }
  }, [close]);

  console.log(close);
  const classes =
    type == "Edit Event"
      ? "text-green-500 hover:bg-green-500 hover:text-white border-green-500"
      : "text-red-500 hover:bg-red-500 hover:text-white border-red-500";
  return (
    <AlertDialog onOpenChange={() => setClose(false)}>
      <AlertDialogTrigger
        className={`px-4 py-1.5 w-full rounded-md cursor-pointer duration-300 border ${classes}`}>
        {type}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-Main-black text-white border-soft-border">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "Delete Event"
              ? "Are you sure you want to delete this event?"
              : "Edite Event"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "Delete Event" &&
              "This action cannot be undone. The event will be permanently removed from the system"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {type == "Delete Event" && id && (
          <DeleteEvent setClose={setClose} id={id} token={token} />
        )}
        {type == "Edit Event" && eventData && (
          <EditEvent setClose={setClose} token={token} eventData={eventData} />
        )}
        <AlertDialogCancel
          ref={closeRef}
          className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute top-2 right-2">
          <X />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
