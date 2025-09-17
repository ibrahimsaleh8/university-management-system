"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { GetActiveSemesterCourseOffers } from "@/lib/GetActiveSemesterCourseOffers";
import { GetCoursesTimes } from "@/lib/GetCoursesTimes";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  courseTimeDataType,
  courseTimeSchema,
  DaysOfweekType,
} from "@/validation/AddCourseTimeSchema";
import { MainDomain } from "@/variables/MainDomain";
import { days, workingHours } from "@/variables/TimesVars";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};
async function addNewScehedual(
  schedualData: courseTimeDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/course-time`, schedualData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function FormAddTime({ setClose, token }: Props) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<courseTimeDataType>({
    resolver: zodResolver(courseTimeSchema),
    mode: "all",
  });
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["add_schedual"],
    mutationFn: (data: { schedualData: courseTimeDataType; token: string }) =>
      addNewScehedual(data.schedualData, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_schedual_times"] });
      setClose(true);
      GlobalToast({
        title: "Course has been scheduled successfully",
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

  const onSubmit: SubmitHandler<courseTimeDataType> = (data) => {
    mutate({ schedualData: data, token });
  };

  //   ******* Get Courses Offering API *******
  const {
    courses: coursesOffers,
    error: courseOfferingError,
    isError: isErrorCourseOffering,
    isLoading: loadingCourseOffering,
  } = GetActiveSemesterCourseOffers();

  if (isErrorCourseOffering && courseOfferingError)
    throw new Error(courseOfferingError.message);

  // Get Times Already Added
  const { error: timesError, isError: timesIsError, times } = GetCoursesTimes();
  if (timesIsError && timesError) throw new Error(timesError.message);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Days And Times */}
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        {/* Days */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm" htmlFor="day">
            Day:
          </label>
          <Select
            onValueChange={(e: DaysOfweekType) => setValue("dayOfWeek", e)}>
            <SelectTrigger id="day" className="w-full">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day, i) => (
                <SelectItem
                  key={i}
                  className="capitalize"
                  value={day.toUpperCase()}>
                  {day.toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm" htmlFor="time">
            Time:
          </label>
          <Select
            onValueChange={(e: DaysOfweekType) => setValue("startTime", e)}>
            <SelectTrigger id="time" className="w-full">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              {workingHours.map((hour, i) => (
                <SelectItem key={i} className="capitalize" value={hour}>
                  {hour.toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ErrorMessage error1={errors.dayOfWeek} error2={errors.startTime} />
      {/* Teachers And Courses */}
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        {/* Courses */}
        {loadingCourseOffering && !coursesOffers ? (
          <Skeleton className="w-full rounded-md h-10" />
        ) : (
          coursesOffers &&
          times && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm" htmlFor="courses">
                Courses:
              </label>

              <Select onValueChange={(e) => setValue("courseOfferingId", e)}>
                <SelectTrigger id="courses" className="w-full">
                  <SelectValue placeholder="Courses" />
                </SelectTrigger>
                <SelectContent>
                  {coursesOffers.length > 0 &&
                  coursesOffers.filter(
                    (cf) => !times.some((t) => t.title == cf.name)
                  ).length > 0 ? (
                    coursesOffers
                      .filter((cf) => !times.some((t) => t.title == cf.name))
                      .map((course) => (
                        <SelectItem
                          className="capitalize"
                          key={course.id}
                          value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem disabled value="none">
                      No Courses Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>
      <ErrorMessage error2={errors.courseOfferingId} />
      <Button disabled={isPending} variant={"mainWithShadow"} className="mt-2">
        {isPending ? (
          <>
            Adding.... <SmallLoader />
          </>
        ) : (
          "Add Schedule"
        )}
      </Button>
    </form>
  );
}
