import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TeachersDataType } from "./TableShowTeachers";
import { useMutation } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
export type searchMethod = "id" | "name" | "email";

async function SearachInTeachers({
  searchTxt,
  method,
}: {
  method: searchMethod;
  searchTxt: string;
}): Promise<TeachersDataType[]> {
  const res = await axios.get(
    `/api/search/teachers?text=${searchTxt}&method=${method}`
  );
  return res.data;
}

type Props = {
  setSearched: Dispatch<SetStateAction<boolean>>;
  setSearchedData: Dispatch<SetStateAction<TeachersDataType[] | null>>;
  searched: boolean;
};
export default function SearchInTeacherTable({
  setSearchedData,
  setSearched,
  searched,
}: Props) {
  const [searchBy, setSearchBy] = useState<searchMethod>("id");
  const [searchTxt, setSearchTxt] = useState("");
  const searchRef = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useMutation({
    mutationKey: ["search_teacher", searchTxt, searchBy],
    mutationFn: ({
      method,
      searchTxt,
    }: {
      method: searchMethod;
      searchTxt: string;
    }) => SearachInTeachers({ method, searchTxt }),

    onSuccess: (data) => {
      setSearchedData(data);
      setSearched(true);
    },
  });

  const HandleSearch = () => {
    if (searchTxt.trim().length > 0) {
      mutate({ method: searchBy, searchTxt });
    } else {
      setSearched(false);
    }
  };
  return (
    <div className="flex items-center  gap-3 flex-col sm:flex-row">
      <div className="flex items-center gap-3 w-full flex-wrap">
        <Select onValueChange={(e: searchMethod) => setSearchBy(e)}>
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
          value={searchTxt}
          className="sm:w-64 w-full h-10"
          type="text"
          placeholder={`Search by ${searchBy}`}
          ref={searchInput}
        />
      </div>
      <Button
        disabled={isPending}
        onClick={HandleSearch}
        ref={searchRef}
        className="bg-white w-full sm:w-fit text-Main-black duration-300 hover:bg-[#e8e8e8] hover:text-Main-black rounded-sm">
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
          setSearched(false);
          setSearchTxt("");
        }}
        className="w-full sm:w-fit rounded-sm"
        disabled={!searched}
        variant="destructive">
        Reset
      </Button>
    </div>
  );
}
