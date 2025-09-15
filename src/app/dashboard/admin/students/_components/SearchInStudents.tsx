import { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import { StudentResDataType } from "./ShowStudentsTable";
export type searchMethod = "id" | "name" | "email";
type Props = {
  setSearched: Dispatch<SetStateAction<boolean>>;
  setSearchedData: Dispatch<SetStateAction<StudentResDataType[] | null>>;
  searched: boolean;
};

async function searchInStudents({
  searchTxt,
  method,
}: {
  method: searchMethod;
  searchTxt: string;
}): Promise<StudentResDataType[]> {
  try {
    const res = await axios.get(
      `/api/search/students?text=${searchTxt}&method=${method}`
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export default function SearchInStudents({
  setSearchedData,
  setSearched,
  searched,
}: Props) {
  const [searchBy, setSearchBy] = useState<searchMethod>("id");
  const [searchTxt, setSearchTxt] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["search_student", searchTxt, searchBy],
    mutationFn: ({
      method,
      searchTxt,
    }: {
      method: searchMethod;
      searchTxt: string;
    }) => searchInStudents({ method, searchTxt }),

    onSuccess: (data) => {
      setSearchedData(data);
      setSearched(true);
    },
  });

  const HandleSearch = () => {
    const srchTxt = searchTxt.trim();

    if (srchTxt.length > 0) {
      mutate({ method: searchBy, searchTxt: srchTxt });
    } else {
      setSearched(false);
    }
  };
  return (
    <div className="flex items-center  gap-3 flex-col sm:flex-row">
      <div className="flex items-center gap-3 w-full flex-wrap">
        <Select
          defaultValue={searchBy}
          onValueChange={(e: searchMethod) => setSearchBy(e)}>
          <SelectTrigger className="sm:w-[180px] w-full cursor-pointer bg-Second-black border-soft-border">
            <SelectValue placeholder={`Search by ${searchBy}`} />
          </SelectTrigger>
          <SelectContent
            defaultValue={"id"}
            className="bg-Second-black text-white border-soft-border">
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        <Input
          onChange={(e) => setSearchTxt(e.target.value)}
          className="sm:w-64 w-full h-10"
          type="text"
          value={searchTxt}
          placeholder={`Search by ${searchBy}`}
        />
      </div>
      <Button
        disabled={isPending}
        onClick={HandleSearch}
        className="bg-white w-full sm:w-fit text-Main-black hover:bg-white hover:text-Main-black">
        {isPending ? (
          <div className="flex items-center gap-2">
            Searching..
            <SmallLoader />
          </div>
        ) : (
          "Search"
        )}
      </Button>

      <Button
        onClick={() => {
          setSearchTxt("");
          setSearched(false);
        }}
        className="w-full sm:w-fit rounded-sm"
        disabled={!searched}
        variant="destructive">
        Reset
      </Button>
    </div>
  );
}
