"use client";

import { getMovie, updateMovie } from "@/actions/movies";
import AppLayout from "@/components/app-layout";
import ButtonSubmit from "@/components/button-submit";
import LoadingProgress from "@/components/loading-progress";
import { paths } from "@/paths";
import { BreadcrumbItem, Breadcrumbs, Button, Input, Select, SelectItem, Skeleton, Textarea } from "@nextui-org/react";
import { Movie } from "@prisma/client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { HiMiniPlus } from "react-icons/hi2";

export default function UpdateMovies() {
  const [formState, action] = useFormState(updateMovie, { errors: {} });
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const [values, setValues] = useState<Set<string | number> | "all">(new Set([]));
  const [numInput, setNumInput] = useState([""]);

  useEffect(function () {
    async function fetchMovie() {
      setIsLoading(true);
      const movie = await getMovie(slug as string);
      if (!movie) return notFound();
      setValues((val) => {
        const newVal = new Set(val);
        movie.genres.forEach((genre) => newVal.add(genre.toLowerCase()));
        return newVal;
      });
      setNumInput(() => {
        return movie.cast.map((cast) => `${cast.name}, ${cast.character}, ${cast.profile}`);
      });
      setMovie(movie);
      setIsLoading(false);
    }
    fetchMovie();
  }, []);

  const handleChange = (i: number, e: React.FormEvent<HTMLInputElement>) => {
    const dupNumInput = [...numInput];
    dupNumInput[i] = e.currentTarget.value;
    setNumInput(dupNumInput);
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("cast", JSON.stringify(numInput));
    formData.append("genres", JSON.stringify(Array.from(values)));
    formData.append("slug", slug as string);
    action(formData);
  };

  const handleReset = () => {
    const form = document.getElementById("update-form") as HTMLFormElement;
    form.reset();
    setNumInput(() => {
      return movie.cast.map((cast) => `${cast.name}, ${cast.character}, ${cast.profile}`);
    });
    setValues((val) => {
      const newVal = new Set(val);
      movie.genres.forEach((genre) => newVal.add(genre.toLowerCase()));
      return newVal;
    });
  };

  let content;

  if (isLoading) return <LoadingProgress />;

  if (!isLoading) {
    content = numInput.map((el, i) => (
      <>
        <Input
          label={`Cast ${i + 1}`}
          labelPlacement="outside"
          placeholder="Safira Ratu Sofya, Tyas, /iYk3YXvFmyyApWr54JZXYbuFre7.jpg"
          description="Follow this format: Actual name, character name, poster URL"
          isRequired
          value={el}
          pattern="^[a-zA-Z0-9\s.]+(,\s[a-zA-Z\s.]+)+(,\s\/[a-zA-Z0-9\s.]+.jpg)+"
          onChange={(e) => handleChange(i, e)}
        />
      </>
    ));
  }

  return (
    <AppLayout>
      <div className=" flex flex-col gap-8">
        <Breadcrumbs>
          <BreadcrumbItem href={paths.dashboard()}>Dashboard</BreadcrumbItem>
          <BreadcrumbItem href={paths.movies()}>Movies</BreadcrumbItem>
          <BreadcrumbItem>Update</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold">Update Movie</h1>
        <div className="grid grid-cols-[3fr_1fr] gap-8 items-start">
          <div>
            <form className="flex flex-col gap-6" id="update-form" onSubmit={handleForm}>
              <Input
                label="Title"
                labelPlacement="outside"
                id="title"
                name="title"
                placeholder="Ancika: Dia yang Bersamaku 1995"
                isRequired
                defaultValue={movie.title}
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title}
              />
              <Input
                label="Average ratings"
                labelPlacement="outside"
                type="number"
                name="ratingsAverage"
                placeholder="8"
                isRequired
                isInvalid={!!formState.errors.ratingsAverage}
                errorMessage={formState.errors.ratingsAverage}
                defaultValue={String(movie.ratingsAverage)}
              />
              <Input
                label="Ratings quantity"
                labelPlacement="outside"
                type="number"
                name="ratingsQuantity"
                placeholder="2"
                isRequired
                isInvalid={!!formState.errors.ratingsQuantity}
                errorMessage={formState.errors.ratingsQuantity}
                defaultValue={String(movie.ratingsQuantity)}
              />
              <Textarea
                label="Summary"
                labelPlacement="outside"
                placeholder="Dilan and Ancika Mehrunisa's Rabu friendship. Their increasingly close relationship made the seeds of love grow and their relationship rose to the level of lovers."
                name="summary"
                isRequired
                isInvalid={!!formState.errors.summary}
                errorMessage={formState.errors.summary}
                defaultValue={movie.summary}
              />
              <Input
                label="Poster"
                labelPlacement="outside"
                name="poster"
                placeholder="/gt0zaEuYDgr5AbgHkLKmTfliBdd.jpg"
                description="Use TMDb API to get the URL poster"
                isRequired
                isInvalid={!!formState.errors.poster}
                errorMessage={formState.errors.poster?.join(", ")}
                defaultValue={movie.poster}
              />
              <Input
                label="Runtime"
                labelPlacement="outside"
                type="number"
                name="runtime"
                placeholder="98"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">mins</span>
                  </div>
                }
                isRequired
                isInvalid={!!formState.errors.runtime}
                errorMessage={formState.errors.runtime}
                defaultValue={String(movie.runtime)}
              />
              <Select
                labelPlacement="outside"
                label="Genres"
                selectedKeys={values}
                onSelectionChange={setValues}
                placeholder="Action, Comedy"
                selectionMode="multiple"
                isInvalid={!!formState.errors.genres}
                errorMessage={formState.errors.genres}
                isRequired
              >
                <SelectItem key="action" value="action">
                  Action
                </SelectItem>
                <SelectItem key="adventure" value="adventure">
                  Adventure
                </SelectItem>
                <SelectItem key="animation" value="animation">
                  Animation
                </SelectItem>
                <SelectItem key="comedy" value="comedy">
                  Comedy
                </SelectItem>
                <SelectItem key="crime" value="crime">
                  Crime
                </SelectItem>
                <SelectItem key="documentary" value="documentary">
                  Documentary
                </SelectItem>
                <SelectItem key="drama" value="drama">
                  Drama
                </SelectItem>
                <SelectItem key="fantasy" value="fantasy">
                  Fantasy
                </SelectItem>
                <SelectItem key="history" value="history">
                  History
                </SelectItem>
                <SelectItem key="horror" value="horror">
                  Horror
                </SelectItem>
                <SelectItem key="mystery" value="mystery">
                  Mystery
                </SelectItem>
                <SelectItem key="romance" value="romance">
                  Romance
                </SelectItem>
                <SelectItem key="thriller" value="thriller">
                  Thriller
                </SelectItem>
              </Select>
              {content}
              <div>
                <Button color="primary" variant="ghost" startContent={<HiMiniPlus />} size="sm" onClick={() => setNumInput([...numInput, ""])}>
                  Add more
                </Button>
              </div>
              <Input
                label="Media key"
                labelPlacement="outside"
                isRequired
                name="mediaKey"
                placeholder="Q3bWmyvyA-, zvklf3Y-qso"
                description="Media key for Youtube URL"
                isInvalid={!!formState.errors.mediaKey}
                errorMessage={formState.errors.mediaKey}
                defaultValue={movie?.mediaKey?.join(", ")}
              />
              <Input label="Certification" labelPlacement="outside" name="certification" placeholder="17+" defaultValue={movie.certification || ""} />
              <div>
                <ButtonSubmit />
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
