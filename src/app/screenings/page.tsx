"use client";

import AppLayout from "@/components/app-layout";
import { paths } from "@/paths";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";

export default function Screenings() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <Breadcrumbs>
          <BreadcrumbItem href={paths.dashboard()}>Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Screenings</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Screenings</h1>
        </div>
      </div>
    </AppLayout>
  );
}
