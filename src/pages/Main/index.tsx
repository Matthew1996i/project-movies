import MovieCard from "@components/MovieCard";
import MoviesDisplay from "@components/MoviesDisplay";
import MoviesScroll from "@components/ScrollYContainer";
import { useDiscoverMovies, useRatedMovies } from "@hooks/main";
import { useMutation } from "react-query";
import { Button, Input, Loader, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { api } from "@services/api";
import { MovieDataProps, MoviesFilters } from "@hooks/main/types";
import { queryClient } from "@services/queryClient";
import NoDataAvailabled from "@components/NoDataAvailabled";

export default function Main() {
  const [moviesData, setMovieData] = useState<MovieDataProps>();
  const [activePage, setPage] = useState(1);

  const { data: discoverMoviesList, isLoading: isDiscoverMoviesLoading } =
    useDiscoverMovies();
  const { data: ratedMoviesList, isLoading: isRatedMoviesLoading } =
    useRatedMovies();

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      query: "",
      page: activePage,
    },
  });

  const searchMovies = useMutation(async (filter: MoviesFilters) => {
    const { data } = await api.get(`search/movie`, {
      params: {
        query: filter.query,
        page: activePage,
        language: "pt-br",
      },
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
      },
    });

    return setMovieData(data);
  });

  const handleSearch: SubmitHandler<MoviesFilters> = async (values) => {
    await searchMovies.mutateAsync(values);
  };

  useEffect(() => {
    queryClient.invalidateQueries(["movie"]);
    queryClient.invalidateQueries(["movieCredits"]);
  }, []);

  useEffect(() => {
    const values = { page: activePage, query: watch().query };
    handleSearch(values);
  }, [activePage]);

  if (isDiscoverMoviesLoading || isRatedMoviesLoading) return <Loader />;

  return (
    <div>
      <Input
        placeholder="Buscar por Filme, Serie ou Pessoa..."
        rightSectionPointerEvents="all"
        {...register("query")}
        rightSection={
          <Button
            variant="gradient"
            leftSection={<SearchIcon size={16} />}
            onClick={handleSubmit(async (values) => {
              setPage(1);
              await handleSearch(values);
            })}
            mr={50}
          >
            Buscar
          </Button>
        }
        mb={20}
      />

      {moviesData?.results.length ? (
        <div className="pb-5">
          <MoviesDisplay
            title="Resultados"
            data={moviesData?.results}
            loading={searchMovies.isLoading}
          />
          <Pagination
            mt={20}
            total={moviesData?.total_pages}
            className="flex justify-center"
            value={activePage}
            onChange={setPage}
          />
        </div>
      ) : (
        <>
          <MoviesScroll title="Tendências">
            {discoverMoviesList?.length ? (
              discoverMoviesList?.map((movie) => (
                <MovieCard
                  sinopse={movie?.overview}
                  movie_id={movie?.id}
                  key={movie?.id}
                  imagePath={movie?.poster_path}
                  title={movie?.title}
                  alt={`Image ${movie?.title}`}
                />
              ))
            ) : (
              <NoDataAvailabled />
            )}
          </MoviesScroll>
          {ratedMoviesList?.length ? (
            <MoviesDisplay title="Recomendados" data={ratedMoviesList} />
          ) : (
            <NoDataAvailabled />
          )}
        </>
      )}
    </div>
  );
}
