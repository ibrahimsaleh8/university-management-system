import { cookies } from "next/headers";
import TabelShowDepartments from "./_components/TabelShowDepartments";
import AddingModel from "../../_components/forms/AddingModel";

export default async function DepartmentPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <div className="flex justify-between items-center gap-3 pb-4 sm:flex-row flex-col">
        <p className="font-bold">Departments</p>
        <AddingModel AddType="Department" token={token} />
      </div>
      <TabelShowDepartments />
    </div>
  );
}
