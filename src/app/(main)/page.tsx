"use client";

import { Lightbulb } from "lucide-react";
import Link from "next/link";
import dashboardImage from "@images/dashboard.webp";
import Image from "next/image";
import { TypingText } from "@/components/animate-ui/primitives/texts/typing";
import { motion } from "framer-motion";
import HeroBtn from "./(Auth)/login/_components/HeroBtn";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-3">
      <p className="px-3 pl-1 py-1 bg-Second-black rounded-sm text-low-white text-xs flex items-center gap-1">
        <span className="px-1 py-0.5 bg-main-text text-black rounded-sm">
          New
        </span>
        <TypingText
          className="line-clamp-1"
          text="Introducing the ultimate University Management System"
        />{" "}
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:text-5xl sm:text-4xl text-3xl text-center font-medium">
        <p>Empower your campus</p>
        <p>with efficiency and simplicity</p>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="text-sm text-low-white md:w-1/2 w-full text-center">
        A modern University Management System designed to streamline student,
        teacher, and course management. Save time, reduce errors, and provide a
        seamless experience for administrators, faculty, and students. Fully
        customizable, secure, and scalable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex items-center gap-7 flex-wrap">
        <HeroBtn />
        <Link
          className="flex items-center gap-2 px-8 py-2 bg-Second-black text-white rounded-sm font-bold text-sm"
          href={"/about"}>
          <Lightbulb className="w-4 h-4" />
          About Project
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="rounded-2xl pt-1 mt-5 overflow-hidden bg-Second-black flex flex-col gap-1">
        <div className="w-full h-5 bg-Second-black flex items-center gap-2 pl-3">
          <div className="w-4 h-4 bg-[#FB2C36] rounded-full"></div>
          <div className="w-4 h-4 bg-[#F0B100] rounded-full"></div>
          <div className="w-4 h-4 bg-[#00C951] rounded-full"></div>
        </div>
        <Image
          src={dashboardImage}
          alt="Dashboard image"
          width={1000}
          height={1000}
          priority
          className="w-full object-cover object-center rounded-2xl"
        />
      </motion.div>
    </div>
  );
}
