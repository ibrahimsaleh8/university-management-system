import {
  departmentDataSchema,
  departmentDataType,
} from "@/validation/DepartmentDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import { DepartmentResponseType } from "@/lib/GetDepartmentsQuery";
type Props = {
  departmentData: DepartmentResponseType;
  token: string;
};

type updateDepartmentDataType = {
  token: string;
  departmentNewData: departmentDataType;
  id: number;
};

async function updateDepartmentData({
  departmentNewData,
  id,
  token,
}: updateDepartmentDataType) {
  await axios.put(
    `${MainDomain}/api/update/department/${id}`,
    departmentNewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export const useEditDepartment = ({ departmentData, token }: Props) => {
  const queryClient = useQueryClient();
  const [update, setUpdate] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<departmentDataType>({
    mode: "onSubmit",
    resolver: zodResolver(departmentDataSchema),
    defaultValues: {
      code: departmentData.code,
      name: departmentData.name,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: updateDepartmentDataType) =>
      updateDepartmentData(updateParams),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_departments"],
      });
      GlobalToast({
        title: "Department has been updated successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      setServerError(err.response.data.message ?? "Something went wrong");
    },
  });
  const submitForm: SubmitHandler<departmentDataType> = (data) => {
    mutate({
      departmentNewData: data,
      id: departmentData.id,
      token,
    });
  };
  return {
    submitForm,
    isPending,
    register,
    handleSubmit,
    errors,
    serverError,
    update,
    setUpdate,
  };
};
