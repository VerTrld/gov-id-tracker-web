"use client";
import { get } from "@/utils/http-api";
import { Flex, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const { data } = useQuery({
    queryKey: ["governmentIds"],
    queryFn: async () => {
      const allGovernmentIds = await get(
        `/government-ids/read/all`,
      );
      return (allGovernmentIds.data || []) as any[];
    },
  });

  console.log({ data });
  return (
    <div>
      <Flex>
        {data?.map((d, i) => {
          return (
            <Flex
              key={`government-ids-${i}`}
              style={{
                flexDirection: "column",
              }}
            >
              <Text>{d.label}</Text>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};

export default page;
