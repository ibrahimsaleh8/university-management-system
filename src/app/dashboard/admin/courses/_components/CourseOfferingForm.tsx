import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import SmallLoader from "@/components/Global/SmallLoader";
import { useAddCourseOffering } from "./hooks/useAddCourseOffering";
import { Badge } from "@/components/ui/badge";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function CourseOfferingForm({ setClose, token }: Props) {
  const {
    coursesOffers,
    years,
    loadingYears,
    loadingSemester,
    semestersData,
    loadingCourses,
    courses,
    loadingTeachers,
    teachers,
    submitNewCourseOffering,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isPending,
    setHasPreRequired,
    hasPreRequired,
  } = useAddCourseOffering({ setClose, token });

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitNewCourseOffering)}>
      {/* Courses & Teachers */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">
        {/* Courses */}
        {loadingCourses && !courses ? (
          <Skeleton className="h-10 rounded-md w-full" />
        ) : (
          courses &&
          coursesOffers && (
            <div className="flex flex-col gap-1 w-full text-left">
              <label htmlFor="courses" className="text-sm">
                Courses:
              </label>
              <Select onValueChange={(e) => setValue("courseId", +e)}>
                <SelectTrigger id="courses" className="w-full">
                  <SelectValue placeholder="Courses" />
                </SelectTrigger>
                <SelectContent>
                  {courses.length > 0 &&
                  courses.filter(
                    (c) =>
                      !coursesOffers.some((cf) => cf.course.name === c.name)
                  ).length > 0 ? (
                    courses
                      .filter(
                        (c) =>
                          !coursesOffers.some((cf) => cf.course.name === c.name)
                      )
                      .map((course) => (
                        <SelectItem
                          key={course.id}
                          value={`${course.id}`}>{`${course.name}`}</SelectItem>
                      ))
                  ) : (
                    <SelectItem disabled value="none">
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
          <Skeleton className="h-10 rounded-md w-full sm:mt-4" />
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
                    <SelectItem disabled value="none">
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
                      <SelectItem
                        className="w-full"
                        key={smester.id}
                        value={`${smester.id}`}>
                        <span className="flex items-center gap-2">
                          {smester.name}
                          {smester.isActive ? (
                            <Badge variant="success" appearance="light">
                              Activce
                            </Badge>
                          ) : (
                            <Badge variant="destructive" appearance="light">
                              Not Activce
                            </Badge>
                          )}
                        </span>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="none">
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
                    years
                      .filter((y) => y.level_number != 0)
                      .map((year) => (
                        <SelectItem
                          key={year.id}
                          value={`${year.id}`}>{`${year.year_label}`}</SelectItem>
                      ))
                  ) : (
                    <SelectItem disabled value="none">
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
                      <SelectItem disabled value="none">
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
