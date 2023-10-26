import { Box, ScrollArea, Text } from "@mantine/core";

type ListCardRender = {
  children: React.ReactNode;
  title: string;
};

export default function ScrollYContainer({ children, title }: ListCardRender) {
  return (
    <div className="mb-6 flex flex-col">
      <Text mb={6} fw={500} fz="xl" className="grid justify-items-start">
        {title}
      </Text>
      <ScrollArea w="auto">
        <Box w="100%" className="flex flex-row">
          {children}
        </Box>
      </ScrollArea>
    </div>
  );
}
