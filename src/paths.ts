export const paths = {
  dashboard() {
    return "/dashboard";
  },
  movies() {
    return "/movies";
  },
  screenings() {
    return "/screenings";
  },
  createMovie() {
    return "/movies/create";
  },
  updateMovie(slug: string) {
    return `/movies/${slug}`;
  },
};
