"use client";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  Textarea,
  TextInput,
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
import { IconMail, IconMapPin, IconX } from "@tabler/icons-react";

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
    <Flex
      direction="column"
      gap={80}
      style={{
        flex: 1,
        padding: isMobile ? "60px 20px" : "100px",
      }}
    >
      <Flex flex={1} direction={"column"} justify={"center"} gap={30}>
        <Flex>
          <Paper
            shadow="xl"
            radius="md"
            withBorder
            style={{
              maxWidth: 1000,
              width: "100%",
              margin: "auto",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
            }}
          >
            <Grid gutter={0}>
              {/* LEFT / BLUE */}
              <GridCol span={{ base: 12, md: 5, lg: 5 }}>
                <Box
                  h="100%"
                  p={40}
                  bg="#0b5ed7"
                  c="white"
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    style={{
                      width: 120,
                      height: 120,
                      background: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <RingProgress
                      size={180}
                      thickness={15}
                      roundCaps
                      sections={[{ value: 70, color: "#4dabf7" }]}
                      rootColor="#B4B4B4"
                      label={
                        <Center>
                          <Text fw={700} size="30px" c="#043873">
                            {70}%
                          </Text>
                        </Center>
                      }
                    />
                  </Box>

                  {/* Decorative circles */}
                  {/* <Box
                    style={{
                      position: "absolute",
                      bottom: -20,
                      right: 40,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.25)",
                    }}
                  />
                  <Box
                    style={{
                      position: "absolute",
                      bottom: -90,
                      right: -40,
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                    }}
                  /> */}
                </Box>
              </GridCol>

              {/* RIGHT / FORM */}
              <GridCol span={{ base: 12, md: 7, lg: 7 }}>
                <Box h="100%">
                  {/* Container for the progress items, centered vertically */}

                  <Flex flex={1} justify={"center"}>
                    <Flex
                      direction="column"
                      w="90%"
                      p={30}
                      gap={10}
                      align="center"
                      justify="center"
                      mih={350}
                    >
                      {Array.from({ length: 7 }).map((_, index) => (
                        <Group
                          key={index}
                          gap={70}
                          style={{
                            width: "100%",
                            justifyContent: "center",
                          }} // center horizontally inside Group
                        >
                          <Title order={2}>Id</Title>
                          <Progress
                            value={50}
                            radius="md"
                            color="#A7CEFC"
                            h={20}
                            style={{ flex: 1 }}
                          />
                        </Group>
                      ))}
                    </Flex>
                  </Flex>
                </Box>
              </GridCol>
            </Grid>
          </Paper>
        </Flex>
      </Flex>
    </Flex>
  );
}
