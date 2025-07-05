"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormAddTeacher from "../../admin/teachers/_components/FormAddTeacher";
import AddStudentForm from "../../admin/students/_components/AddStudentForm";
import AddDepartmentForm from "../../admin/departments/_components/AddDepartmentForm";
import SemestrAddForm from "../../admin/semesters/_components/SemestrAddForm";
import FormAddCourse from "../../admin/courses/_components/FormAddCourse";
import CourseOfferingForm from "../../admin/courses/_components/CourseOfferingForm";
import AcadimicYearForm from "../../admin/departments/_components/AcadimicYearForm";
import FormAddTime from "../../admin/semesters/_components/FormAddTime";
import FormAddClass from "../../teacher/classes/_components/FormAddClass";
import TeacherAnnouncmentForm from "../../teacher/classes/_components/TeacherAnnouncmentForm";

type Props = {
  token: string;
  AddType:
    | "Teacher"
    | "Student"
    | "Department"
    | "Semester"
    | "Course"
    | "Course-offering"
    | "Academic Year"
    | "Course Time"
    | "Class"
    | "Teacher Announcement";
  title?: string;
  classId?: number;
  className?: string;
};

export default function AddingModel({
  token,
  AddType,
  title,
  classId,
  className,
}: Props) {
  const [close, setClose] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (close && closeRef.current) {
      closeRef.current.click();
      setClose(false);
    }
  }, [close]);
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="bg-transparent font-medium cursor-pointer text-sm text-main-text px-4 py-2 border border-main-text hover:bg-main-text hover:text-Main-black duration-300 rounded-sm sm:w-fit w-full">
          Add {title ?? AddType}
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-Main-black text-white border-soft-border sm:!max-w-[37rem] max-h-[97vh] sm:overflow-visible overflow-y-auto overflow-x-hidden">
          <AlertDialogHeader>
            <AlertDialogTitle className="border-b pb-2 border-soft-border flex items-center justify-between pt-2 capitalize font-bold">
              Add New {AddType.toLowerCase()}
            </AlertDialogTitle>

            <AlertDialogDescription></AlertDialogDescription>
            {/* Form Add New Teacher */}
            {AddType == "Teacher" && (
              <FormAddTeacher token={token} setClose={setClose} />
            )}

            {/* Form Add New Student */}
            {AddType == "Student" && (
              <AddStudentForm setClose={setClose} token={token} />
            )}

            {/* Form Add New Department */}
            {AddType == "Department" && (
              <AddDepartmentForm setClose={setClose} token={token} />
            )}

            {/* Form Add New Semester */}
            {AddType == "Semester" && (
              <SemestrAddForm setClose={setClose} token={token} />
            )}

            {/* Form Add New Course */}
            {AddType == "Course" && (
              <FormAddCourse setClose={setClose} token={token} />
            )}

            {/* Form Add New Course-Offering */}
            {AddType == "Course-offering" && (
              <CourseOfferingForm setClose={setClose} token={token} />
            )}

            {/* Form Add New Acadimic Years */}
            {AddType == "Academic Year" && (
              <AcadimicYearForm setClose={setClose} token={token} />
            )}

            {/* Form Add New Course Time */}
            {AddType == "Course Time" && (
              <FormAddTime setClose={setClose} token={token} />
            )}

            {/* Form Add New Class */}
            {AddType == "Class" && (
              <FormAddClass setClose={setClose} token={token} />
            )}

            {/* Form Add New Announcment in teacher class */}
            {AddType == "Teacher Announcement" && classId && className && (
              <TeacherAnnouncmentForm
                className={className}
                classId={classId}
                setClose={setClose}
                token={token}
              />
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              ref={closeRef}
              className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
              <X />
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
