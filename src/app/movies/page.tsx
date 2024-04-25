"use client";

import AppLayout from "@/components/app-layout";
import { paths } from "@/paths";
import { BreadcrumbItem, Breadcrumbs, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { Movie } from "@prisma/client";
import { deleteMovie, deleteMovies, getMovies } from "@/actions/movies";
import MovieRatings from "@/components/movie-ratings";
import { HiMiniPlus, HiTrash } from "react-icons/hi2";
import toast from "react-hot-toast";
import Link from "next/link";
import { HiMiniPencil } from "react-icons/hi2";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number> | "all">(new Set([]));
  const isAll = Array.from(selectedKeys).length === movies.length;

  useEffect(function () {
    async function fetchData() {
      const movies = await getMovies();
      setMovies(movies);
    }
    fetchData();
  }, []);

  async function handleDeleteAll() {
    if (!isAll) return;
    await deleteMovies();
    toast.success("Success deleting movies");
  }

  async function handleDelete(id: string) {
    await deleteMovie(id);
    window.location.reload();
  }

  const content =
    movies.length > 0
      ? movies.map((movie, i) => (
          <TableRow key={i + 1}>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{movie.genres.join(", ")}</TableCell>
            <TableCell>
              <MovieRatings rating={movie.ratingsAverage} />
            </TableCell>
            <TableCell>
              <span className="flex gap-2">
                <HiTrash size={16} onClick={() => handleDelete(movie.id)} className="cursor-pointer" />
                <Link href={paths.updateMovie(movie.slug)}>
                  <HiMiniPencil className="cursor-pointer" size={14} />
                </Link>
              </span>
            </TableCell>
          </TableRow>
        ))
      : [];

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <Breadcrumbs>
          <BreadcrumbItem href={paths.dashboard()}>Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Movies</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Movies</h1>
          <Button color="primary" startContent={<HiMiniPlus />} size="sm" as={Link} href={paths.createMovie()}>
            Add new movie
          </Button>
        </div>
        <Table color="primary" selectionMode="multiple" selectedKeys={selectedKeys} aria-label="Movie table" onSelectionChange={setSelectedKeys}>
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>GENRES</TableColumn>
            <TableColumn>RATINGS</TableColumn>
            <TableColumn>
              <HiTrash className={`${!isAll ? "opacity-50" : "cursor-pointer"}`} size={16} onClick={handleDeleteAll} />
            </TableColumn>
          </TableHeader>
          <TableBody>{content}</TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
