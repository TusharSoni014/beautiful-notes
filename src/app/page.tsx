"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full h-dvh flex justify-center items-center gap-3 flex-col p-3">
      <motion.h1
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.25 }}
        className=" text-2xl font-bold text-center md:text-5xl"
      >
        Beautiful Notes
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.25, delay: 0.5 }}
        className="text-white/60 text-center"
      >
        A simple CRUD notes app made with Framer Motion + Next JS + Typescript
      </motion.p>
    </div>
  );
}
