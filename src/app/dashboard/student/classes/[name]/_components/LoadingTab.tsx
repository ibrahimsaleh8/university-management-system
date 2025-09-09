import SmallLoader from "@/components/Global/SmallLoader";

export default function LoadingTab() {
  return (
    <div className="p-4 w-full flex items-center gap-2 justify-center">
      <SmallLoader color="white" /> Loading...
    </div>
  );
}
