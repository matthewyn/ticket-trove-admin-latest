"use server";

import { db } from "@/db";

export async function getBookings() {
  return await db.booking.findMany({ include: { screening: { select: { movie: true } } } });
}
