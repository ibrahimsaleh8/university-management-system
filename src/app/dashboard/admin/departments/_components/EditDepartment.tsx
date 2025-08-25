import ErrorMessageResponse from "@/app/dashboard/_components/ErrorMessageResponse";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Switch } from "@/components/animate-ui/radix/switch";
import { Button } from "@/components/ui/button";
import { DepartmentResponseType } from "@/lib/GetDepartmentsQuery";
import { FaChalkboardTeacher } from "react-icons/fa";
import DepartmentSmallInfo from "./DepartmentSmallInfo";
import { BookOpenText, GraduationCap } from "lucide-react";
import SmallLoader from "@/components/Global/SmallLoader";
import { useEditDepartment } from "./hooks/useEditDepartment";
type Props = {
  departmentData: DepartmentResponseType;
  token: string;
};

export default function EditDepartment({ departmentData, token }: Props) {
  const {
    submitForm,
    isPending,
    register,
    handleSubmit,
    errors,
    serverError,
    update,
    setUpdate,
  } = useEditDepartment({ departmentData, token });
  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-3">
      {/* Top */}
      <div className="flex gap-2 justify-between pb-4">
        <p className="px-3 py-1 bg-Second-Card-bg rounded-sm text-sm capitalize">
          {update ? "Update" : "Show"} mode
        </p>
        <div className="flex items-center gap-3">
          <Switch onCheckedChange={(e) => setUpdate(e)} />
          <p>{update ? "Update" : "Show"}</p>
        </div>
      </div>
      {serverError && <ErrorMessageResponse message={serverError} />}

      {/* Data */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        <InputForm
          isError={errors.name != undefined}
          label="Department Name"
          placeholder="Department Name"
          register={register("name")}
          type="text"
          disabled={!update}
        />
        <InputForm
          isError={errors.code != undefined}
          label="Department Code"
          placeholder="Department Code"
          register={register("code")}
          type="text"
          disabled={!update}
        />
      </div>
      <ErrorMessage error1={errors.name} error2={errors.code} />
      <div className="flex flex-row gap-2 text-sm mt-3">
        <DepartmentSmallInfo
          icon={<FaChalkboardTeacher className="w-4 h-4" />}
          title="Teachers"
          value={departmentData._count.teachers}
        />
        <DepartmentSmallInfo
          icon={<GraduationCap className="w-4 h-4" />}
          title="Students"
          value={departmentData._count.students}
        />
        <DepartmentSmallInfo
          icon={<BookOpenText className="w-4 h-4" />}
          title="Courses"
          value={departmentData._count.courses}
        />
      </div>

      <Button disabled={!update || isPending} variant={"mainWithShadow"}>
        {isPending ? <SmallLoader /> : "Update"}
      </Button>
    </form>
  );
}
