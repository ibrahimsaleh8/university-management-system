import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useRef } from "react";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { SendChatMessageType } from "@/validation/SendMessageValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
type Props = {
  chatId: string;
  token: string;
};
async function sendChatMessage(data: SendChatMessageType, token: string) {
  await axios.post(`${MainDomain}/api/messages/send-chat-message`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function SendMessageOnChat({ chatId, token }: Props) {
  const messageTxt = useRef<HTMLTextAreaElement>(null);
  const reactQuery = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (params: { data: SendChatMessageType; token: string }) =>
      sendChatMessage(params.data, params.token),
    onSuccess: () => {
      reactQuery.refetchQueries({
        queryKey: ["chat_msgs", chatId],
      });
      reactQuery.refetchQueries({
        queryKey: ["get_all_chats"],
      });
      if (messageTxt.current) messageTxt.current.value = "";
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });
  const addNewMessage = () => {
    if (!messageTxt.current) return;
    if (messageTxt.current.value.trim().length == 0) {
      return;
    }
    mutate({ data: { chatId, message: messageTxt.current.value }, token });
  };
  return (
    <div className="w-full bg-Second-black mt-auto flex items-center gap-2 p-2">
      <Textarea
        ref={messageTxt}
        className="bg-black resize-none h-full"
        placeholder="Message"
      />
      <Button
        onClick={addNewMessage}
        variant={"mainWithShadow"}
        disabled={isPending}
        className="rounded-full">
        {isPending ? <SmallLoader /> : <Send className="w-5 h-5" />}
      </Button>
    </div>
  );
}
