import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  classId: number;
  className: string;
  token: string;
};
async function createNewAssignment(data: assignmentDataType, token: string) {
  await axios.post(`${MainDomain}/api/create/assignment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function AddAssignment({ classId, token, className }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
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
      closeRef.current?.click();
      GlobalToast({
        title: "Assignment has been created successfully",
        icon: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["class_assignments", className],
      });
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
    <AlertDialog>
      <AlertDialogTrigger className="bg-transparent font-medium cursor-pointer text-sm text-main-text px-4 py-2 border border-main-text hover:bg-main-text hover:text-Main-black duration-300 rounded-sm sm:w-fit w-full">
        Add Assignment
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Assignment</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

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
              type="date"
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

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
