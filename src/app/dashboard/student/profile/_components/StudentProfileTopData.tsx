import ShowUserImageProfile from "@/app/dashboard/_components/profile/ShowUserImageProfile";
type Props = {
  token: string;
  student_id: string;
  first_name: string;
  last_name: string;
  image: string;
  year_label: string;
  department: string;
};
export default function StudentProfileTopData({
  department,
  first_name,
  image,
  last_name,
  student_id,
  token,
  year_label,
}: Props) {
  return (
    <div className="flex items-center gap-6 bg-main-dark p-4 rounded-2xl border border-soft-border flex-wrap">
      <ShowUserImageProfile role="student" token={token} userImage={image} />
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          {first_name} {last_name}
        </h1>
        <p className="text-sm text-low-white">Student ID: {student_id}</p>

        <p className="text-sm text-low-white capitalize">
          {year_label} | {department}
        </p>
      </div>
    </div>
  );
}
