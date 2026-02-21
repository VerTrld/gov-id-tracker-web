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
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { IconMail, IconMapPin, IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import _ from "lodash";
import { IdTypes } from "@/entities/IdTypes";

export default function ProgressPage() {
  const params = useParams();
  const id = params.id;

  const { data } = useQuery({
    queryKey: ["id-types"],
    queryFn: async () => {
      const res = await get(`/id-types/read/all`);
      return res.data as IdTypes[];
    },
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const session = useSession();
  const userId = session?.data?.user?.id;

  // Compute overall progress
  const overallProgress = useMemo(() => {
    if (!data || !userId || data.length === 0) return 0;

    // Map each GovernmentId to its progress
    const itemProgresses = data.map((v: any) => {
      const requirements =
        v.requirements?.flatMap((rl: any) => rl.requirement || []) || [];

      if (requirements.length === 0) return 0;

      const completedCount = _.filter(requirements, (req) =>
        _.some(req.userRequirements, { userId, isCompleted: true }),
      ).length;

      return (completedCount / requirements.length) * 100;
    });

    // Average all item progresses
    const total = _.sum(itemProgresses);
    return _.round(total / itemProgresses.length);
  }, [data, userId]);

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
                      sections={
                        overallProgress > 0
                          ? [{ value: overallProgress, color: "#4dabf7" }]
                          : []
                      }
                      rootColor="#B4B4B4"
                      label={
                        <Center>
                          <Text fw={700} size="30px" c="#043873">
                            {overallProgress}%
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

                  <Flex justify="center">
                    <Flex
                      direction="column"
                      w="90%"
                      p={20}
                      gap={20}
                      align="stretch"
                      justify="center"
                      mih={350}
                      
                    >
                      {data?.map((v: any, index: number) => {
                        const itemProgress = _.round(
                          (_.filter(
                            v.requirements?.flatMap(
                              (rl: any) => rl.requirement || [],
                            ),
                            (req) =>
                              _.some(req.userRequirements, {
                                userId,
                                isCompleted: true,
                              }),
                          ).length /
                            (v.requirements?.flatMap(
                              (rl: any) => rl.requirement || [],
                            ).length || 1)) *
                            100,
                        );

                        return (
                          <Flex key={v.id || index} align="center" gap={20}>
                            <Text
                              fz="20px"
                              fw={700}
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {v.label}
                            </Text>
                            <Progress
                              value={itemProgress}
                              radius="md"
                              color="#A7CEFC"
                              h={20}
                              style={{ flex: 1 }}
                            />
                          </Flex>
                        );
                      })}
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
