"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import {
  updateAssignmentDataType,
  updateAssignmentSchema,
} from "@/validation/EditAssignmentSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDeadline } from "@/lib/FormatDeadline";
import GlobalToast from "@/components/Global/GlobalToast";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import { ErrorResponseType } from "@/lib/globalTypes";
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

export default function EditAssignmentForm({
  data,
  setClose,
  token,
  className,
}: Props) {
  const [isExternalUrl, setIsExternalUrl] = useState(data.external_url != "");
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
  const queryClient = useQueryClient();
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
      console.log(err);
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });
  const updateAssignment: SubmitHandler<updateAssignmentDataType> = (
    formData
  ) => {
    if (isExternalUrl && formData.external_url == "") {
      GlobalToast({ title: "Enter External Link", icon: "warning" });
      return;
    }

    if (!isExternalUrl) {
      formData.external_url = "";
    }
    mutate({ assignID: data.id, data: formData, token });
  };

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

      <Button disabled={isPending} variant={"mainWithShadow"}>
        {isPending ? (
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
