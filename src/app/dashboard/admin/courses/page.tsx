import React from "react";
import TableShowCourses from "./_components/TableShowCourses";
import AddingModel from "../../_components/forms/AddingModel";
import { cookies } from "next/headers";
import TabelShowCoursesOffers from "./_components/TabelShowCoursesOffers ";

export default async function CoursesPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 justify-between flex-col sm:flex-row">
        Main Courses
        <AddingModel AddType="Course" token={token} />
      </div>
      <TableShowCourses />

      <div className="flex flex-col gap-3 mt-20">
        <div className="flex items-center gap-3 justify-between flex-col sm:flex-row">
          Courses Offers
          <AddingModel AddType="Course-offering" token={token} />
        </div>

        {/* <TabelShowCoursesOffers /> */}
      </div>
    </div>
  );
}
