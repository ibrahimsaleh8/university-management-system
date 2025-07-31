import { cookies } from "next/headers";
import ShowUnRegisterdClasses from "./_components/ShowUnRegisterdClasses";

export default async function StudentCalsses() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div>
      <ShowUnRegisterdClasses token={token} />
    </div>
  );
}
