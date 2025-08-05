"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  departmentDataSchema,
  departmentDataType,
} from "@/validation/DepartmentDataSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function addNewDepartment(name: string, code: string, token: string) {
  await axios.post(
    `${MainDomain}/api/create/department`,
    { name, code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export default function AddDepartmentForm({ token, setClose }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<departmentDataType>({
    mode: "all",
    resolver: zodResolver(departmentDataSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_department"],
    mutationFn: (data: { name: string; code: string; token: string }) =>
      addNewDepartment(data.name, data.code, data.token),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_departments"],
      });
      setClose(true);
      GlobalToast({
        title: "Department has been created successfully",
        icon: "success",
      });
    },
  });

  const submitForm: SubmitHandler<departmentDataType> = (data) => {
    mutate({
      name: data.name,
      code: data.code,
      token,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-3">
      <InputForm
        isError={errors.name != undefined}
        label="Department Name"
        placeholder="Department Name"
        register={register("name")}
        type="text"
      />
      <ErrorMessage error1={errors.name} />

      <InputForm
        isError={errors.code != undefined}
        label="Department Code"
        placeholder="Department Code"
        register={register("code")}
        type="text"
      />
      <ErrorMessage error1={errors.code} />

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
