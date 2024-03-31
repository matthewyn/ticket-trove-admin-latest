"use server";

import { db } from "@/db";

export async function getMovies() {
  return await db.movie.findMany({});
}

export async function deleteMovies() {
  return await db.movie.deleteMany({});
}

export async function deleteMovie(id: string) {
  return await db.movie.delete({ where: { id } });
}
