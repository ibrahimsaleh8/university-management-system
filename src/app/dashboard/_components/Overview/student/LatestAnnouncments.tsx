import LatestAnnCard from "./LatestAnnCard";

export type LatestAnnouncmentDataType = {
  id: string;
  created_at: Date;
  class: {
    name: string;
  };
  title: string;
  content: string;
};
export default function LatestAnnouncments({
  announcments,
}: {
  announcments: LatestAnnouncmentDataType[];
}) {
  return (
    <div className="w-full bg-Second-black rounded-2xl p-4 relative flex flex-col gap-3">
      <div className="absolute right-[-1px] top-0 folder-clip-path lg:w-[20%] md:w-[30%] w-1/2 h-2 bg-Main-black p-2 rounded-tr-2xl"></div>
      <p className="font-bold">Latest Announcments</p>

      <div className="flex flex-col gap-2">
        {announcments.length > 0 ? (
          announcments.map((ann) => (
            <LatestAnnCard
              key={ann.id}
              annClass={ann.class}
              content={ann.content}
              created_at={ann.created_at}
              title={ann.title}
            />
          ))
        ) : (
          <div className="p-4 flex items-center justify-center w-full h-32 bg-Second-Card-bg rounded-2xl">
            No Announcments Found
          </div>
        )}
      </div>
    </div>
  );
}
