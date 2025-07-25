"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateMessageDataType,
  CreateMessageSchema,
} from "@/validation/CreateMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "../forms/InputForm";
import TextAreaForm from "../forms/TextAreaForm";
import ErrorMessage from "../forms/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import SmallLoader from "@/components/Global/SmallLoader";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import EmojiPickerTab from "./EmojiPicker";

async function createNewMessageApi(msgData: CreateMessageDataType): Promise<{
  chatId: string;
}> {
  const res = await axios.post(
    `${MainDomain}/api/messages/create-message`,
    msgData
  );
  return res.data;
}
type Props = {
  role: string;
  email: string;
};
export default function CreateNewChat({ email, role }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const [emoji, setEmoji] = useState<string>("");

  // Query Api
  const { isPending, mutate } = useMutation({
    mutationKey: ["create_new_message"],
    mutationFn: (msgData: CreateMessageDataType) =>
      createNewMessageApi(msgData),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["get_all_chats"] });
      queryClient.refetchQueries({ queryKey: ["chat_msgs", data.chatId] });

      closeRef.current?.click();
      GlobalToast({
        title: "Message Has been sent",
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

  // Handle Form Submit
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CreateMessageDataType>({
    resolver: zodResolver(CreateMessageSchema),
    mode: "onSubmit",
    defaultValues: {
      emailFrom: email,
      senderRole: role.toUpperCase(),
    },
  });

  const submitNewMessage: SubmitHandler<CreateMessageDataType> = (data) => {
    if (data.emailFrom == data.emailTo) {
      GlobalToast({
        icon: "error",
        title: "You can't send message to yourself",
      });
      return;
    }
    mutate(data);
  };

  // Handle Emojies
  useEffect(() => {
    if (emoji.length > 0) {
      setValue("message", watch("message") + emoji);
      setEmoji("");
    }
  }, [email, emoji, setValue, watch]);
  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          reset({
            emailFrom: email,
            senderRole: role.toUpperCase(),
            emailTo: "",
            message: "",
            receiverRole: "",
          });
        }
      }}>
      <AlertDialogTrigger className="w-7 h-7 cursor-pointer bg-Second-black flex items-center justify-center rounded-full">
        <Plus className="w-4 h-4 text-main-text" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send New Message</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(submitNewMessage)}
          className="flex flex-col gap-3">
          {/* Roles && Reciver email */}
          <div className="flex items-center gap-2 flex-col sm:flex-row">
            <div className="flex flex-col gap-1">
              <label className="text-sm" htmlFor="rec-role">
                Receiver Role:
              </label>
              <Select onValueChange={(e) => setValue("receiverRole", e)}>
                <SelectTrigger id="rec-role" className="w-[180px]">
                  <SelectValue placeholder="Receiver Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputForm
              isError={errors.emailTo != undefined}
              label="To Email"
              placeholder="Receiver Email"
              type="email"
              register={register("emailTo")}
            />
          </div>
          <ErrorMessage error1={errors.receiverRole} error2={errors.emailTo} />
          {/* Message */}
          <div className="relative">
            <TextAreaForm
              isError={errors.message != undefined}
              label="Message"
              placeholder="Your Message"
              register={register("message")}
            />
            <div className="absolute right-0 bottom-0">
              <EmojiPickerTab setEmoji={setEmoji} />
            </div>
          </div>
          <ErrorMessage error1={errors.message} />
          <Button
            disabled={isPending}
            variant={"mainWithShadow"}
            className="w-full">
            {isPending ? (
              <>
                Sending... <SmallLoader />
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
