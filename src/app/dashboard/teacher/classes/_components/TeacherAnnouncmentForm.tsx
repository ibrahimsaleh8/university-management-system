"use client";
import { CreateTeacherAnnouncmentDataType } from "@/app/api/create/teacher-announcement/route";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import UploadAttachment, {
  UploadAttachmentApi,
} from "@/app/dashboard/_components/forms/UploadAttachment";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { uploadImageApi } from "@/hooks/useAddStudent";
import { AttachmentsFileType, ErrorResponseType } from "@/lib/globalTypes";
import {
  addAnnouncementDataType,
  AddAnnouncementSchema,
} from "@/validation/AddAnnouncementSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
  className: string;
  classId: number;
};

async function createAnnouncment(
  annData: CreateTeacherAnnouncmentDataType,
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
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addAnnouncementDataType>({
    resolver: zodResolver(AddAnnouncementSchema),
    mode: "onSubmit",
    defaultValues: {
      classId,
    },
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["create_new_ann"],
    mutationFn: (data: {
      annData: CreateTeacherAnnouncmentDataType;
      token: string;
    }) => createAnnouncment(data.annData, data.token),

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

  const { mutateAsync: uploadPDF, isPending: Uploading } = useMutation({
    mutationFn: (file: File) => UploadAttachmentApi(file),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response?.data?.message || "Upload failed",
        icon: "error",
      });
    },
  });

  const { mutateAsync: uploadImag, isPending: UploadingImage } = useMutation({
    mutationFn: (imageFile: File) => uploadImageApi(imageFile),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const submitNewAnnounc: SubmitHandler<addAnnouncementDataType> = async (
    data
  ) => {
    if (files.length > 0) {
      const attachmentsFiles: {
        type: AttachmentsFileType;
        name: string;
        url: string;
      }[] = [];

      for (let i = 0; i < files.length; i++) {
        const uploaded = files[i].type.includes("image")
          ? await uploadImag(files[i])
          : await uploadPDF(files[i]);
        attachmentsFiles.push({
          type: files[i].type.includes("image") ? "IMAGE" : "PDF",
          url: uploaded.url,
          name: files[i].name,
        });
      }

      mutate({
        annData: {
          classId: data.classId,
          content: data.content,
          title: data.title,
          attachments: attachmentsFiles,
        },
        token,
      });
    } else {
      mutate({ annData: data, token });
    }
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
      <UploadAttachment files={files} setFiles={setFiles} />

      <Button
        type="submit"
        disabled={isPending || Uploading || UploadingImage}
        variant={"mainWithShadow"}
        className="mt-2">
        {isPending ? (
          <>
            Publishing... <SmallLoader />
          </>
        ) : Uploading || UploadingImage ? (
          <>
            Uploading... <SmallLoader />
          </>
        ) : (
          "Publish"
        )}
      </Button>
    </form>
  );
}
