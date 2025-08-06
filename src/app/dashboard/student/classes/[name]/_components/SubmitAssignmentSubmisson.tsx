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
import { Input } from "@/components/ui/input";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  assignmentId: string;
  token: string;
  className: string;
};

async function sendAssignmentSubmission({
  assignmentId,
  token,
  url,
}: {
  assignmentId: string;
  token: string;
  url: string;
}) {
  await axios.post(
    `${MainDomain}/api/create/assignment-submisson`,
    {
      assignmentId: assignmentId,
      external_url: url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default function SubmitAssignmentSubmisson({
  className,
  assignmentId,
  token,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { assignmentId: string; token: string; url: string }) =>
      sendAssignmentSubmission(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["student_class_assignment", className],
      });
      GlobalToast({
        icon: "success",
        title: "Assignment has been submitted successfully",
      });
      closeRef.current?.click();
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const HandleNewSubmission = () => {
    const urlPattern =
      /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/\S*)?\b/;
    const isValidUrl = urlPattern.test(url);

    if (!isValidUrl) {
      GlobalToast({
        icon: "warning",
        title: "Invalid URL",
      });
      return;
    }

    mutate({
      url,
      assignmentId,
      token,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"mainWithShadow"}>Submit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Assignment</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure to paste the link to your assignment submission in
            this field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="sub-url">
              Your Work Link:
            </label>
            <Input
              onChange={(e) => setUrl(e.target.value)}
              id="sub-url"
              placeholder="URL"
              type="text"
            />
          </div>
          <Button
            disabled={isPending}
            onClick={HandleNewSubmission}
            variant={"mainWithShadow"}>
            {isPending ? <SmallLoader /> : "Send"}
          </Button>
        </div>
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
