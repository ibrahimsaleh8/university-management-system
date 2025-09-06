import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponseType, RoleType } from "@/lib/globalTypes";
import {
  UpdatePasswordDataType,
  UpdatePasswordSchema,
} from "@/validation/UpdatePasswordSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import GlobalToast from "@/components/Global/GlobalToast";
type Props = {
  token: string;
  role: RoleType;
};

async function updateAdminPassword(
  token: string,
  role: RoleType,
  parse: UpdatePasswordDataType
) {
  const endpointMap = {
    admin: "/api/update/profile/admin/admin-password",
    student: "/api/update/profile/student/password",
    teacher: "/api/update/profile/teacher/password",
  };

  await axios.patch(`${MainDomain}${endpointMap[role]}`, parse, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useUpdateUserPassword = ({ token, role }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePasswordDataType>({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: {
      token: string;
      role: RoleType;
      parse: UpdatePasswordDataType;
    }) =>
      updateAdminPassword(
        updateParams.token,
        updateParams.role,
        updateParams.parse
      ),
    onSuccess: () => {
      GlobalToast({
        icon: "success",
        title: "Password updated success",
      });
      reset({
        currentPassword: "",
        newPassword: "",
        reEnterNewPassword: "",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const submitNewPassword: SubmitHandler<UpdatePasswordDataType> = (data) => {
    mutate({ parse: data, token, role });
  };
  return {
    submitNewPassword,
    isPending,
    register,
    handleSubmit,
    errors,
  };
};
