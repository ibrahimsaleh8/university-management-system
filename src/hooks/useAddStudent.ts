import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  addStudentDataType,
  addStudentSchema,
} from "@/validation/AddStudentSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

type ClassInfoType = {
  id: number;
  name: string;
};
// Get Classes
async function getClasses(): Promise<ClassInfoType[]> {
  const res = await axios.get(`${MainDomain}/api/get/class`);
  return res.data;
}
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

  const { isPending, mutate: addNewStd } = useMutation({
    mutationKey: ["add_student"],
    mutationFn: (data: { stdData: addStudentDataType; token: string }) =>
      addNewStudent(data.stdData, data.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({ title: "Student added success", icon: "success" });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const handleStudentFormSubmit: SubmitHandler<addStudentDataType> = (data) => {
    console.log(data);
    addNewStd({
      stdData: data,
      token,
    });
  };

  const { data: classes, isLoading } = useQuery({
    queryKey: ["get_all_classes"],
    queryFn: () => getClasses(),
  });

  return {
    handleStudentFormSubmit,
    classes,
    isLoading,
    isPending,
    showPass,
    setShowPass,
    errors,
    register,
    handleSubmit,
    setValue,
  };
};
