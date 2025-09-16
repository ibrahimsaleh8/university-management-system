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
import { Trash2, X } from "lucide-react";
import { useRef } from "react";
type Props = {
  id: string;
  token: string;
};
async function unregisterCourse({ id, token }: Props) {
  await axios.delete(
    `${MainDomain}/api/delete/student-unregister-course/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default function RemoveRegisterCourse({ id, token }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (p: Props) => unregisterCourse({ ...p }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_availabel_courses_for_register"],
      });
      queryClient.refetchQueries({
        queryKey: ["show_registerd_courses"],
      });
      GlobalToast({
        icon: "success",
        title: "Course has been unregisterd success",
      });
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
      <AlertDialogTrigger asChild>
        <Button className="h-8" variant={"destructive"}>
          <Trash2 /> Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to unregister from this course?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Button
          onClick={() => {
            mutate({
              id,
              token,
            });
          }}
          disabled={isPending}
          className="w-32 ml-auto"
          variant={"destructive"}>
          {isPending ? <SmallLoader /> : "Unregister"}
        </Button>

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute top-2 right-2">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
