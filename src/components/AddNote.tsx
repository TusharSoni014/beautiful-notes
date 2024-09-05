"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";


export default function AddNote({ onNoteAdded }: { onNoteAdded: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<INote>({ description: "", title: "" });
  const { toast } = useToast();
  const addNote = async () => {
    if (note.title === "") {
      toast({
        variant: "default",
        description: "Title is required!",
      });
      return;
    }
    try {
      setLoading(true);
      await fetch("/api/note", {
        method: "POST",
        body: JSON.stringify({
          title: note.title,
          description: note.description,
        }),
      });
      onNoteAdded();
      setNote({ description: "", title: "" });
    } catch (error) {
      toast({
        variant: "default",
        description: "Error: Failed to add note!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="relative w-full p-3 bg-white text-black rounded-md flex flex-col min-h-[200px]">
      <Input
        className="border-none focus-visible:ring-0 shadow-none font-bold"
        placeholder="Title"
        value={note.title}
        name="title"
        onChange={handleOnChange}
      />
      <Textarea
        className="border-none resize-none focus-visible:ring-0 flex-grow"
        placeholder="Description"
        value={note.description}
        name="description"
        onChange={handleOnChange}
      />
      <div className="btn_container flex gap-2 w-full">
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="destructive"
          size="icon"
          className="aspect-square"
        >
          <AiOutlineLogout />
        </Button>
        <Button
          loading={loading}
          onClick={addNote}
          className="bg-black w-full text-white hover:bg-black/80 hover:text-white"
        >
          Add Note +
        </Button>
      </div>
    </div>
  );
}
