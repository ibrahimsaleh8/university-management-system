import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Skeleton } from "@/components/ui/skeleton";
import { GetTeachers } from "@/lib/GetTeachers";
import {
  courseOfferingDataType,
  courseOfferingValidationServer,
} from "@/validation/serverValidations/CourseOfferingValidationServer";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import { Button } from "@/components/ui/button";
import { GetAllMainCourses } from "@/lib/GetAllMainCourses";
import { GetAllSemesters } from "@/lib/GetAllSemesters";
import { GetAllYears } from "@/lib/GetAllYears";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function createNewOffering(
  offerData: courseOfferingDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/course-offering`, offerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function CourseOfferingForm({ setClose, token }: Props) {
  const [hasPreRequired, setHasPreRequired] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_course_offering"],
    mutationFn: (data: { offerData: courseOfferingDataType; token: string }) =>
      createNewOffering(data.offerData, data.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({
        title: "Course offering has been created successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<courseOfferingDataType>({
    resolver: zodResolver(courseOfferingValidationServer),
    mode: "all",
  });
  const submitNewCourseOffering: SubmitHandler<courseOfferingDataType> = (
    data
  ) => {
    if (!hasPreRequired) {
      delete data.requiredCoursesId;
    }
    mutate({
      offerData: data,
      token,
    });

    console.log(data);
  };

  // **** Teachers Api ****
  const {
    error: errorTeachers,
    isError: isErrorTeachers,
    isLoading: loadingTeachers,
    teachers,
  } = GetTeachers(0);
  if (isErrorTeachers && errorTeachers) throw new Error(errorTeachers.message);

  // **** Courses Api ****
  const {
    courses,
    error: errorCourses,
    isError: isErrorCourses,
    isLoading: loadingCourses,
  } = GetAllMainCourses();
  if (isErrorCourses && errorCourses) throw new Error(errorCourses.message);

  // **** Semesters Api ****
  const {
    error: errorSemester,
    isError: isErrorSemester,
    isLoading: loadingSemester,
    semestersData,
  } = GetAllSemesters();
  if (isErrorSemester && errorSemester) throw new Error(errorSemester.message);

  // **** Academic Years Api ****
  const {
    error: errorYears,
    isError: isErrorYears,
    isLoading: loadingYears,
    years,
  } = GetAllYears();
  if (isErrorYears && errorYears) throw new Error(errorYears.message);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitNewCourseOffering)}>
      {/* ---- Apis ----
      - Courses ✅
      - Academic Years ✅
      - Teachers ✅
      - Semester ✅
      */}

      {/* Courses & Teachers */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        {/* Courses */}
        {loadingCourses && !courses ? (
          <Skeleton className="h-10 rounded-md w-full" />
        ) : (
          courses && (
            <div className="flex flex-col gap-1 w-full text-left">
              <label htmlFor="courses" className="text-sm">
                Courses:
              </label>
              <Select onValueChange={(e) => setValue("courseId", +e)}>
                <SelectTrigger id="courses" className="w-full">
                  <SelectValue placeholder="Courses" />
                </SelectTrigger>
                <SelectContent>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <SelectItem
                        key={course.id}
                        value={`${course.id}`}>{`${course.name}`}</SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="">
                      No Courses Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}

        {/* Teachers */}
        {loadingTeachers && !teachers ? (
          <Skeleton className="h-10 rounded-md w-full" />
        ) : (
          teachers && (
            <div className="flex flex-col gap-1 w-full text-left">
              <label htmlFor="teachers" className="text-sm">
                Teachers:
              </label>
              <Select onValueChange={(e) => setValue("teacherId", +e)}>
                <SelectTrigger id="teachers" className="w-full">
                  <SelectValue placeholder="Teachers" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.length > 0 ? (
                    teachers.map((tech) => (
                      <SelectItem
                        key={tech.id}
                        value={`${tech.id}`}>{`${tech.first_name} ${tech.last_name}`}</SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="">
                      No Teachers Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>
      <ErrorMessage error1={errors.courseId} error2={errors.teacherId} />

      {/* Semesters & Years */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        {/* Semesters */}
        {loadingSemester && !semestersData ? (
          <Skeleton className="h-10 rounded-md w-full" />
        ) : (
          semestersData && (
            <div className="flex flex-col gap-1 w-full text-left">
              <label htmlFor="semeseters" className="text-sm">
                Semesters:
              </label>
              <Select onValueChange={(e) => setValue("semesterId", e)}>
                <SelectTrigger id="semeseters" className="w-full">
                  <SelectValue placeholder="Semesters" />
                </SelectTrigger>
                <SelectContent>
                  {semestersData.length > 0 ? (
                    semestersData.map((smester) => (
                      <SelectItem key={smester.id} value={`${smester.id}`}>{`${
                        smester.name
                      } <${
                        smester.isActive ? "Active" : "Not Active"
                      }>`}</SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="">
                      No Semesters Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}

        {/* Years */}
        {loadingYears && !years ? (
          <Skeleton className="h-10 rounded-md w-full" />
        ) : (
          years && (
            <div className="flex flex-col gap-1 w-full text-left">
              <label htmlFor="academic-years" className="text-sm">
                Academic Years:
              </label>
              <Select onValueChange={(e) => setValue("academicYearId", +e)}>
                <SelectTrigger id="academic-years" className="w-full">
                  <SelectValue placeholder="Academic Years" />
                </SelectTrigger>
                <SelectContent>
                  {years.length > 0 ? (
                    years.map((year) => (
                      <SelectItem
                        key={year.id}
                        value={`${year.id}`}>{`${year.year_label}`}</SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="">
                      No Academic Years Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>
      <ErrorMessage error1={errors.semesterId} error2={errors.academicYearId} />

      {/* Hall & Max-Capacity */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        <InputForm
          isError={errors.hall != undefined}
          label="Hall"
          placeholder="Hall"
          register={register("hall")}
          type="text"
        />
        <InputForm
          isError={errors.maxCapacity != undefined}
          label="Max Capacity"
          placeholder="Max Capacity"
          onChange={(e) => setValue("maxCapacity", +e.target.value)}
          type="number"
        />
      </div>
      <ErrorMessage error1={errors.hall} error2={errors.maxCapacity} />

      <div>
        <p>Has pre required courses ?</p>
        <RadioGroup
          onValueChange={(e) => setHasPreRequired(e == "yes")}
          defaultValue="no">
          <div className="flex items-center gap-2">
            <RadioGroupItem className="w-4 h-4" id="yes-label" value="yes" />
            <label htmlFor="yes-label">Yes</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem className="w-4 h-4" id="no-label" value="no" />
            <label htmlFor="no-label">No</label>
          </div>
        </RadioGroup>
      </div>

      {hasPreRequired && (
        <MotionEffect blur>
          {/* Courses */}
          {loadingCourses && !courses ? (
            <Skeleton className="h-10 rounded-md w-full" />
          ) : (
            courses && (
              <div className="flex flex-col gap-1 w-full text-left">
                <label htmlFor="pre-courses" className="text-sm">
                  Prerequired Course:
                </label>
                <Select
                  onValueChange={(e) => setValue("requiredCoursesId", +e)}>
                  <SelectTrigger id="pre-courses" className="w-full">
                    <SelectValue placeholder="Prerequired Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <SelectItem
                          disabled={watch("courseId") == course.id}
                          key={course.id}
                          value={`${course.id}`}>{`${course.name}`}</SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="">
                        No Courses Found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )
          )}
        </MotionEffect>
      )}
      <Button disabled={isPending} className="mt-2" variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Adding... <SmallLoader />
          </>
        ) : (
          "Add course offer"
        )}
      </Button>
    </form>
  );
}
