"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      <Button onClick={() => signIn("google")}>Google</Button>
    </div>
  );
}
