export default function UserMainDetailsParagraph({
  header,
  value,
}: {
  header: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <p className="uppercase text-low-white">{header}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
