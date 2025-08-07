import { redirect } from "next/navigation";

export default function ShowExamPage() {
  return redirect("/dashboard/student/classes");
}
