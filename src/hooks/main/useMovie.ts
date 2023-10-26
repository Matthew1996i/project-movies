import { useQuery } from "react-query";
import { api } from "@services/api";
import { MovieFilters, MovieProps } from "./types";

export async function getMovie({
  movie_id,
}: MovieFilters): Promise<MovieProps> {
  const response = await api.get(`/movie/${movie_id}`, {
    params: {
      language: "pt-br",
    },
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
    },
  });

  const movie = response.data;

  return movie;
}

export function useMovie({ movie_id }: MovieFilters) {
  const Movie = useQuery<MovieProps>(["movie"], () => getMovie({ movie_id }), {
    staleTime: 1000 * 60 * 60,
  });

  return Movie;
}
