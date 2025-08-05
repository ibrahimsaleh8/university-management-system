import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { TotalCreditHoursCanRegister } from "@/variables/TotalCreditHoursCanRegister";
import RemoveRegisterCourse from "./RemoveRegisterCourse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { CirclePlus } from "lucide-react";

type Props = {
  isPassed: number;
  course_hours: number;
  totalRegisterdHours: number;
  isEnrolled: boolean;
  courseId: string;
  token: string;
};

async function registerToCourse(
  courseId: string,
  token: string
): Promise<{ message: string }> {
  const res = await axios.post(
    `${MainDomain}/api/create/student-register-course`,
    {
      courseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function RegisterCourseBtn({
  isPassed,
  isEnrolled,
  course_hours,
  totalRegisterdHours,
  courseId,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (p: { courseId: string; token: string }) =>
      registerToCourse(p.courseId, p.token),
    onSuccess: (res) => {
      queryClient.refetchQueries({
        queryKey: ["get_availabel_courses_for_register"],
      });
      queryClient.refetchQueries({
        queryKey: ["show_registerd_courses"],
      });
      GlobalToast({
        icon: "success",
        title: res.message,
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });

  return (
    <>
      {isPassed < 0 ? (
        <p className="text-sm text-red-500">Registerd End</p>
      ) : !isEnrolled ? (
        <Button
          variant={"mainWithShadow"}
          disabled={
            totalRegisterdHours + course_hours > TotalCreditHoursCanRegister ||
            isPending
          }
          onClick={() => {
            mutate({
              courseId: courseId,
              token,
            });
          }}>
          {isPending ? (
            <>
              <SmallLoader />
            </>
          ) : (
            <>
              <CirclePlus />
              Register
            </>
          )}
        </Button>
      ) : (
        <RemoveRegisterCourse id={courseId} token={token} />
      )}
      {totalRegisterdHours + course_hours > TotalCreditHoursCanRegister && (
        <p className="text-xs w-16 mt-1 text-red-400">
          You {"can't"} register more than {TotalCreditHoursCanRegister} Hours
        </p>
      )}
    </>
  );
}
