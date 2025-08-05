import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
type Props = {
  id: string;
  token: string;
  setClose: Dispatch<SetStateAction<boolean>>;
};

async function deleteEventApi(id: string, token: string) {
  await axios.delete(`${MainDomain}/api/delete/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function DeleteEvent({ id, token, setClose }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_event"],
    mutationFn: (params: { id: string; token: string }) =>
      deleteEventApi(params.id, params.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_all_events"] });
      setClose(true);
      GlobalToast({
        title: "Event has been deleted successfully",
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

  const HandleDelete = () => {
    mutate({ id, token });
  };
  return (
    <div className="flex justify-end">
      <Button
        disabled={isPending}
        onClick={HandleDelete}
        className="min-w-24 flex items-center gap-1"
        variant={"destructive"}>
        {isPending ? (
          <>
            Deleteing.. <SmallLoader />
          </>
        ) : (
          "Delete"
        )}
      </Button>
    </div>
  );
}
