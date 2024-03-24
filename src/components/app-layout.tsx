import { Button } from "@nextui-org/react";
import LogoFull from "./logo-full";
import { HiHome } from "react-icons/hi2";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="grid grid-cols-[1fr_4fr] gap-8 py-6">
      <div className="pl-4">
        <LogoFull />
        <div className="mt-8">
          <Button variant="flat" color="primary" className="w-full" style={{ justifyContent: "start" }} startContent={<HiHome />}>
            Dashboard
          </Button>
        </div>
      </div>
      <div className="pr-4">{children}</div>
    </main>
  );
}
