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
import { PenLine, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EditTeacherProfileForm from "./EditTeacherProfileForm";

type Props = {
  token: string;
  image: string;
  bio: string | null;
  setCurrentImage: Dispatch<SetStateAction<string>>;
};

export default function UpdateBioAndImage({
  bio,
  image,
  token,
  setCurrentImage,
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
        <Button className="w-40 ml-auto bg-Second-Card-bg hover:bg-Second-black hover:text-white">
          <PenLine />
          Edit Profile
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Image & Bio</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <EditTeacherProfileForm
          setCurrentImage={setCurrentImage}
          bio={bio}
          image={image}
          token={token}
          setClose={setClose}
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
