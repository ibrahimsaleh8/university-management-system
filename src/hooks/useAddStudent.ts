import GlobalToast from "@/components/Global/GlobalToast";
import { GetAllYears } from "@/lib/GetAllYears";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  addStudentDataType,
  addStudentSchema,
} from "@/validation/AddStudentSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

// Add New Student
async function addNewStudent(studentData: addStudentDataType, token: string) {
  await axios.post(`${MainDomain}/api/create/student`, studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useAddStudent = ({ setClose, token }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addStudentDataType>({
    resolver: zodResolver(addStudentSchema),
    mode: "all",
  });
  const [showPass, setShowPass] = useState(false);
  const queryClient = useQueryClient();
  const { isPending, mutate: addNewStd } = useMutation({
    mutationKey: ["add_student"],
    mutationFn: (data: { stdData: addStudentDataType; token: string }) =>
      addNewStudent(data.stdData, data.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({ title: "Student added success", icon: "success" });
      queryClient.refetchQueries({ queryKey: ["get_all_student"] });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const handleStudentFormSubmit: SubmitHandler<addStudentDataType> = (data) => {
    addNewStd({
      stdData: data,
      token,
    });
  };

  // ****** Department api ******
  const {
    departments,
    error: errorDepratment,
    isError: isErrorDepartment,
    isLoading: loadingDepartment,
  } = GetDepartmentsQuery();
  if (errorDepratment && isErrorDepartment)
    throw new Error(errorDepratment.message);

  // ****** Academic Years api ******
  const {
    error: errorYears,
    isError: isErrorYears,
    isLoading: loadingYears,
    years,
  } = GetAllYears();
  if (errorYears && isErrorYears) throw new Error(errorYears.message);

  return {
    handleStudentFormSubmit,
    isPending,
    showPass,
    setShowPass,
    errors,
    register,
    handleSubmit,
    setValue,
    loadingDepartment,
    departments,
    loadingYears,
    years,
  };
};
