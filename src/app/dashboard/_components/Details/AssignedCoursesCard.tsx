type Props = {
  name: string;
  code: string;
  semester: string;
  hours: number;
};
export default function AssignedCoursesCard({
  code,
  hours,
  name,
  semester,
}: Props) {
  return (
    <div className="w-full bg-Second-Card-bg p-4 rounded-2xl flex flex-col gap-1.5">
      <p className="text-lg font-bold capitalize flex items-center gap-1">
        {name} <span className="text-xs text-low-white pt-2">({code})</span>
      </p>
      <p className="text-sm text-low-white capitalize">
        {semester} | {hours} Credits
      </p>
    </div>
  );
}
