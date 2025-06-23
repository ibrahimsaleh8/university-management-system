import React from "react";
import TabelShowSemesters from "./_components/TabelShowSemesters";
import AddingModel from "../../_components/forms/AddingModel";
import { cookies } from "next/headers";

export default async function SemestersPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-4">
        <p>Semesters</p>
        <AddingModel token={token} AddType="Semester" />
      </div>
      <TabelShowSemesters />
    </div>
  );
}
