"use client";

import React, { useEffect } from "react";
import { MdDashboard, MdOutlineLogin } from "react-icons/md";
import { IconBrandGithub, IconBrandX, IconHome } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  console.log(session)
  const [links, setLinks] = React.useState([
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Dashboard",
      icon: (
        <MdDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com/tusharsoni014",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/tusharsoni014",
    },
  ]);

  useEffect(() => {
    const updatedLinks = [
      {
        title: "Home",
        icon: (
          <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/",
      },
      {
        title: "Twitter",
        icon: (
          <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://twitter.com/tusharsoni014",
      },
      {
        title: "GitHub",
        icon: (
          <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://github.com/tusharsoni014",
      },
    ];

    if (session?.user) {
      updatedLinks.splice(1, 0, {
        title: "Dashboard",
        icon: (
          <MdDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/dashboard",
      });
      updatedLinks.push({
        title: session.user.name || "",
        icon: (
          <Image
            src={session.user.image || ""}
            width={40}
            height={40}
            alt={session.user.name || ""}
            className="w-full h-full object-contain rounded-full"
          />
        ),
        href: "#",
      });
    } else {
      updatedLinks.push({
        title: "Login",
        icon: (
          <MdOutlineLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/auth",
      });
    }

    setLinks(updatedLinks);
  }, [session]);

  return (
    <FloatingDock
      desktopClassName="absolute bottom-3 left-1/2 -translate-x-1/2 z-[999]"
      items={links}
    />
  );
}
