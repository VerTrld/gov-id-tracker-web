"use client";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Group,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { get, patch, post } from "@/utils/http-api";
import Image from "next/image";
import React from "react";
import { IGovernmentIds } from "@/entities/IGovernmentIds";
import { useParams } from "next/navigation";
import { IconX } from "@tabler/icons-react";

export default function ProgressPage() {
  const params = useParams();
  const id = params.id;

  const { data, refetch: refetchGovernmentIds } = useQuery({
    queryKey: ["selected-government-id"],
    queryFn: async () => {
      const res = await get(`/government-ids/read/${id}`);
      console.log({ data: res.data });
      return res.data as IGovernmentIds;
    },
  });

  console.log(data);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Flex flex={1} justify="center" align="center">
      <Paper
        withBorder
        shadow="xl"
        radius="lg"
        w="95%"
        h={isMobile ? "98vh" : "95vh"}
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Flex
          direction="row"
          align={"center"}
          justify={"space-between"}
          flex={1}
          p={20}
        >
          <RingProgress
            size={150}
            thickness={15}
            sections={[{ value: 87.5, color: "#0A58BD" }]}
            rootColor="#B4B4B4"
            label={
              <Text c="black" fw={700} ta="center" size="md">
                87.5%
              </Text>
            }
          />

          <Box
            style={{
              backgroundColor: "#e3e3e3", // light gray background
              borderRadius: 12,
              //   padding: 20,
              maxWidth: 350,
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <Flex
              direction={"column"}
              style={{
                padding: "20px 20px 0px 20px",
              }}
            >
              {/* Close icon top right */}

              <IconX style={{ position: "absolute", top: 10, right: 10 }} />

              {/* Text content */}
              <Text fw={500} size="md" mb={8}>
                Reminder!
              </Text>
              <Text size="sm" mb={20}>
                You have not yet completed your National ID application.
              </Text>
            </Flex>

            {/* Button */}
            <Button
              fullWidth
              radius="md"
              style={{
                backgroundColor: "#9ccaff",
                color: "black",
                height: 70,
              }}
            >
              Complete Now
            </Button>
          </Box>
        </Flex>

        {/* Container for the progress items, centered vertically */}

        <Flex flex={1} justify={"center"}>
          <Flex
            direction="column"
            w="70%"
            p={30}
            gap={10}
            align="center"
            justify="center"
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <Group
                key={index}
                gap={70}
                style={{ width: "100%", justifyContent: "center" }} // center horizontally inside Group
              >
                <Title>Id</Title>
                <Progress
                  value={50}
                  radius="md"
                  color="#A7CEFC"
                  h={30}
                  style={{ flex: 1 }}
                />
              </Group>
            ))}
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
}
