import { useMovie, useMovieCredits } from "@hooks/main";
import {
  Badge,
  Box,
  Container,
  Group,
  Image,
  Loader,
  Spoiler,
  Text,
  Grid,
  Button,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import getYear from "date-fns/getYear";
import { formatDate, formatPeriod } from "@utils/timeHelpers";
import {
  AiOutlineClockCircle as ClockIcon,
  AiOutlineCalendar as CalendarIcon,
  AiOutlineArrowRight as ArrowRightIcon,
  AiOutlineArrowLeft as ArrowLeftIcon,
} from "react-icons/ai";
import CreditsCard from "@components/CreditsCard";
import MoviesScroll from "@components/ScrollYContainer";
import CreditsDisplay from "@components/CreditsDisplay";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Details() {
  const [showDetails, setShowDetails] = useState(false);
  const [queryParameters] = useSearchParams();
  const movieId = queryParameters.get("movieId");

  const { data: movieDetails, isLoading: isMovieDetailsLoading } = useMovie({
    movie_id: Number(movieId),
  });

  const { data: movieCredits, isLoading: isMovieCreditsLoading } =
    useMovieCredits({
      movie_id: Number(movieId),
    });

  const directEmployee = movieCredits?.crew.filter(
    (person) => person.job === "Director" || person.job === "Writer"
  );

  if (isMovieDetailsLoading || isMovieCreditsLoading) return <Loader />;

  return (
    <>
      <Container className="w-full container max-w-none">
        <Link to={`/`}>
          <div className="flex flex-col justify-center mb-6">
            <Button leftSection={<ArrowLeftIcon size={14} />} variant="default">
              Voltar
            </Button>
          </div>
        </Link>
        {showDetails ? (
          <>
            <CreditsDisplay
              persons={movieCredits?.cast}
              loading={isMovieCreditsLoading}
              title="Elenco principal"
              setShowDetails={setShowDetails}
            />
          </>
        ) : (
          <>
            <Box>
              <Image
                className="w-full"
                src={
                  movieDetails && movieDetails.backdrop_path
                    ? `https://image.tmdb.org/t/p/w780/${movieDetails.backdrop_path}`
                    : "https://placehold.co/400x600?text=Image Not Found"
                }
              />
            </Box>
            <div className="flex flex-col justify-start mb-10 mt-5">
              <Text fw={700} fz="30" className="text-left">
                {movieDetails?.title}
              </Text>
              <Badge color="gray" size="lg">
                {movieDetails?.release_date &&
                  getYear(new Date(movieDetails?.release_date))}
              </Badge>
            </div>
            <Grid mt="md" mb="xl">
              {directEmployee?.map((employee) => (
                <Grid.Col span={4}>
                  <Text fw={900} fz="15" className="text-left">
                    {employee.name}
                  </Text>
                  <Text fw={500} fz="12" className="text-left">
                    {employee.job}
                  </Text>
                </Grid.Col>
              ))}
            </Grid>

            <Group mt="md" mb="xs">
              <Badge leftSection={<CalendarIcon size={16} />}>
                {movieDetails?.release_date &&
                  formatDate(movieDetails?.release_date)}
              </Badge>
              {movieDetails?.genres &&
                movieDetails?.genres.map((genre, index) => {
                  if (index === movieDetails?.genres.length - 1)
                    return <Badge variant="outline">{genre.name}</Badge>;
                  return <Badge variant="outline">{genre.name}</Badge>;
                })}
              <Badge leftSection={<ClockIcon size={16} />}>
                {formatPeriod(Number(movieDetails?.runtime))}
              </Badge>
            </Group>

            <div className="flex flex-col justify-start mb-11">
              <Text fw={700} fz="20" className="text-start" mb={10}>
                Sinopse
              </Text>

              <Spoiler
                maxHeight={120}
                showLabel="Mais detalhes"
                hideLabel="Menos detalhes"
                className="text-left"
              >
                {movieDetails?.overview}
              </Spoiler>
            </div>

            <MoviesScroll title="Elenco principal">
              {movieCredits?.cast.slice(0, 10)?.map((person) => (
                <CreditsCard person={person} />
              ))}
              <div className="flex flex-col justify-center">
                <Button
                  rightSection={<ArrowRightIcon size={14} />}
                  onClick={() => setShowDetails(true)}
                  variant="default"
                >
                  Ver Mais
                </Button>
              </div>
            </MoviesScroll>
          </>
        )}
      </Container>
    </>
  );
}
