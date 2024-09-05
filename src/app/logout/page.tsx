"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  
  useEffect(() => {
    signOut().then(() => {
      router.push("/");
    });
  }, [router]);

  return (
    <div className="w-full h-screen flex justify-center items-center gap-1.5">
      Logging Out <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}
