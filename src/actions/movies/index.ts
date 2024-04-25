"use server";

import { db } from "@/db";
import { number, string, z } from "zod";
import _ from "lodash";
import slugify from "slugify";
import { redirect } from "next/navigation";
import { paths } from "@/paths";

interface MovieFormState {
  errors: {
    title?: string[];
    ratingsAverage?: string[];
    ratingsQuantity?: string[];
    summary?: string[];
    poster?: string[];
    runtime?: string[];
    genres?: string[];
    certification?: string[];
    mediaKey?: string[];
    _form?: string[];
  };
}

const Movie = z.object({
  title: string().min(1),
  ratingsAverage: number().min(1).max(10),
  ratingsQuantity: number().min(1),
  summary: string().min(1),
  poster: string()
    .min(1)
    .regex(/(\/[a-zA-Z0-9]*.jpg)/g, "Invalid format"),
  runtime: number().min(1),
  genres: string().min(1),
  cast: string(),
  mediaKey: string()
    .min(1)
    .regex(/([A-Za-z0-9-_])+(,\s)*/g, "Invalid format"),
});

export async function getMovies() {
  return await db.movie.findMany({});
}

export async function getMovie(slug: string) {
  return await db.movie.findFirst({ where: { slug } });
}

export async function deleteMovies() {
  await db.movie.deleteMany({});
}

export async function deleteMovie(id: string) {
  await db.movie.delete({ where: { id } });
}

export async function createMovie(formState: MovieFormState, formData: FormData): Promise<MovieFormState> {
  const result = Movie.safeParse({
    title: formData.get("title"),
    ratingsAverage: Number(formData.get("ratingsAverage")),
    ratingsQuantity: Number(formData.get("ratingsQuantity")),
    summary: formData.get("summary"),
    poster: formData.get("poster"),
    runtime: Number(formData.get("runtime")),
    genres: formData.get("genres"),
    cast: formData.get("cast"),
    mediaKey: formData.get("mediaKey"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const cast = JSON.parse(result.data.cast) as string[];
    const genres = JSON.parse(result.data.genres) as string[];
    const castObj = cast.map((el) => {
      const [name, character, profile] = el.split(", ");
      return {
        name,
        character,
        profile,
      };
    });
    const genresObj = genres.map((el) => _.capitalize(el));
    const mediaKeyObj = result.data.mediaKey.split(", ");
    const slug = slugify(result.data.title);
    await db.movie.create({
      data: {
        cast: castObj,
        genres: genresObj,
        mediaKey: mediaKeyObj,
        poster: result.data.poster,
        ratingsAverage: result.data.ratingsAverage,
        ratingsQuantity: result.data.ratingsQuantity,
        runtime: result.data.runtime,
        slug,
        summary: result.data.summary,
        title: result.data.title,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something bad happen"],
        },
      };
    }
  }
  redirect(paths.movies());
}

export async function updateMovie(formState: MovieFormState, formData: FormData): Promise<MovieFormState> {
  let slug = formData.get("slug") as string;
  const result = Movie.safeParse({
    title: formData.get("title"),
    ratingsAverage: Number(formData.get("ratingsAverage")),
    ratingsQuantity: Number(formData.get("ratingsQuantity")),
    summary: formData.get("summary"),
    poster: formData.get("poster"),
    runtime: Number(formData.get("runtime")),
    genres: formData.get("genres"),
    cast: formData.get("cast"),
    mediaKey: formData.get("mediaKey"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const cast = JSON.parse(result.data.cast) as string[];
    const genres = JSON.parse(result.data.genres) as string[];
    const castObj = cast.map((el) => {
      const [name, character, profile] = el.split(", ");
      return {
        name,
        character,
        profile,
      };
    });
    const genresObj = genres.map((el) => _.capitalize(el));
    const mediaKeyObj = result.data.mediaKey.split(", ");
    const movie = await getMovie(slug);
    slug = slugify(result.data.title, {
      lower: true,
      strict: true,
    });
    await db.movie.update({
      where: { id: movie?.id },
      data: {
        cast: castObj,
        genres: genresObj,
        mediaKey: mediaKeyObj,
        poster: result.data.poster,
        ratingsAverage: result.data.ratingsAverage,
        ratingsQuantity: result.data.ratingsQuantity,
        runtime: result.data.runtime,
        slug,
        summary: result.data.summary,
        title: result.data.title,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something bad happen"],
        },
      };
    }
  }
  redirect(paths.movies());
}
