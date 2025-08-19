import { cookies } from "next/headers";

export default async function AssignmentSubmissonsById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value as string;
  return (
    <div>
      ShowAssignmentSubmissons = {id}
      {token}
    </div>
  );
}
