import CreditsCardHorizontal from "@components/CreditsCardHorizontal";
import { Button, Loader, Text } from "@mantine/core";
import { AiOutlineArrowLeft as ArrowLeftIcon } from "react-icons/ai";
import { AutoSizer, List } from "react-virtualized";

type PersonComponentProps = {
  persons:
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
      }[]
    | undefined;
  loading: boolean;
  title: string;
  setShowDetails: (status: boolean) => void;
};

type Size = {
  width: number;
  height: number;
};

export default function CreditsDisplay({
  persons,
  loading,
  title,
  setShowDetails,
}: PersonComponentProps) {
  if (loading) return <Loader />;

  if (!persons) {
    return <div>No data available</div>;
  }

  return (
    <div className="mb-6 pb-6 flex flex-col flex-wrap">
      <div className="flex flex-col justify-center mb-6">
        <Button
          leftSection={<ArrowLeftIcon size={14} />}
          onClick={() => setShowDetails(false)}
          variant="default"
        >
          Voltar
        </Button>
      </div>
      <Text mb={6} fw={500} fz="xl" className="grid justify-items-start">
        {title}
      </Text>
      <AutoSizer>
        {({ width }: Size) => (
          <List
            width={width}
            height={900}
            rowCount={persons.length}
            rowHeight={300}
            rowRenderer={({ index, key, style }) => {
              return (
                <CreditsCardHorizontal
                  person={persons[index]}
                  key={key}
                  style={style}
                />
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
}
