"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/animate-ui/radix/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
type Props = {
  title: string;
  deleteFn: () => void;
};
export default function DeleteAlert({ deleteFn, title }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-red-600 rounded-md cursor-pointer">
        <Trash2 />
      </DialogTrigger>
      <DialogContent
        from="bottom"
        className="bg-Main-black text-white pb-0 border-soft-border">
        <DialogHeader>
          <DialogTitle>Delete {title}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              deleteFn();
              closeRef.current?.click();
            }}
            className="w-32"
            variant={"destructive"}>
            Delete
          </Button>
        </div>
        <DialogFooter>
          <DialogClose ref={closeRef} className="hidden"></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
