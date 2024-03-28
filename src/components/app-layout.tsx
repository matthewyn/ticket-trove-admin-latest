"use client";

import { Button } from "@nextui-org/react";
import LogoFull from "./logo-full";
import { HiHome } from "react-icons/hi2";
import React from "react";
import { HiMiniFilm } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";
import Link from "next/link";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const path = usePathname();

  return (
    <main className="grid grid-cols-[1fr_4fr] gap-8 py-6">
      <div className="pl-4">
        <LogoFull />
        <div className="mt-8 flex flex-col gap-2">
          <Button
            variant={path === paths.dashboard() ? "flat" : "light"}
            color={path === paths.dashboard() ? "primary" : "default"}
            className="w-full"
            style={{ justifyContent: "start" }}
            startContent={<HiHome />}
            as={Link}
            href={paths.dashboard()}
          >
            Dashboard
          </Button>
          <Button
            variant={path === paths.movies() ? "flat" : "light"}
            color={path === paths.movies() ? "primary" : "default"}
            className="w-full"
            style={{ justifyContent: "start" }}
            startContent={<HiMiniFilm />}
            as={Link}
            href={paths.movies()}
          >
            Movies
          </Button>
        </div>
      </div>
      <div className="pr-4">{children}</div>
    </main>
  );
}
