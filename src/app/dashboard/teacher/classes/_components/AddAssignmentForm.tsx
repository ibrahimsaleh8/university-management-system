import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  assignmentDataType,
  assignmentSchema,
} from "@/validation/AddAssignmentSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
type Props = {
  classId: number;
  className: string;
  token: string;
  setClose: Dispatch<SetStateAction<boolean>>;
};
async function createNewAssignment(data: assignmentDataType, token: string) {
  await axios.post(`${MainDomain}/api/create/assignment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function AddAssignmentForm({
  classId,
  className,
  token,
  setClose,
}: Props) {
  const queryClient = useQueryClient();

  const [isExternalUrl, setIsExternalUrl] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<assignmentDataType>({
    resolver: zodResolver(assignmentSchema),
    mode: "all",
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["create_assginment"],
    mutationFn: (assignmentData: { data: assignmentDataType; token: string }) =>
      createNewAssignment(assignmentData.data, assignmentData.token),
    onSuccess: () => {
      GlobalToast({
        title: "Assignment has been created successfully",
        icon: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["class_assignments", className],
      });
      setClose(true);
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });

  const addNewAssignment: SubmitHandler<assignmentDataType> = (data) => {
    if (isExternalUrl && data.external_url == "") {
      GlobalToast({ title: "Enter External Link", icon: "warning" });
      return;
    }
    mutate({ data, token });
  };
  useEffect(() => {
    if (classId) {
      setValue("classId", classId);
    }
  }, [classId, setValue]);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(addNewAssignment)}>
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        <InputForm
          isError={errors.title != undefined}
          label="Title"
          placeholder="Title"
          type="text"
          register={register("title")}
        />
        <InputForm
          isError={errors.deadline != undefined}
          label="Deadline"
          placeholder="Deadline"
          type="datetime-local"
          register={register("deadline")}
        />
      </div>
      <ErrorMessage error1={errors.title} error2={errors.deadline} />
      <TextAreaForm
        isError={errors.description != undefined}
        label="Description"
        placeholder="Description"
        register={register("description")}
      />
      <ErrorMessage error1={errors.description} />

      {/* Is there external link */}
      <div className="flex flex-col gap-1">
        <p>Add External Link ?</p>
        <RadioGroup
          onValueChange={(e) => setIsExternalUrl(e == "yes")}
          defaultValue="no">
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
            register={register("external_url")}
          />
          <ErrorMessage error1={errors.external_url} />
        </>
      )}

      <Button disabled={isPending} variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Adding.. <SmallLoader />
          </>
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
}
