import { GetTeachers } from "@/lib/GetTeachers";
import { NumberOfTeachers } from "@/variables/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { TeachersDataType } from "../TableShowTeachers";

async function getNumberOfTeachers(): Promise<{ numbers: number }> {
  const res = await axios.get(`${MainDomain}/api/get/teachers-number`);
  return res.data;
}
export const useShowTeachers = () => {
  const [activePaginateNumber, setActivePaginateNumber] = useState(1);
  const [searchedData, setSearchedData] = useState<TeachersDataType[] | null>(
    null
  );

  const [searched, setSearched] = useState(false);

  const { error, isError, isLoading, teachers } =
    GetTeachers(activePaginateNumber);

  if (error && isError) throw new Error(error.message);

  const { data: teachersNumber } = useQuery({
    queryKey: ["get_teacher_numbers"],
    queryFn: () => getNumberOfTeachers(),
  });

  const Data = useMemo(() => {
    let res = teachers;

    if (searchedData && searched) {
      res = searchedData;
    }

    return res;
  }, [searched, searchedData, teachers]);

  const Pages = useMemo(() => {
    return teachersNumber
      ? Math.ceil(teachersNumber.numbers / NumberOfTeachers)
      : 0;
  }, [teachersNumber]);

  return {
    setActivePaginateNumber,
    Pages,
    Data,
    isLoading,
    setSearched,
    setSearchedData,
    searched,
    activePaginateNumber,
  };
};
