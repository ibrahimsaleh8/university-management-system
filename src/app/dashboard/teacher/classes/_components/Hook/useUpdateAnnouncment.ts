import { CreateAttachmentDataApi } from "@/app/api/create/announcment-attachments/route";
import { UploadAttachmentApi } from "@/app/dashboard/_components/forms/UploadAttachment";
import GlobalToast from "@/components/Global/GlobalToast";
import { uploadImageApi } from "@/hooks/useAddStudent";
import { AttachmentsFileType, ErrorResponseType } from "@/lib/globalTypes";
import {
  AnnouncementUpdateSchema,
  annUpdateDataType,
} from "@/validation/EditAnnouncementSchema";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  title: string;
  annId: string;
  content: string;
  token: string;
  className: string;
  setClose: Dispatch<SetStateAction<boolean>>;
};

async function updateAnnouncmet(
  id: string,
  data: annUpdateDataType,
  token: string
) {
  await axios.put(`${MainDomain}/api/update/announcement/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function deleteAttachmentAnnouncmet(
  id: string,
  ids: { id: string }[],
  token: string
) {
  await axios.patch(
    `${MainDomain}/api/update/announcement/${id}/attachment`,
    { ids },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

async function createNewAttachmentsapi(
  token: string,
  data: CreateAttachmentDataApi
) {
  await axios.post(`${MainDomain}/api/create/announcment-attachments`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const useUpdateAnnouncment = ({
  annId,
  content,
  title,
  token,
  className,
  setClose,
}: Props) => {
  const [annTitle, setAnnTitle] = useState(title ?? "");
  const [annContent, setAnnContent] = useState(content ?? "");
  const queryClient = useQueryClient();
  const [deleteAttachments, setDeleteAttachments] = useState<{ id: string }[]>(
    []
  );
  const [files, setFiles] = useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_ann", annId],
    mutationFn: (data: {
      id: string;
      data: annUpdateDataType;
      token: string;
    }) => updateAnnouncmet(data.id, data.data, data.token),
    onSuccess: () => {
      setClose(true);
      queryClient.refetchQueries({
        queryKey: ["class_announcment", className],
      });
      GlobalToast({
        title: "Announcement has been updated successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });

  const { mutateAsync: mutateAttachments, isPending: loadingDelete } =
    useMutation({
      mutationFn: (data: {
        id: string;
        ids: { id: string }[];
        token: string;
      }) => deleteAttachmentAnnouncmet(data.id, data.ids, data.token),
      onError: (err: ErrorResponseType) => {
        GlobalToast({ title: err.response.data.message, icon: "error" });
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

  const { mutateAsync: mutatNewAttachment, isPending: addingAttachments } =
    useMutation({
      mutationFn: (data: { token: string; data: CreateAttachmentDataApi }) =>
        createNewAttachmentsapi(data.token, data.data),
      onError: (err: ErrorResponseType) => {
        GlobalToast({
          title: err.response.data.message ?? "Something went wrong",
          icon: "error",
        });
      },
    });

  const HandleEdit = async () => {
    const data: annUpdateDataType = { title: annTitle, content: annContent };
    const validation = AnnouncementUpdateSchema.safeParse(data);

    if (!validation.success) {
      GlobalToast({
        title: validation.error.errors[0].message,
        icon: "error",
      });
      return;
    }
    if (deleteAttachments.length > 0) {
      await mutateAttachments({
        id: annId,
        token,
        ids: deleteAttachments,
      });
    }

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
      await mutatNewAttachment({
        data: { annId, attachments: attachmentsFiles },
        token,
      });
    }

    mutate({ data, id: annId, token });
  };
  return {
    HandleEdit,
    addingAttachments,
    UploadingImage,
    Uploading,
    loadingDelete,
    isPending,
    files,
    setFiles,
    deleteAttachments,
    setDeleteAttachments,
    setAnnContent,
    setAnnTitle,
    annTitle,
    annContent,
  };
};
