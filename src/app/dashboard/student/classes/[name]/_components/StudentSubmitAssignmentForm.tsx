import { Input } from "@/components/ui/input";
import { AttachmentsFileType, ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import UploadAttachment from "@/app/dashboard/_components/forms/UploadAttachment";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { useUploadAttachment } from "@/lib/useUploadAttachment";
import { CreateStudentSubmissionApiDataType } from "@/app/api/create/assignment-submisson/route";
type Props = {
  assignmentId: string;
  token: string;
  className: string;
  setClose: Dispatch<SetStateAction<boolean>>;
};
async function sendAssignmentSubmission({
  token,
  data,
}: {
  token: string;
  data: CreateStudentSubmissionApiDataType;
}) {
  await axios.post(`${MainDomain}/api/create/assignment-submisson`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function StudentSubmitAssignmentForm({
  className,
  assignmentId,
  token,
  setClose,
}: Props) {
  const queryClient = useQueryClient();
  const url = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { UploadAttch, Uploading, UploadingImage } = useUploadAttachment();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      token: string;
      data: CreateStudentSubmissionApiDataType;
    }) => sendAssignmentSubmission(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["student_class_assignment", className],
      });
      GlobalToast({
        icon: "success",
        title: "Assignment has been submitted successfully",
      });
      setClose(true);
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const HandleNewSubmission = async () => {
    const externalUrl = url.current?.value as string;
    const urlPattern =
      /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/\S*)?\b/;
    const isValidUrl = urlPattern.test(externalUrl);

    if (externalUrl.trim().length == 0 && files.length == 0) {
      GlobalToast({
        icon: "warning",
        title: "You should provide Attachments or External url",
      });
      return;
    }

    if (externalUrl.trim().length > 5 && !isValidUrl) {
      GlobalToast({
        icon: "warning",
        title: "Invalid URL",
      });
      return;
    }

    let attachmentsFiles: {
      type: AttachmentsFileType;
      name: string;
      url: string;
    }[] = [];
    if (files.length > 0) {
      const attachments = await UploadAttch(files);
      attachmentsFiles = attachments;
    }

    mutate({
      token,
      data: {
        assignmentId,
        attachments: attachmentsFiles,
        external_url: externalUrl.length > 0 ? externalUrl : undefined,
      },
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="sub-url">
          Your Work Link:
        </label>
        <Input ref={url} id="sub-url" placeholder="URL" type="text" />
      </div>

      <UploadAttachment files={files} setFiles={setFiles} />

      <Button
        disabled={isPending || UploadingImage || Uploading}
        onClick={HandleNewSubmission}
        variant={"mainWithShadow"}>
        {isPending || UploadingImage || Uploading ? <SmallLoader /> : "Send"}
      </Button>
    </div>
  );
}
