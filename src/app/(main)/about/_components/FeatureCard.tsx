"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
type Props = {
  title: string;
  desc: string;
  icon: ReactNode;
  index: number;
};
export default function FeatureCard({ desc, icon, title, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="p-4 w-full bg-Second-black rounded-md flex flex-col gap-3 border border-soft-border">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-glass-green text-main-text">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-low-white text-sm">{desc} </p>
      </div>
    </motion.div>
  );
}
