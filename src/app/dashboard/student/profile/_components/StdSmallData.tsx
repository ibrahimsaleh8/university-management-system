type Props = {
  title: string;
  value: string;
};
export default function StdSmallData({ title, value }: Props) {
  return (
    <div className="flex flex-col gap-1 text-sm xl:min-w-52 sm:min-w-32">
      <p className="text-low-white font-medium capitalize">{title}</p>
      <p>{value}</p>
    </div>
  );
}
