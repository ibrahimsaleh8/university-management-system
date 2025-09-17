import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
type Props = {
  token: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  className: string;
  assignmentId: string;
};

async function deleteAssignmentApi(assignId: string, token: string) {
  await axios.delete(`${MainDomain}/api/delete/assignment/${assignId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default function DeleteAssignment({
  setClose,
  className,
  assignmentId,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete_assignmetn", assignmentId],
    mutationFn: (data: { assignId: string; token: string }) =>
      deleteAssignmentApi(data.assignId, data.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({
        title: "Assignment has been deleted successfully",
        icon: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["class_assignments", className],
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
    <Button
      onClick={() => {
        mutate({ assignId: assignmentId, token });
      }}
      disabled={isPending}
      className="w-32 mt-3 ml-auto"
      variant={"destructive"}>
      {isPending ? (
        <>
          Deleting... <SmallLoader />
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
}
