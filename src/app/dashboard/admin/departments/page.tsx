import { cookies } from "next/headers";
import TabelShowDepartments from "./_components/TabelShowDepartments";
import AddingModel from "../../_components/forms/AddingModel";
import TableShowYears from "./_components/TableShowYears";

export default async function DepartmentPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-3 sm:flex-row flex-col">
        <p className="font-bold">Departments</p>
        <AddingModel AddType="Department" token={token} />
      </div>
      <TabelShowDepartments token={token} />

      <div className="flex flex-col gap-3 mt-10">
        <div className="flex justify-between items-center gap-3 sm:flex-row flex-col">
          <p className="font-bold">Acadimic Years</p>
          <AddingModel AddType="Academic Year" token={token} />
        </div>

        <TableShowYears />
      </div>
    </div>
  );
}
