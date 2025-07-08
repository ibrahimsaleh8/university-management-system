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
import { X } from "lucide-react";
type Props = {
  type: "edit" | "delete";
};
export default function AssignmentModel({ type }: Props) {
  const classes =
    type == "edit"
      ? "border-main-text text-main-text hover:bg-main-text hover:text-black"
      : type == "delete"
      ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      : "";
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`cursor-pointer flex items-center gap-1 border  w-full px-4 py-1 rounded-md text-sm  font-medium duration-300 ${classes}`}>
        {type == "edit" ? "Edit Assignment" : ""}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "edit" ? "Edit Assignment" : ""}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "delete" &&
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
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
