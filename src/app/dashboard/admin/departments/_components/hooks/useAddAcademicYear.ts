import { ErrorResponseType } from "@/lib/globalTypes";
import {
  academicYearDataType,
  academicYearValidation,
} from "@/validation/AddAcademicYearValidation";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import GlobalToast from "@/components/Global/GlobalToast";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function addNewAcademicYear(
  Yeardata: academicYearDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/academic-year`, Yeardata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const useAddAcademicYear = ({ token, setClose }: Props) => {
  const reactQueryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<academicYearDataType>({
    resolver: zodResolver(academicYearValidation),
    mode: "all",
  });

  // Query Api
  const { isPending, mutate } = useMutation({
    mutationKey: ["add_academic_year"],
    mutationFn: (data: { Yeardata: academicYearDataType; token: string }) =>
      addNewAcademicYear(data.Yeardata, data.token),
    onSuccess: () => {
      reactQueryClient.refetchQueries({
        queryKey: ["get_all_years"],
      });
      setClose(true);
      GlobalToast({
        title: "Academic Year has been created successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const submitAddingForm: SubmitHandler<academicYearDataType> = (data) => {
    mutate({
      Yeardata: data,
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
  };
};
