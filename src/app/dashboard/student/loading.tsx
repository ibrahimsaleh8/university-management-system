import SmallLoader from "@/components/Global/SmallLoader";

export default function Loading() {
  return (
    <div
      style={{
        height: "calc(100vh - 100px)",
      }}
      className="w-full bg-low-black text-white flex items-center justify-center gap-2">
      <SmallLoader color="white" />
      Loading...
    </div>
  );
}
