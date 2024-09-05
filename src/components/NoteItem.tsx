"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";

export default function NoteItem({
  id,
  title,
  description,
  onNoteUpdated,
}: {
  id: string;
  title: string;
  description: string | null;
  onNoteUpdated: () => void;
}) {
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [editedNote, setEditedNote] = useState<{
    title: string;
    description?: string;
  }>({ title: title, description: description || "" });
  const { toast } = useToast();

  const handleEdit = async () => {
    if (editedNote.title === "") {
      toast({
        variant: "default",
        description: "Title is required!",
      });
      return;
    }
    try {
      setEditLoading(true);
      await fetch("/api/note", {
        method: "PUT",
        body: JSON.stringify({
          id,
          title: editedNote.title,
          description: editedNote.description,
        }),
      });
      onNoteUpdated();
      toast({
        variant: "default",
        description: "Note updated successfully!",
      });
      setEditModalState(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error: Failed to update note!",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await fetch("/api/note", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      onNoteUpdated();
      toast({
        variant: "default",
        description: "Note deleted successfully!",
      });
      setDeleteModalState(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error: Failed to delete note!",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.div
      className="relative p-3 bg-white/10 rounded-md min-h-[200px] backdrop-blur-md border dark:border-none"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <p className="font-bold text-black dark:text-white break-words">{title}</p>
      {description && (
        <p className="text-black/70 dark:text-white/70 break-words">{description}</p>
      )}
      <div className="__edit_controls absolute top-1.5 right-1.5 flex gap-1.5">
        <Dialog open={editModalState} onOpenChange={setEditModalState}>
          <DialogTrigger asChild>
            <MdEdit className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="border-white/30">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
              <DialogDescription className="flex flex-col gap-3">
                <Input
                  placeholder="Title"
                  value={editedNote.title}
                  onChange={(e) =>
                    setEditedNote({ ...editedNote, title: e.target.value })
                  }
                  className="text-black dark:text-white border-white/30 dark:placeholder:text-white/40"
                  required
                />
                <Textarea
                  placeholder="Description"
                  value={editedNote.description || ""}
                  onChange={(e) =>
                    setEditedNote({
                      ...editedNote,
                      description: e.target.value,
                    })
                  }
                  rows={5}
                  className="text-black resize-none dark:text-white border border-white/30 dark:placeholder:text-white/40"
                />
                <Button
                  loading={editLoading}
                  onClick={handleEdit}
                  className="w-full"
                >
                  Confirm Edit
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={deleteModalState} onOpenChange={setDeleteModalState}>
          <DialogTrigger asChild>
            <MdDelete className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="border-white/30">
            <DialogHeader>
              <DialogTitle>Delete Note</DialogTitle>
              <DialogDescription className="flex flex-col gap-3">
                <p>Are you sure you want to delete this note?</p>
                <p> This action is not reversible.</p>
                <Button
                  loading={deleteLoading}
                  onClick={handleDelete}
                  variant="destructive"
                  className="w-full"
                >
                  Confirm Delete
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
