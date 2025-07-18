import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  UniversityEventDataType,
  UniversityEventSchema,
} from "@/validation/AddEventSchema";
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

async function createNewEvent(
  eventData: UniversityEventDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/event`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function AddEventForm({ token, setClose }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_event"],
    mutationFn: (data: { eventData: UniversityEventDataType; token: string }) =>
      createNewEvent(data.eventData, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_all_events"] });
      setClose(true);
      GlobalToast({
        title: "Event has been created successfully",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UniversityEventDataType>({
    resolver: zodResolver(UniversityEventSchema),
    mode: "all",
  });
  const submitNewEvent: SubmitHandler<UniversityEventDataType> = (data) => {
    mutate({
      eventData: data,
      token,
    });
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitNewEvent)}>
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        <InputForm
          isError={errors.title != undefined}
          label="Title"
          placeholder="Event Title"
          type="text"
          register={register("title")}
        />
        <InputForm
          isError={errors.time != undefined}
          label="Time"
          placeholder="Event Time"
          type="datetime-local"
          register={register("time")}
        />
      </div>
      <ErrorMessage error1={errors.title} error2={errors.time} />

      <TextAreaForm
        isError={errors.description != undefined}
        label="Description"
        placeholder="Event Description"
        register={register("description")}
      />
      <ErrorMessage error1={errors.description} />
      <Button disabled={isPending} variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Adding.. <SmallLoader />
          </>
        ) : (
          "Add New Event"
        )}
      </Button>
    </form>
  );
}
