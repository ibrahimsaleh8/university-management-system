"use client";
import { TypingText } from "@/components/animate-ui/primitives/texts/typing";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <TypingText
        className="sm:text-4xl text-3xl font-bold"
        text="About Project"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-low-white mx-auto lg:w-1/2 sm:w-3/4 w-full text-center">
        This University Management System is a full-stack web application I
        developed to demonstrate my skills in building modern, scalable, and
        user-friendly systems. It provides a centralized platform where
        students, teachers, and administrators can efficiently manage academic
        tasks such as courses, exams, schedules, and grades.
      </motion.p>
    </div>
  );
}
