"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import { updateAssignmentDataType } from "@/validation/EditAssignmentSchema";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { formatDeadline } from "@/lib/FormatDeadline";
import SmallLoader from "@/components/Global/SmallLoader";
import { AttachemntsFilesDataType } from "./TeacherClassAnnouncments";
import UploadAttachment from "@/app/dashboard/_components/forms/UploadAttachment";
import EditeAttachments from "./EditeAttachments";
import { useEditeAssignment } from "./Hook/useEditeAssignment";
type Props = {
  data: { id: string } & updateAssignmentDataType;
  token: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  className: string;
  attachments: AttachemntsFilesDataType[];
};

export default function EditAssignmentForm({
  data,
  setClose,
  token,
  className,
  attachments,
}: Props) {
  const {
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
  } = useEditeAssignment({ data, setClose, token, className });
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(updateAssignment)}>
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        <InputForm
          isError={errors.title != undefined}
          label="Title"
          placeholder="Title"
          type="text"
          register={register("title")}
          defaultValue={data.title}
        />
        <InputForm
          isError={errors.deadline != undefined}
          label="Deadline"
          placeholder="Deadline"
          type="date"
          defaultValue={formatDeadline(data.deadline)}
          register={register("deadline")}
        />
      </div>
      <ErrorMessage error1={errors.title} error2={errors.deadline} />
      <TextAreaForm
        isError={errors.description != undefined}
        label="Description"
        placeholder="Description"
        register={register("description")}
        defaultValue={data.description}
      />
      <ErrorMessage error1={errors.description} />

      {/* Is there external link */}
      <div className="flex flex-col gap-1">
        <p>Add External Link ?</p>
        <RadioGroup
          onValueChange={(e) => setIsExternalUrl(e == "yes")}
          defaultValue={data.external_url ? "yes" : "no"}>
          <div className="flex items-center gap-1">
            <RadioGroupItem className="w-4 h-4" id="yes" value="yes" />
            <label htmlFor="yes" className="text-sm">
              Yes
            </label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem className="w-4 h-4" id="no" value="no" />
            <label htmlFor="no" className="text-sm">
              No
            </label>
          </div>
        </RadioGroup>
      </div>

      <EditeAttachments
        attachments={attachments}
        deleteAttachments={deleteAttachments}
        setDeleteAttachments={setDeleteAttachments}
      />
      <UploadAttachment files={files} setFiles={setFiles} />

      {isExternalUrl && (
        <>
          <InputForm
            isError={errors.external_url != undefined}
            label="External URL"
            placeholder="External URL"
            type="text"
            defaultValue={data.external_url}
            register={register("external_url")}
          />
          <ErrorMessage error1={errors.external_url} />
        </>
      )}

      <Button
        disabled={
          isPending ||
          deleting ||
          Uploading ||
          UploadingImage ||
          addingAttachments
        }
        variant={"mainWithShadow"}>
        {isPending ||
        deleting ||
        Uploading ||
        UploadingImage ||
        addingAttachments ? (
          <>
            Updateing... <SmallLoader />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
}
