"use client";
import UpdateUserImage from "@/app/dashboard/_components/profile/UpdateUserImage";
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
import { RoleType } from "@/lib/globalTypes";
import { PencilLine, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
type Props = {
  userImage: string;
  token: string;
  role: RoleType;
  setDefaultImage: Dispatch<SetStateAction<string>>;
};
export default function UserImageModel({
  token,
  userImage,
  role,
  setDefaultImage,
}: Props) {
  const [close, setClose] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (close && closeRef.current) {
      closeRef.current.click();
      setClose(false);
    }
  }, [close]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-8 h-8 rounded-full" variant={"mainWithShadow"}>
          <PencilLine />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update image profile</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <UpdateUserImage
          setClose={setClose}
          setDefaultImage={setDefaultImage}
          role={role}
          token={token}
          userImage={userImage}
        />
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
