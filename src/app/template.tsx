"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ ease: "linear", duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
