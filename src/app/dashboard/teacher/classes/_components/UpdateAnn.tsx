import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import UploadAttachment from "@/app/dashboard/_components/forms/UploadAttachment";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { AttachmentsFileType } from "@/lib/globalTypes";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useUpdateAnnouncment } from "./Hook/useUpdateAnnouncment";
type Props = {
  title: string;
  annId: string;
  content: string;
  token: string;
  className: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  attachments: {
    id: string;
    name: string;
    url: string;
    type: AttachmentsFileType;
  }[];
};

export default function UpdateAnn({
  annId,
  content,
  title,
  token,
  className,
  setClose,
  attachments,
}: Props) {
  const {
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
  } = useUpdateAnnouncment({
    annId,
    content,
    title,
    token,
    className,
    setClose,
  });
  return (
    <div className="flex flex-col gap-3">
      <InputForm
        onChange={(e) => setAnnTitle(e.target.value)}
        isError={false}
        label="Title"
        placeholder="Title"
        type="text"
        defaultValue={annTitle}
      />

      <TextAreaForm
        onChange={(e) => setAnnContent(e.target.value)}
        isError={false}
        label="Content"
        defaultValue={annContent}
        placeholder="Content"
      />

      {attachments.length > 0 &&
        attachments
          .filter((att) => !deleteAttachments.find((e) => e.id == att.id))
          .map((att) => (
            <div
              className="flex items-center gap-3 w-fit relative"
              key={att.id}>
              <Button
                onClick={() => {
                  setDeleteAttachments((pre) => [...pre, { id: att.id }]);
                }}
                variant={"destructive"}
                className="w-8 h-8 flex items-center justify-center absolute left-0 top-0 z-10">
                <Trash2 className="w-4 h-4 text-white" />
              </Button>
              {att.type == "PDF" ? (
                <a
                  className="p-3 bg-Second-Card-bg hover:opacity-80 duration-300 flex flex-col gap-2 items-center justify-center rounded-md"
                  target="_blank"
                  href={att.url}>
                  <FaFilePdf className="w-10 h-10" />
                  <p className="text-low-white text-sm">{att.name}</p>
                </a>
              ) : (
                <Image
                  alt="Placeholder image"
                  className="w-96 object-cover object-center rounded-2xl"
                  height={800}
                  src={att.url}
                  unoptimized
                  width={1200}
                />
              )}
            </div>
          ))}

      <UploadAttachment files={files} setFiles={setFiles} />

      <Button
        disabled={
          isPending ||
          loadingDelete ||
          Uploading ||
          UploadingImage ||
          addingAttachments
        }
        onClick={HandleEdit}
        className="mt-2"
        variant={"mainWithShadow"}>
        {isPending ||
        loadingDelete ||
        Uploading ||
        UploadingImage ||
        addingAttachments ? (
          <>
            Updating... <SmallLoader />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </div>
  );
}
