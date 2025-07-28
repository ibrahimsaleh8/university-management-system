export default function SectionHead({ title }: { title: string }) {
  return (
    <div className="flex font-bold sm:text-lg capitalize items-center justify-center bg-Second-black text-main-text border border-soft-border w-full sm:h-14 h-10 rounded-md">
      {title}
    </div>
  );
}
