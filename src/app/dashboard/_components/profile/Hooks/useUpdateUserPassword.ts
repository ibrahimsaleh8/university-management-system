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
  parse: UpdatePasswordDataType
) {
  await axios.patch(
    `${MainDomain}/api/update/profile/admin/admin-password`,
    parse,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const useUpdateUserPassword = ({ token }: Props) => {
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
      parse: UpdatePasswordDataType;
    }) => updateAdminPassword(updateParams.token, updateParams.parse),
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
    mutate({ parse: data, token });
  };
  return {
    submitNewPassword,
    isPending,
    register,
    handleSubmit,
    errors,
  };
};
