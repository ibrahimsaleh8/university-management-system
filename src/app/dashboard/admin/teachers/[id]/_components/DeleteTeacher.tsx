import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
type Props = {
  token: string;
  teacher_id: string;
  setIsClose: Dispatch<SetStateAction<boolean>>;
};
async function deleteTeacherApi(token: string, teacher_id: string) {
  await axios.delete(`${MainDomain}/api/delete/teacher/${teacher_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function DeleteTeacher({
  teacher_id,
  setIsClose,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (p: { token: string; teacher_id: string }) =>
      deleteTeacherApi(p.token, p.teacher_id),
    onSuccess: () => {
      router.replace("/dashboard/admin/teachers");

      queryClient.refetchQueries({
        queryKey: ["get_all_teachers"],
      });
      GlobalToast({
        title: "Teacher Deleted Success",
        icon: "success",
      });
      setIsClose(true);
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });
  return (
    <Button
      onClick={() => {
        mutate({
          teacher_id,
          token,
        });
      }}
      disabled={isPending}
      className="min-w-36 ml-auto"
      variant={"destructive"}>
      {isPending ? (
        <>
          Deleteing... <SmallLoader />
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
}
