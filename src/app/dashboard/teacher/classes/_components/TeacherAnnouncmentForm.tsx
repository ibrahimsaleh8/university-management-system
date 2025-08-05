"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  addAnnouncementDataType,
  AddAnnouncementSchema,
} from "@/validation/AddAnnouncementSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
  className: string;
  classId: number;
};

async function createAnnouncment(
  annData: addAnnouncementDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/teacher-announcement`, annData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function TeacherAnnouncmentForm({
  classId,
  setClose,
  token,
  className,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addAnnouncementDataType>({
    resolver: zodResolver(AddAnnouncementSchema),
    mode: "all",
  });
  useEffect(() => {
    setValue("classId", classId);
  }, [classId, setValue]);
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["create_new_ann"],
    mutationFn: (data: { annData: addAnnouncementDataType; token: string }) =>
      createAnnouncment(data.annData, data.token),

    onSuccess: () => {
      setClose(true);
      queryClient.refetchQueries({
        queryKey: ["class_announcment", className],
      });
      GlobalToast({
        title: "Announcement has been published successfully",
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

  const submitNewAnnounc: SubmitHandler<addAnnouncementDataType> = (data) => {
    mutate({ annData: data, token });
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitNewAnnounc)}>
      <InputForm
        isError={errors.title != undefined}
        label="Title"
        placeholder="Title"
        register={register("title")}
        type="text"
      />
      <ErrorMessage error1={errors.title} />
      <TextAreaForm
        isError={errors.content != undefined}
        label="Content"
        placeholder="Content"
        register={register("content")}
      />
      <ErrorMessage error1={errors.content} />

      <Button
        type="submit"
        disabled={isPending}
        variant={"mainWithShadow"}
        className="mt-2">
        {isPending ? (
          <>
            Publishing... <SmallLoader />
          </>
        ) : (
          "Publish"
        )}
      </Button>
    </form>
  );
}
