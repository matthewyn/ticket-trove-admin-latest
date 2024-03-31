"use client";

import AppLayout from "@/components/app-layout";
import { paths } from "@/paths";
import { BreadcrumbItem, Breadcrumbs, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { Movie } from "@prisma/client";
import { deleteMovie, deleteMovies, getMovies } from "@/actions/movies";
import MovieRatings from "@/components/movie-ratings";
import { HiTrash } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number> | "all">(new Set(["2"]));
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
              <HiTrash size={16} onClick={() => deleteMovie(movie.id)} />
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
        <h1 className="text-2xl font-bold">Movies</h1>
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
