import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ErrorResponseType } from "@/lib/globalTypes";
import { useAppSelector } from "@/redux/hooks";
import {
  announcementReplyDataType,
  announcementReplySchema,
} from "@/validation/AnnouncmentReplySchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  token: string;
  announcmentId: string;
};
async function postNewReply(
  replyData: announcementReplyDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/announcment-reply`, replyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function CreateAnnouncmentReply({
  announcmentId,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const { image, first_name, last_name, email } = useAppSelector(
    (state) => state.user.user
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<announcementReplyDataType>({
    resolver: zodResolver(announcementReplySchema),
    mode: "onSubmit",
    defaultValues: {
      announcementId: announcmentId,
    },
  });
  const { isPending, mutate } = useMutation({
    mutationFn: (data: {
      replyData: announcementReplyDataType;
      token: string;
    }) => postNewReply(data.replyData, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["announcment_replies", announcmentId],
      });
      GlobalToast({
        icon: "success",
        title: "Reply has been created success",
      });
      setValue("content", "");
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const submitNewReply: SubmitHandler<announcementReplyDataType> = (data) => {
    console.log(data);
    mutate({
      replyData: data,
      token,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitNewReply)}
      className="flex flex-col gap-2 border-b border-soft-border pb-4">
      <div className="flex items-start flex-col w-full gap-2 overflow-hidden">
        {/* Left */}
        <div className="flex items-start gap-2">
          <img
            src={image}
            alt="User Image"
            className="w-10 h-10 rounded-full object-center object-cover"
          />

          <div className="flex flex-col gap-1">
            <p className="text-xs capitalize text-low-white">{`${first_name} ${last_name}`}</p>
            <p className="text-xs capitalize text-low-white">{email}</p>
          </div>
        </div>

        {/* Input */}
        <Textarea
          {...register("content")}
          className="resize-none w-full max-h-48"
          placeholder="Comment"
        />
      </div>
      <ErrorMessage error1={errors.content} error2={errors.announcementId} />
      <Button
        disabled={isPending}
        variant={"mainWithShadow"}
        className="ml-auto min-w-24">
        {isPending ? <SmallLoader /> : "Send"}
      </Button>
    </form>
  );
}
