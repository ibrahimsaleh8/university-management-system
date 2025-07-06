import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type Props = {
  token: string;
  annId: string;
  className: string;
  setClose: Dispatch<SetStateAction<boolean>>;
};

async function deleteAnn(id: string, token: string) {
  await axios.delete(`${MainDomain}/api/delete/announcement/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export default function DeleteAnn({
  annId,
  token,
  className,
  setClose,
}: Props) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delet_ann", annId],
    mutationFn: (data: { id: string; token: string }) =>
      deleteAnn(data.id, data.token),
    onSuccess() {
      setClose(true);
      queryClient.refetchQueries({
        queryKey: ["class_announcment", className],
      });
      GlobalToast({
        title: "Announcement has been deleted successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });
  return (
    <Button
      onClick={() => {
        mutate({ id: annId, token });
      }}
      disabled={isPending}
      variant={"destructive"}
      className="w-32 mt-1 ml-auto">
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
