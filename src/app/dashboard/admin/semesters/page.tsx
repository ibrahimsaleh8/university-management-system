import React from "react";
import TabelShowSemesters from "./_components/TabelShowSemesters";
import AddingModel from "../../_components/forms/AddingModel";
import { cookies } from "next/headers";
import ShowScheduals from "./_components/ShowScheduals";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Semesters",
};

export default async function SemestersPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-4">
        <p className="font-bold">Semesters</p>
        <AddingModel token={token} AddType="Semester" />
      </div>
      <TabelShowSemesters token={token} />
      <div className="flex flex-col gap-2 pt-4">
        <ShowScheduals token={token} />
      </div>
    </div>
  );
}
