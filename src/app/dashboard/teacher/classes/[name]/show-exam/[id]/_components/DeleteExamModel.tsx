"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/animate-ui/radix/dialog";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {
  examId: string;
  token: string;
  className: string;
};

async function deleteExam(id: string, token: string) {
  await axios.delete(`${MainDomain}/api/delete/exam/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default function DeleteExamModel({ examId, className, token }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const route = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_exam", examId],
    mutationFn: (data: { id: string; token: string }) =>
      deleteExam(data.id, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["class_exams", className] });
      closeRef.current?.click();
      route.replace("/dashboard/teacher/classes/noyan");
      GlobalToast({
        title: "Exam Deleted Success",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger className="bg-red-600 px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-700 duration-300 text-white">
        Delete Exam
      </DialogTrigger>
      <DialogContent className="bg-Main-black text-white border-soft-border">
        <DialogHeader>
          <DialogTitle>Delete this exam ?</DialogTitle>
          <DialogDescription>
            This action will permanently delete the exam and all its associated
            data, including questions and student submissions
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-2">
          <Button
            disabled={isPending}
            onClick={() => mutate({ id: examId, token })}
            className="w-32"
            variant={"destructive"}>
            {isPending ? (
              <>
                Deleting... <SmallLoader />
              </>
            ) : (
              "Delete Exam"
            )}
          </Button>
        </div>

        <DialogClose ref={closeRef}></DialogClose>
      </DialogContent>
    </Dialog>
  );
}
