import { Box, Card, Group, Image, Text } from "@mantine/core";

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

export default function CreditsCard({ person, style }: Person) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={170}
      m={10}
      style={style}
    >
      <Card.Section>
        <Image
          src={
            person && person?.profile_path
              ? `https://image.tmdb.org/t/p/w200/${person?.profile_path}`
              : "https://placehold.co/400x600?text=Image Not Found"
          }
          h={200}
          alt={`${person && person.original_name} image`}
          fit="fill"
        />
      </Card.Section>

      <Group mt="lg" mb="lg" justify="space-between" className="text-left">
        <Text fw={500} lineClamp={2}>
          {person && person.original_name}
        </Text>
      </Group>
      <Box>
        <Text size="sm" c="dimmed" lineClamp={3} className="text-left">
          {person && person.character ? person?.character : person?.job}
        </Text>
      </Box>
    </Card>
  );
}
