export default async function ShowExamById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>ShowExamById = {id}</div>;
}
