import { useQuery } from "react-query";
import { api } from "@services/api";
import { MoviesProps } from "./types";

export async function getRatedMovies(): Promise<MoviesProps[]> {
  const response = await api.get(`discover/movie/`, {
    params: {
      sort_by: "vote_average.desc",
      "vote_count.gte": 200,
      page: 1,
      language: "pt-br",
      without_genres: "99,10755",
    },
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
    },
  });

  const movies = response?.data?.results.map((movie: MoviesProps) => {
    return {
      ...movie,
    } as MoviesProps;
  });

  return movies;
}

export function useRatedMovies() {
  const MoviesList = useQuery<MoviesProps[]>(
    ["ratedMovies"],
    () => getRatedMovies(),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return MoviesList;
}
