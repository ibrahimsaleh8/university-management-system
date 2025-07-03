"use client";
import CalendarTable, {
  EventDataType,
} from "@/app/dashboard/_components/Calender/CalenderTable";
import AddingModel from "@/app/dashboard/_components/forms/AddingModel";
import GlobalToast from "@/components/Global/GlobalToast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { GetAllYears } from "@/lib/GetAllYears";
import { ErrorResponseType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

async function getSchedualsTime(year: number): Promise<EventDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/course-time?academicYear=${year}`
  );
  return res.data;
}

async function deleteSchedualTime(id: string, token: string) {
  await axios.delete(`${MainDomain}/api/delete/course-time/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function ShowScheduals({ token }: { token: string }) {
  const [gradeNumber, setGradeNumber] = useState(1);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["delete_schedual_time"],
    mutationFn: (data: { id: string; token: string }) =>
      deleteSchedualTime(data.id, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_schedual_times", gradeNumber],
      });
      GlobalToast({
        icon: "success",
        title: "Schedule time has been deleted successfully ",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ icon: "error", title: err.response.data.message });
    },
  });

  const HandleDeleteShedualTime = (id: string) => {
    mutate({ id, token });
  };

  //  ****** Get Grade Years Api ******
  const {
    error: errorYears,
    isError: isErrorYear,
    isLoading: loadingYear,
    years,
  } = GetAllYears();
  if (errorYears && isErrorYear) throw new Error(errorYears.message);

  //  ****** Get Schedual Times Api ******

  const {
    data: times,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_schedual_times", gradeNumber],
    queryFn: () => getSchedualsTime(gradeNumber),
  });
  if (isError && error) throw new Error(error.message);

  return (
    <div className="pt-3 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-4">
        {/* Years */}
        {loadingYear && !years ? (
          <Skeleton className="w-[180px] h-10 rounded-md" />
        ) : (
          years && (
            <div className="flex flex-col gap-1">
              <label className="text-sm" htmlFor="grade">
                Grade:
              </label>
              <Select
                defaultValue="1"
                onValueChange={(e) => setGradeNumber(+e)}>
                <SelectTrigger id="grade" className="w-[180px]">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  {years.length > 0 ? (
                    years.map((year) => (
                      <SelectItem
                        className="capitalize"
                        key={year.id}
                        value={`${year.level_number}`}>
                        {year.year_label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem className="capitalize" disabled value="none">
                      no years found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
        <AddingModel token={token} AddType="Course Time" />
      </div>

      {/* Times */}
      {isLoading && !times ? (
        <Skeleton className="w-full h-[35rem] rounded-md" />
      ) : (
        times && (
          <CalendarTable
            deleteFn={(id: string) => HandleDeleteShedualTime(id)}
            canDelete={true}
            events={times}
          />
        )
      )}
    </div>
  );
}
