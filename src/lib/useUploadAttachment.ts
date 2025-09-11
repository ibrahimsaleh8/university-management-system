import { UploadAttachmentApi } from "@/app/dashboard/_components/forms/UploadAttachment";
import { AttachmentsFileType, ErrorResponseType } from "./globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import { uploadImageApi } from "@/hooks/useAddStudent";
import { useMutation } from "@tanstack/react-query";

export const useUploadAttachment = () => {
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

  const UploadAttch = async (files: File[]) => {
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

    return attachmentsFiles;
  };

  return {
    UploadAttch,
    Uploading,
    UploadingImage,
  };
};
