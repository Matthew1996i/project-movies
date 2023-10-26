import { useQuery } from "react-query";
import { api } from "@services/api";
import { MoviesFilters, MoviesProps } from "./types";

export async function getMovies({
  query,
  page,
}: MoviesFilters): Promise<MoviesProps[]> {
  const response = await api.get(`search/movie`, {
    params: {
      query,
      page,
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

export function useMovies({ query, page }: MoviesFilters) {
  const MoviesList = useQuery<MoviesProps[]>(
    ["movies", query],
    () => getMovies({ query, page }),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return MoviesList;
}
