"use client";

import AddNote from "@/components/AddNote";
import NoteItem from "@/components/NoteItem";
import { Note } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    fetchNotes();
  }, []);

  const refreshNotes = () => {
    fetchNotes();
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/note", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="w-full h-screen">
        <motion.div className="relative w-full p-3 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 overflow-y-auto max-h-dvh">
          <AddNote onNoteAdded={refreshNotes} />
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <NoteItem
                onNoteUpdated={refreshNotes}
                id={note.id}
                description={note.description}
                title={note.title}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
