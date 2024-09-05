"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlobAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full h-dvh absolute overflow-hidden"
    >
      <div className="__violet absolute left-0 w-[200px] bg-violet-500 h-[300px] rounded-full blur-3xl brightness-[35%] duration-10000 animate-spin" />
      <div className="__red absolute bottom-[-100px] duration-10000 animate-spin right-[-100px] w-[400px] h-[600px] rounded-full blur-3xl bg-red-500 brightness-[35%]" />
    </motion.div>
  );
}
