import { Box, Card, Flex, Image, Text, Grid } from "@mantine/core";

type Person = {
  person:
    | {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        credit_id: string;
        character?: string;
        order?: number;
        department?: string;
        job?: string;
      }
    | undefined;
  style?: React.CSSProperties;
};

export default function CreditsCardHorizontal({ person, style }: Person) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={style}
      h={250}
      className="w-full"
    >
      <Flex
        mih={50}
        gap="sm"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <Card.Section>
          <Image
            src={
              person && person?.profile_path
                ? `https://image.tmdb.org/t/p/w200/${person?.profile_path}`
                : "https://placehold.co/400x600?text=Image Not Found"
            }
            h={250}
            w={150}
            alt={`${person && person.original_name} image`}
            fit="cover"
          />
        </Card.Section>

        <Grid ml="xl" mb="lg" justify="space-between" className="text-left">
          <Grid.Col>
            <Text fw={500} lineClamp={2}>
              {person && person.original_name}
            </Text>
            <Box>
              <Text size="sm" c="dimmed" lineClamp={3} className="text-left">
                {person && person.character ? person?.character : person?.job}
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Flex>
    </Card>
  );
}
