import { useUploadAttachment } from "@/lib/useUploadAttachment";
import { CreateAssignmentAttachmentDataApi } from "@/app/api/create/assignement-attachments/route";
import { ErrorResponseType } from "@/lib/globalTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import GlobalToast from "@/components/Global/GlobalToast";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  updateAssignmentDataType,
  updateAssignmentSchema,
} from "@/validation/EditAssignmentSchema";
type Props = {
  data: { id: string } & updateAssignmentDataType;
  token: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  className: string;
};
async function updateAssignmentApi(
  assignID: string,
  token: string,
  data: updateAssignmentDataType
) {
  await axios.put(`${MainDomain}/api/update/assignment/${assignID}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function deleteAttachmentsApi(token: string, ids: { id: string }[]) {
  await axios.patch(
    `${MainDomain}/api/delete/attachment`,
    { ids },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

async function addAssigmentAttachmentsApi(
  token: string,
  data: CreateAssignmentAttachmentDataApi
) {
  await axios.post(`${MainDomain}/api/create/assignement-attachments`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const useEditeAssignment = ({
  className,
  data,
  setClose,
  token,
}: Props) => {
  const queryClient = useQueryClient();
  const [isExternalUrl, setIsExternalUrl] = useState(
    data.external_url ?? false
  );
  const [deleteAttachments, setDeleteAttachments] = useState<{ id: string }[]>(
    []
  );
  const [files, setFiles] = useState<File[]>([]);
  const { UploadAttch, Uploading, UploadingImage } = useUploadAttachment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateAssignmentDataType>({
    resolver: zodResolver(updateAssignmentSchema),
    mode: "all",
    defaultValues: {
      title: data.title,
      description: data.description,
      external_url: data.external_url ?? "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["update_assignmetn"],
    mutationFn: (data: {
      assignID: string;
      token: string;
      data: updateAssignmentDataType;
    }) => updateAssignmentApi(data.assignID, data.token, data.data),
    onSuccess: () => {
      setClose(true);
      GlobalToast({
        title: "Assignment has been updated successfully",
        icon: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["class_assignments", className],
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const { isPending: deleting, mutateAsync: DeleteAttachments } = useMutation({
    mutationFn: (data: { token: string; ids: { id: string }[] }) =>
      deleteAttachmentsApi(data.token, data.ids),

    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const { isPending: addingAttachments, mutateAsync: addNewAttachments } =
    useMutation({
      mutationFn: (data: {
        token: string;
        data: CreateAssignmentAttachmentDataApi;
      }) => addAssigmentAttachmentsApi(data.token, data.data),

      onError: (err: ErrorResponseType) => {
        GlobalToast({
          title: err.response.data.message,
          icon: "error",
        });
      },
    });

  const updateAssignment: SubmitHandler<updateAssignmentDataType> = async (
    formData
  ) => {
    if (isExternalUrl && formData.external_url == "") {
      GlobalToast({ title: "Enter External Link", icon: "warning" });
      return;
    }
    if (!isExternalUrl) {
      formData.external_url = "";
    }
    // Delete Attachments
    if (deleteAttachments.length > 0) {
      await DeleteAttachments({
        ids: deleteAttachments,
        token,
      });
    }

    // Add new Attachmnets
    if (files.length > 0) {
      const attachmentsFiles = await UploadAttch(files);
      //  Mutate new Attachments
      await addNewAttachments({
        token,
        data: {
          assignmentId: data.id,
          attachments: attachmentsFiles,
        },
      });
    }

    mutate({ assignID: data.id, data: formData, token });
  };
  return {
    updateAssignment,
    addingAttachments,
    deleting,
    isPending,
    errors,
    register,
    handleSubmit,
    Uploading,
    UploadingImage,
    files,
    setFiles,
    deleteAttachments,
    setDeleteAttachments,
    setIsExternalUrl,
    isExternalUrl,
  };
};
