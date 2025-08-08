import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";
type Props = {
  examId: string;
  token: string;
  className: string;
};

async function joinToExamApi({ className, examId, token }: Props) {
  await axios.post(
    `${MainDomain}/api/create/student-join-exam`,
    {
      className,
      examId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default function JoinExamBtn({ className, examId, token }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Props) => joinToExamApi(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["student_exam_details", examId],
      });
      GlobalToast({
        icon: "success",
        title: "You are enrolled to exam success",
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
        mutate({
          className,
          examId,
          token,
        });
      }}
      disabled={isPending}
      className="min-w-36  mx-auto bg-main-text hover:bg-transparent text-black hover:text-main-text duration-300 border border-main-text">
      {isPending ? (
        <SmallLoader />
      ) : (
        <>
          <Plus /> Enroll Now
        </>
      )}
    </Button>
  );
}
