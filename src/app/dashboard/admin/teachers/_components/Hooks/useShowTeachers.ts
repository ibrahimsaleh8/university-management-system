import { GetTeachers } from "@/lib/GetTeachers";
import { NumberOfTeachers } from "@/variables/Pagination";
import { useMemo, useState } from "react";
import { TeachersDataType } from "../TableShowTeachers";

export const useShowTeachers = () => {
  const [activePaginateNumber, setActivePaginateNumber] = useState(1);
  const [searchedData, setSearchedData] = useState<TeachersDataType[] | null>(
    null
  );
  const [searched, setSearched] = useState(false);

  const { error, isError, isLoading, teachers } = GetTeachers();
  if (error && isError) throw new Error(error.message);

  const Data = useMemo(() => {
    let res = teachers;
    if (searchedData && searched) {
      res = searchedData;
    } else {
      if (res) {
        const startIndex = (activePaginateNumber - 1) * NumberOfTeachers;
        const endIndex = startIndex + NumberOfTeachers;
        res = res.slice(startIndex, endIndex);
      }
    }

    return res;
  }, [activePaginateNumber, searched, searchedData, teachers]);

  const Pages = useMemo(() => {
    return teachers?.length
      ? Math.ceil(teachers?.length / NumberOfTeachers)
      : 0;
  }, [teachers?.length]);

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
