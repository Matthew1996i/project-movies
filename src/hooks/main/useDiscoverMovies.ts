import { useQuery } from "react-query";
import { api } from "@services/api";
import { MoviesProps } from "./types";

export async function getDiscoverMovies(): Promise<MoviesProps[]> {
  const response = await api.get(`discover/movie/`, {
    params: {
      sort_by: "popularity.desc",
      page: 1,
      language: "pt-br",
    },
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
    },
  });

  const movies = response.data.results.map((movie: MoviesProps) => {
    return {
      ...movie,
    } as MoviesProps;
  });

  return movies;
}

export function useDiscoverMovies() {
  const MoviesList = useQuery<MoviesProps[]>(
    ["discoverMovies"],
    () => getDiscoverMovies(),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return MoviesList;
}
