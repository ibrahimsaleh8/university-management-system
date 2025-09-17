"use client";
import { FaLinkedin, FaWhatsapp, FaFacebook, FaTelegram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <motion.a
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        className="flex items-center text-sm hover:opacity-85 duration-300 font-medium gap-1 bg-[#0a66c2] px-4 py-1 rounded-md"
        href="https://www.linkedin.com/in/ibrahim-saleh-dev/"
        target="_blank">
        <FaLinkedin className="w-4 h-4" />
        Linkedin{" "}
      </motion.a>
      <motion.a
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        className="flex items-center text-sm hover:opacity-85 duration-300 gap-1 bg-[#075e54] text-white font-medium px-4 py-1 rounded-md"
        href="https://wa.me/201015405904?text="
        target="_blank">
        <FaWhatsapp className="w-4 h-4" />
        Whatsapp{" "}
      </motion.a>
      <motion.a
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
        className="flex items-center text-sm hover:opacity-85 duration-300 gap-1 bg-[#1877f2] text-white font-medium px-4 py-1 rounded-md"
        href="https://www.facebook.com/ibrahim7saleh/"
        target="_blank">
        <FaFacebook className="w-4 h-4" />
        Facebook
      </motion.a>
      <motion.a
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
        className="flex items-center text-sm hover:opacity-85 duration-300 gap-1 bg-[#0088cc] text-white font-medium px-4 py-1 rounded-md"
        href="https://t.me/Noyan_71"
        target="_blank">
        <FaTelegram className="w-4 h-4" />
        Telegram
      </motion.a>
    </div>
  );
}
