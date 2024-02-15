import MovieCard from "@components/MovieCard";
import { MoviesProps } from "@hooks/main/types";
import { Loader, SimpleGrid, Text } from "@mantine/core";

type ListCardRender = {
  title?: string;
  data: MoviesProps[] | undefined;
  loading?: boolean;
};

export default function MoviesDisplay({
  title,
  data,
  loading,
}: ListCardRender) {
  if (loading) return <Loader />;

  return (
    <div className="mb-6 pb-6 flex flex-col flex-wrap">
      <Text mb={6} fw={500} fz="xl" className="grid justify-items-start">
        {title}
      </Text>

      <SimpleGrid cols={{ xl: 6, lg: 6, md: 5, xs: 3, sm: 4, base: 2 }}>
        {data?.map((movie) => (
          <MovieCard
            key={movie?.id}
            sinopse={movie?.overview}
            movie_id={movie?.id}
            imagePath={movie?.poster_path}
            title={movie?.title}
            alt={`Image ${movie?.title}`}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
