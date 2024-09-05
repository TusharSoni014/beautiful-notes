"use client";

import { PiPencilCircle } from "react-icons/pi";
import BlobAnimation from "@/components/ui/blob-animation";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";

const dancingScripts = Dancing_Script({
  weight: "600",
  display: "swap",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="relative w-full h-dvh flex justify-center items-center gap-3 flex-col p-3">
      <BlobAnimation />
      <motion.h1
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`text-2xl font-bold text-center md:text-5xl flex justify-center items-center gap-3 ${dancingScripts.className}`}
      >
        <PiPencilCircle size={40} /> Beautiful Notes
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-black/50 dark:text-white/60 text-center"
      >
        A simple CRUD notes app made with Framer Motion + Next JS + Typescript
      </motion.p>
    </div>
  );
}
