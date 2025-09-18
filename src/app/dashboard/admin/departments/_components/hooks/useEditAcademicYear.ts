import { ErrorResponseType } from "@/lib/globalTypes";
import {
  academicYearDataType,
  academicYearValidation,
} from "@/validation/AddAcademicYearValidation";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GlobalToast from "@/components/Global/GlobalToast";
import { academicYearsDataType } from "@/lib/GetAllYears";
type Props = {
  token: string;
  yearData: academicYearsDataType;
};
type UpdateYearDataType = {
  token: string;
  data: academicYearDataType;
  id: number;
};
async function updateAcademicYear({ data, id, token }: UpdateYearDataType) {
  await axios.put(`${MainDomain}/api/update/academic-year/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const useEditAcademicYear = ({ yearData, token }: Props) => {
  const [update, setUpdate] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<academicYearDataType>({
    resolver: zodResolver(academicYearValidation),
    mode: "onSubmit",
    defaultValues: {
      level_number: yearData.level_number,
      year_label: yearData.year_label,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: UpdateYearDataType) =>
      updateAcademicYear(updateParams),
    onSuccess: () => {
      if (serverError) {
        setServerError(null);
      }
      queryClient.refetchQueries({ queryKey: ["get_all_years"] });
      GlobalToast({
        title: "Academic year has been updated successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      setServerError(err.response.data.message ?? "Something went wrong");
    },
  });

  const submitAddingForm: SubmitHandler<academicYearDataType> = (formData) => {
    mutate({
      data: formData,
      id: yearData.id,
      token,
    });
  };
  return {
    submitAddingForm,
    isPending,
    register,
    handleSubmit,
    setValue,
    errors,
    update,
    setUpdate,
    serverError,
  };
};
