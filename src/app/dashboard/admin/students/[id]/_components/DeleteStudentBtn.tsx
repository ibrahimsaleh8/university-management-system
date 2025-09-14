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
  student_id: string;
  token: string;
};
async function deleteStudentApi({ student_id, token }: Props) {
  await axios.delete(`${MainDomain}/api/delete/student/${student_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function DeleteStudentBtn({
  student_id,
  token,
  setIsClose,
}: Props & { setIsClose: Dispatch<SetStateAction<boolean>> }) {
  const queryClient = useQueryClient();
  const route = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Props) => deleteStudentApi(data),
    onSuccess: () => {
      GlobalToast({
        icon: "success",
        title: "Student Deleted Success",
      });
      setIsClose(true);

      queryClient.refetchQueries({
        queryKey: ["students_number"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_all_students"],
      });
      route.replace("/dashboard/admin/students");
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => {
          mutate({ student_id, token });
        }}
        disabled={isPending}
        variant={"destructive"}
        className="min-w-32">
        {isPending ? <SmallLoader /> : "Delete"}
      </Button>
    </div>
  );
}
