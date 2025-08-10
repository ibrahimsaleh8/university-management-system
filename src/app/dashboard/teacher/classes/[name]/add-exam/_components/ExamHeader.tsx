import BackButton from "@/app/dashboard/_components/forms/BackButton";
export default function ExamHeader() {
  return (
    <div className="flex items-center">
      <div>
        <BackButton withText={false} />
      </div>
      <div className="mx-auto text-center">
        <h1 className="text-3xl font-bold">Create a New Exam</h1>
        <p className="capitalize text-low-white text-sm">
          fill in the details below to schedule and build your exam.
        </p>
      </div>
    </div>
  );
}
