import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  AddTeacherDataType,
  addTeacherSchema,
} from "@/validation/AddTeacherSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function addNewTeacherMutate(data: AddTeacherDataType, token: string) {
  try {
    await axios.post(`${MainDomain}/api/create/teacher`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

export const useAddTeacher = ({ setClose, token }: Props) => {
  const queryClient = useQueryClient();
  const [showPass, setShowPass] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_new_teacher"],
    mutationFn: ({
      data,
      token,
    }: {
      data: AddTeacherDataType;
      token: string;
    }) => addNewTeacherMutate(data, token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({ icon: "success", title: "Teacher added success" });
      queryClient.refetchQueries({ queryKey: ["get_all_teachers"] });
      queryClient.refetchQueries({ queryKey: ["get_teacher_numbers"] });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ icon: "error", title: err.response.data.message });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddTeacherDataType>({
    resolver: zodResolver(addTeacherSchema),
    mode: "all",
  });
  const HandleForm = (data: AddTeacherDataType) => {
    mutate({ data, token });
  };

  return {
    setValue,
    register,
    handleSubmit,
    errors,
    HandleForm,
    showPass,
    setShowPass,
    isPending,
  };
};
