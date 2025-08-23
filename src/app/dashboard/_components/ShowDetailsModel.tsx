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
import { Eye, X } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  childComponent: ReactNode;
};
export default function ShowDetailsModel({ childComponent, title }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-transparent border hover:text-white">
          <Eye />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div
            style={{
              maxHeight: "calc(100vh - 200px)",
            }}
            className="w-full overflow-y-auto pb-2">
            {childComponent}
          </div>
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
