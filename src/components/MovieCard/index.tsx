import { Box, Card, Group, Image, Text, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";

type MovieDataProps = {
  movie_id: number;
  imagePath: string;
  title: string;
  alt: string;
  sinopse: string;
};

export default function MovieCard({
  movie_id,
  imagePath,
  title,
  alt,
  sinopse,
}: MovieDataProps) {
  return (
    <Tooltip
      label={sinopse ? sinopse : ""}
      position="left"
      w={sinopse ? 250 : 0}
      multiline
      withArrow
      className="sm:none"
    >
      <Link to={`/details?movieId=${movie_id}`}>
        <Card shadow="sm" padding="lg" radius="md" withBorder w={170} m={10}>
          <Card.Section>
            <Image
              src={
                imagePath
                  ? `https://image.tmdb.org/t/p/w300/${imagePath}`
                  : "https://placehold.co/400x600?text=Image Not Found"
              }
              h={200}
              alt={alt}
              fit="fill"
            />
          </Card.Section>

          <Group mt="lg" mb="lg" justify="space-between" className="text-left">
            <Text fw={500} lineClamp={2} h={50}>
              {title}
            </Text>
          </Group>
          <Box>
            <Text
              size="xs"
              c="dimmed"
              className="grid justify-items-start"
              h={80}
              lineClamp={5}
            >
              {sinopse}
            </Text>
          </Box>
        </Card>
      </Link>
    </Tooltip>
  );
}
