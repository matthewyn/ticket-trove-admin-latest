"use server";

import { db } from "@/db";

export async function getStudios() {
  return await db.studio.findMany({});
}
