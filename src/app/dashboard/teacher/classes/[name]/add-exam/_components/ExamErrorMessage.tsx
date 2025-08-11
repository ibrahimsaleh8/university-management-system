export default function ExamErrorMessage({ message }: { message: string }) {
  return <p className="text-xs text-red-500">* {message}</p>;
}
