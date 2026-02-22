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
        _.some(req.userRequirements, { userId, isCompleted: true })
      ).length;

      return (completedCount / requirements.length) * 100;
    });

    // Average all item progresses
    const total = _.sum(itemProgresses);
    return _.round(total / itemProgresses.length);
  }, [data, userId]);

  return (
    // <Flex
    //   direction="column"
    //   align={"center"}
    //   justify={"center"}
    //   style={{
    //     flex: 1,
    //     minHeight: "100vh",
    //     padding: isMobile ? 24 : 60,
    //     gap: 40,
    //     backgroundImage: `url(${process.env.NEXT_PUBLIC_DASH_2})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //   }}
    // >
    //   <Paper
    //     shadow="xl"
    //     radius="xl"
    //     withBorder
    //     style={{
    //       display: "flex",
    //       flexDirection: isMobile ? "column" : "row", // stack on mobile
    //       flex: 1,
    //       width: "100%",
    //       minHeight: 400,
    //       maxWidth: "100%",
    //     }}
    //   >
    //     {/* LEFT PANEL */}
    //     <Flex
    //       align={"center"}
    //       style={{ flex: "0 0 40%" }}
    //       p={isMobile ? 10 : 30}
    //     >
    //       <Box
    //         style={{
    //           flex: 1,
    //           height: "80%",
    //           width: "100%",

    //           backgroundColor: "#0b5ed7",
    //           color: "white",
    //           borderRadius: 30,
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           padding: 40,

    //           backgroundImage: `url(${process.env.NEXT_PUBLIC_PROGRESS})`,
    //           backgroundSize: "cover",
    //           backgroundPosition: "center",
    //           backgroundRepeat: "no-repeat",
    //         }}
    //       >
    //         <Box
    //           style={{
    //             width: isMobile ? 120 : 155,
    //             height: isMobile ? 120 : 155,
    //             background: "#fff",
    //             borderRadius: "50%",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             marginBottom: isMobile ? 0 : 200,
    //           }}
    //         >
    //           <RingProgress
    //             size={isMobile ? 180 : 220}
    //             thickness={15}
    //             roundCaps
    //             sections={
    //               overallProgress > 0
    //                 ? [{ value: overallProgress, color: "#4dabf7" }]
    //                 : []
    //             }
    //             rootColor="#B4B4B4"
    //             label={
    //               <Center>
    //                 <Text fw={700} size="30px" c="#043873">
    //                   {overallProgress}%
    //                 </Text>
    //               </Center>
    //             }
    //           />
    //         </Box>
    //       </Box>
    //     </Flex>
    //     {/* RIGHT PANEL */}
    //     <Flex
    //       direction="column"
    //       style={{
    //         flex: "0 0 60%",
    //         padding: 30,
    //         gap: 20,
    //         height: "80%",
    //         overflowY: "auto",
    //         alignSelf: "center",
    //       }}
    //     >
    //       {data?.map((v: any, index: number) => {
    //         const requirements =
    //           v.requirements?.flatMap((rl: any) => rl.requirement || []) || [];
    //         const completedCount = _.filter(requirements, (req) =>
    //           _.some(req.userRequirements, { userId, isCompleted: true })
    //         ).length;

    //         const itemProgress = _.round(
    //           (completedCount / (requirements.length || 1)) * 100
    //         );

    //         return (
    //           <Flex key={v.id || index} align="center" gap={20}>
    //             <Text
    //               fz="20px"
    //               fw={700}
    //               style={{ textAlign: "left", minWidth: 120 }}
    //             >
    //               {v.label}
    //             </Text>
    //             <Progress
    //               value={itemProgress}
    //               radius="md"
    //               color="#A7CEFC"
    //               h={20}
    //               style={{ flex: 1 }}
    //             />
    //           </Flex>
    //         );
    //       })}
    //     </Flex>
    //   </Paper>
    // </Flex>

    <Flex
      direction="column"
      align={"center"}
      justify={"center"}
      style={{
        flex: 1,
        // padding: 24,
        gap: 24,
        // backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minHeight: "100%",
        overflowY: "auto",
        backgroundImage: `url(${process.env.NEXT_PUBLIC_DASH_2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Title and description */}
      {/* <Box>
        <Title order={3} mb="xs" w={"90%"}>
          {data?.label}
        </Title>
        <Text size="sm">{data?.description || "No description indicated"}</Text>
      </Box> */}

      {/* <Divider my="sm" /> */}

      {/* Requirements checklist */}

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "81%",
          justifyContent: "center",
        }}
      >
        <Paper
          withBorder
          shadow="xl"
          radius="lg"
          w="90%"
          h={"100%"}
          style={{
            boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
            position: "relative",

            overflowY: "auto",
          }}
        >
          <Grid h="100%" gutter={0}>
            {/* LEFT PANEL */}
            <Grid.Col
              span={{ base: 12, md: 5 }}
              style={{
                height: isMobile ? undefined : "80vh",
                padding: 10,
              }}
            >
              <Box
                style={{
                  height: "100%",
                  overflow: "hidden",
                  padding: isMobile ? 10 : 20,
                }}
              >
                <Box
                  h="100%"
                  c="white"
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    padding: 40,
                    gap: 30,
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_PROGRESS})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    // justifyContent: 'center'
                  }}
                >
                  {/* Ring Progress Container */}
                  <Box
                    style={{
                      width: 155,
                      height: 155,
                      background: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      justifyItems: 'center',
                    }}
                  >

                    <RingProgress
                      size={220}
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

                  {/* Details / Optional content */}

                </Box>
              </Box>
            </Grid.Col>

            {/* RIGHT PANEL */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Box
                h="100%"
                p={{ base: 20, md: 40 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "#fff",
                  width: "100%",
                  borderRadius: "lg",
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Flex
                    direction="column"
                    style={{
                      padding: 30,
                      gap: 35,
                      height: "100%",
                      overflowY: "auto",
                      flex: 1,
                    }}
                  >
                    {data?.map((v: any, index: number) => {
                      const requirements =
                        v.requirements?.flatMap(
                          (rl: any) => rl.requirement || []
                        ) || [];
                      const completedCount = _.filter(requirements, (req) =>
                        _.some(req.userRequirements, {
                          userId,
                          isCompleted: true,
                        })
                      ).length;

                      const itemProgress = _.round(
                        (completedCount / (requirements.length || 1)) * 100
                      );

                      return (
                        <Flex key={v.id || index} align="center" gap={20}>
                          <Text
                            fz="20px"
                            fw={700}
                            style={{ textAlign: "left", minWidth: 120 }}
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
                </Box>

                <Flex w="100%" justify="flex-end" mt="md"></Flex>
              </Box>
            </Grid.Col>
          </Grid>
        </Paper>
      </Box>
    </Flex>
  );
}
