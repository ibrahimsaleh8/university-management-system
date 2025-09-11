import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import UploadAttachment from "@/app/dashboard/_components/forms/UploadAttachment";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useUpdateAnnouncment } from "./Hook/useUpdateAnnouncment";
import { AttachemntsFilesDataType } from "./TeacherClassAnnouncments";
import EditeAttachments from "./EditeAttachments";
type Props = {
  title: string;
  annId: string;
  content: string;
  token: string;
  className: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  attachments: AttachemntsFilesDataType[];
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

      <EditeAttachments
        attachments={attachments}
        deleteAttachments={deleteAttachments}
        setDeleteAttachments={setDeleteAttachments}
      />
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
