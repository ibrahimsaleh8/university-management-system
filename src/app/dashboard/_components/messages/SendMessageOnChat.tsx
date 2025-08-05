import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { SendChatMessageType } from "@/validation/SendMessageValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import TextAreaWithEmoji from "./TextAreaWithEmoji";
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
  const reactQuery = useQueryClient();
  const [finalText, setFinalText] = useState("");

  // Query Api
  const { mutate, isPending } = useMutation({
    mutationFn: (params: { data: SendChatMessageType; token: string }) =>
      sendChatMessage(params.data, params.token),
    onSuccess: () => {
      setFinalText("");

      reactQuery.refetchQueries({
        queryKey: ["chat_msgs", chatId],
      });
      reactQuery.refetchQueries({
        queryKey: ["get_all_chats"],
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });

  // Handle Adding Comment
  const addNewMessage = () => {
    if (finalText.trim().length == 0) {
      return;
    }
    mutate({ data: { chatId, message: finalText }, token });
  };

  return (
    <div className="w-full bg-Second-black mt-auto flex items-center pr-3 gap-6 p-2">
      <TextAreaWithEmoji text={finalText} setFinalText={setFinalText} />

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
