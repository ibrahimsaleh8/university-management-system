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
import { Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
type Props = {
  title: string;
  deleteFn: () => void;
  isSuccess?: boolean;
  isPending?: boolean;
};
export default function DeleteAlert({
  deleteFn,
  title,
  isSuccess,
  isPending,
}: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (isSuccess && closeRef && !isPending) {
      closeRef.current?.click();
    }
  }, [isPending, isSuccess]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-8 h-8" variant={"destructive"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-Main-black text-white pb-0 border-soft-border">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end">
          <Button
            disabled={isPending}
            onClick={() => {
              deleteFn();
            }}
            className="min-w-32"
            variant={"destructive"}>
            {isPending ? <SmallLoader color="white" /> : "Delete"}
          </Button>
        </div>
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
