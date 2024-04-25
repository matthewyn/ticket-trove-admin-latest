"use client";

import { CircularProgress } from "@nextui-org/react";

export default function LoadingProgress() {
  return (
    <div className="w-full absolute h-[calc(100vh-64px)] z-50 backdrop-blur-md flex items-center justify-center">
      <CircularProgress aria-label="Loading..." />
    </div>
  );
}
