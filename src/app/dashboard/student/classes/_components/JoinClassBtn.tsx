import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserPlus } from "lucide-react";

type Props = {
  classId: number;
  token: string;
};
async function joinToClass(classId: number, token: string) {
  await axios.post(
    `${MainDomain}/api/create/student-join-class`,
    { classId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export default function JoinClassBtn({ classId, token }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (p: { classId: number; token: string }) =>
      joinToClass(p.classId, p.token),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["unregisterd_classes"],
      });
      queryClient.refetchQueries({
        queryKey: ["registerd_classes"],
      });
      GlobalToast({
        icon: "success",
        title: "You have successfully enrolled in the class!",
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
      disabled={isPending}
      onClick={() => {
        mutate({
          classId,
          token,
        });
      }}
      className="w-full hover:bg-main-text hover:text-black bg-transparent border border-main-text text-main-text !duration-300">
      {isPending ? (
        <SmallLoader color="white" />
      ) : (
        <>
          <UserPlus />
          Join
        </>
      )}
    </Button>
  );
}
