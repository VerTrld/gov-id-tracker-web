"use client";
import { Box, Button, Flex, Select, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import * as y from "yup";

const page = () => {
  const { data } = useQuery({
    queryKey: ["governmentIds"],
    queryFn: async () => {
      const allGovernmentIds = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/government-ids/read/all`,
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
