"use client";
import GlobalToast from "@/components/Global/GlobalToast";
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
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";
import { useRef } from "react";
type Props = {
  yearLabel: string;
  token: string;
  level_number: number;
};

async function moveStudentsToNextGrade(
  level_number: number,
  token: string
): Promise<{ message: string }> {
  const res = await axios.patch(
    `${MainDomain}/api/update/move-students-next-grade`,
    { gradeLevelNumber: level_number },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function MoveingToNextGrade({
  yearLabel,
  level_number,
  token,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { level_number: number; token: string }) =>
      moveStudentsToNextGrade(params.level_number, params.token),
    onSuccess: (res) => {
      queryClient.refetchQueries({
        queryKey: ["get_all_students"],
      });
      queryClient.refetchQueries({ queryKey: ["students_number"] });
      GlobalToast({
        icon: "success",
        title: res.message,
      });
      closeRef.current?.click();
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-main-text text-black text-xs cursor-pointer border w-full border-main-text hover:bg-Second-black hover:text-main-text rounded-sm p-1.5 duration-300">
        {level_number != 4 ? (
          <>Move {yearLabel} Students to Next Grade</>
        ) : (
          <>Move {yearLabel} Students to Graduate</>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will move studnets in {yearLabel} to Next Grade Year
          </AlertDialogDescription>

          <Button
            onClick={() => {
              mutate({
                level_number,
                token,
              });
            }}
            disabled={isPending}
            className="w-36 ml-auto mt-4"
            variant={"mainWithShadow"}>
            {isPending ? <SmallLoader /> : "Move Students"}
          </Button>
        </AlertDialogHeader>
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
