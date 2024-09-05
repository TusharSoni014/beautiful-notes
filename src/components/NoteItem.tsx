"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function NoteItem({
  title,
  description,
}: {
  title: string;
  description: string | null;
}) {
  const variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  };
  return (
    <motion.div
      className="relative p-3 bg-white/10 rounded-md min-h-[200px] backdrop-blur-md"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <p className="font-bold text-white break-words">{title}</p>
      {description && <p className="text-white/70 break-words">{description}</p>}
      <div className="absolute top-1 right-1 border border-red-500">
        <Dialog>
          <DialogTrigger>hello</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
