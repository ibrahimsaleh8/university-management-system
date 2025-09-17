import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import { LocalDateTimeConverter } from "@/lib/LocalDateTimeConverter";
import { UniversityEventDataType } from "@/validation/AddEventSchema";
import { EditEventSchema } from "@/validation/EditEventSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
export type UpdateEventDataType = {
  id: string;
  title: string;
  location: string;
  description: string;
  time: string;
};
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
  eventData: UpdateEventDataType;
};

async function updateEventApi(
  data: UniversityEventDataType,
  token: string,
  id: string
) {
  await axios.put(`${MainDomain}/api/update/event/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function EditEvent({ token, setClose, eventData }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: {
      data: UniversityEventDataType;
      token: string;
      id: string;
    }) =>
      updateEventApi(updateParams.data, updateParams.token, updateParams.id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_all_events"] });
      setClose(true);
      GlobalToast({
        title: "Event has been updated successfully",
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
    getValues,
  } = useForm<UniversityEventDataType>({
    resolver: zodResolver(EditEventSchema),
    mode: "all",
    defaultValues: {
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
    },
  });

  const submitNewEvent: SubmitHandler<UniversityEventDataType> = (data) => {
    mutate({
      token,
      data: { ...data, time: new Date(LocalDateTimeConverter(data.time)) },
      id: eventData.id,
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
          defaultValue={getValues("title")}
        />
        <InputForm
          isError={errors.time != undefined}
          label="Time"
          placeholder="Event Time"
          type="datetime-local"
          defaultValue={eventData.time.toString().slice(0, 16)}
          register={register("time")}
        />
      </div>
      <ErrorMessage error1={errors.title} error2={errors.time} />
      <InputForm
        isError={errors.location != undefined}
        label="Location"
        placeholder="Event Location"
        type="text"
        register={register("location")}
        defaultValue={getValues("location")}
      />
      <ErrorMessage error1={errors.location} />

      <TextAreaForm
        isError={errors.description != undefined}
        label="Description"
        placeholder="Event Description"
        defaultValue={getValues("description")}
        register={register("description")}
      />
      <ErrorMessage error1={errors.description} />
      <Button disabled={isPending} variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Updateing.. <SmallLoader />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
}
