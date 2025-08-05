import { cookies } from "next/headers";
import ShowUnRegisterdClasses from "./_components/ShowUnRegisterdClasses";
import ShowRegisterdClasses from "./_components/ShowRegisterdClasses";

export default async function StudentCalsses() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div className="flex flex-col gap-3">
      <ShowUnRegisterdClasses token={token} />
      <ShowRegisterdClasses token={token} />
    </div>
  );
}
