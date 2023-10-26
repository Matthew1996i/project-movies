import { useQuery } from "react-query";
import { api } from "@services/api";
import { MovieCredits, MovieFilters } from "./types";

export async function getMovieCredits({
  movie_id,
}: MovieFilters): Promise<MovieCredits> {
  const response = await api.get(`/movie/${movie_id}/credits`, {
    params: {
      language: "pt-br",
    },
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
    },
  });

  const credits = response.data;

  return credits;
}

export function useMovieCredits({ movie_id }: MovieFilters) {
  const Movie = useQuery<MovieCredits>(
    ["movieCredits"],
    () => getMovieCredits({ movie_id }),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return Movie;
}
