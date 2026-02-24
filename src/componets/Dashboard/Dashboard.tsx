"use client";
import { IdTypes } from "@/entities/IdTypes";
import { get } from "@/utils/http-api";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import _ from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"apply" | "completed">("apply");

  const { data } = useQuery({
    queryKey: ["id-types"],
    queryFn: async () => {
      const res = await get(`/id-types/read/all`);
      return res.data as IdTypes[];
    },
  });

  const session = useSession();

  const userId = session?.data?.user?.id;

  // Compute overall progress
  const overallProgress = useMemo(() => {
    if (!data || !userId || data.length === 0) return 0;

    // Map each GovernmentId to its progress
    const itemProgresses = data.map((v) => {
      const requirements =
        v.requirements?.flatMap((rl) => rl.requirement || []) || [];

      if (requirements.length === 0) return 0;

      const completedCount = _.filter(requirements, (req) =>
        _.some(req.userRequirements, {
          userId,
          isCompleted: true,
        })
      ).length;

      return (completedCount / requirements.length) * 100;
    });

    // Average all item progresses
    const total = _.sum(itemProgresses);
    console.log({ itemProgresses });
    return _.round(total / itemProgresses.length);
  }, [data, userId]);

  console.log(data);

  {
    data?.map((v: any, index: number) => {
      const itemProgress = _.round(
        (_.filter(
          v.requirements?.flatMap((rl: any) => rl.requirement || []),
          (req) =>
            _.some(req.userRequirements, {
              userId,
              isCompleted: true,
            })
        ).length /
          (v.requirements?.flatMap((rl: any) => rl.requirement || []).length ||
            1)) *
        100
      );

      console.log(itemProgress);
    });
  }

  return (
    <Paper
      withBorder
      shadow="xl"
      radius="50px"
      w="95%"
      h={isMobile ? "98vh" : "95vh"}
      style={{
        position: "relative",
        overflowY: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.6)", // semi-transparent white
        backdropFilter: "blur(10px)", // frosted glass effect
        border: "1px solid rgba(255, 255, 255, 0.3)", // subtle border to enhance glass effect
      }}
    >
      <Flex direction={"column"} h={"100%"} p={30} gap={20}>
        <Flex direction="row" gap={10} wrap="wrap">
          {/* Left Stack */}
          <Stack flex={1} gap={5}>
            <Title
              size={isMobile ? "10vw" : "4vw"}
              c="#043873"
              fw={900}
              style={{ fontStyle: "italic" }}
              pl={"md"}
            >
              Hello,{" "}
              {_.upperCase(String(session.data?.user?.name)?.split(" ")[0])}!
            </Title>

            <Box
              flex={1}
              bg="#043873"
              style={{
                borderRadius: 50,
                color: "white",
                fontWeight: 400,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              }}
              p={30}
            >
              <Stack justify="space-between" style={{ height: "100%" }}>
                <div>
                  <Text>
                    Please ensure that you complete your in-progress IDs
                    application
                  </Text>
                  <Text>at your earliest convenience.</Text>
                </div>

                <div>
                  <Text c="dimmed" fz="sm" style={{ fontStyle: "italic" }}>
                    This website is not affiliated with, endorsed by,
                  </Text>
                  <Text c="dimmed" fz="sm" style={{ fontStyle: "italic" }}>
                    or connected to any government agency.
                  </Text>
                  {/* <Button
                    bg="#fff"
                    c="#043873"
                    radius="lg"
                    style={{ boxShadow: "rgba(0,0,0,0.25)" }}
                  >
                    Complete Application
                  </Button> */}
                </div>

                <div>
                  <Text>Have a nice day!</Text>
                </div>
              </Stack>

              <Image
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  maxWidth: "40%", // responsive size
                  height: "auto",
                }}
                width={250}
                height={250}
                alt="illustrator"
                src={`${process.env.NEXT_PUBLIC_ILLUSTRATOR}`}
              />
            </Box>
          </Stack>

          {/* Right Boxes */}
          {/* <Flex align={'center'} justify={'center'}> */}
          <Box
            bg={"#d3e4f9"}
            style={{
              width: isMobile ? "100%" : 250,
              borderRadius: 30,
              padding: 30,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              margin: 10,
              gap: 40,
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
            }}
          >
            <div>
              <Text c="#043873" fw={700} size="sm" lh={1.3}>
                OVERALL APPLICATION ID
              </Text>
              <Text c="#043873" fw={700} size="sm" mb={4}>
                PERCENTAGE:
              </Text>
            </div>
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
                thickness={20}
                sections={
                  overallProgress > 0
                    ? [{ value: overallProgress, color: "#0A58BD" }]
                    : []
                }
                rootColor="#B4B4B4"
                label={
                  <Text c="black" fw={700} ta="center" size="md">
                    {overallProgress}%
                  </Text>
                }
              />
            </Box>
          </Box>
          {/* </Flex> */}

          <Calendar
            style={{
              borderRadius: 20,
              padding: 10,
              margin: isMobile ? 'auto' : 10,
              height: "320px",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              backgroundColor: "#F0F4F9"

            }}
            styles={{
              weekday: {
                color: '#043873'
              },
              monthCell: {
                color: 'white'
              }
            }}
            renderDay={(date) => {
              const isToday = dayjs(date).isSame(dayjs(), "day");

              return (
                <Box
                  style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: isToday ? "#043873" : "transparent",
                    color: isToday ? "white" : "inherit",
                    fontWeight: isToday ? 600 : 400,
                  }}
                >
                  {dayjs(date).date()}
                </Box>
              );
            }}
          />
        </Flex>

        {/* 2nd */}
        <Flex direction="row" gap={30} wrap="wrap" flex={1}>
          <Stack
            gap={5}
            style={{ flex: "1 1 60%", minWidth: 280 }}
            pl={isMobile ? "" : 20}
          >
            <Group gap={0} style={{ width: "fit-content" }}>
              <Button
                size="xs"
                bg={activeTab === "apply" ? "#0A58BD" : "white"}
                c={activeTab === "apply" ? "white" : "#043873"}
                fw={600}
                style={{
                  borderRadius: "8px 0 0 8px",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={() => setActiveTab("apply")}
              >
                Apply
              </Button>
              <Button
                size="xs"
                bg={activeTab === "completed" ? "#0A58BD" : "white"}
                c={activeTab === "completed" ? "white" : "#043873"}
                fw={600}
                style={{
                  borderRadius: "0 8px 8px 0",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </Button>
            </Group>

            <Box
              flex={1}
              style={{
                borderRadius: 50,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 10,
                minHeight: 200,

                // Glass effect
                backgroundColor: "rgba(74, 81, 89, 0.3)", // semi-transparent layer
                backdropFilter: "blur(8px)", // frosted effect
                border: "1px solid rgba(255, 255, 255, 0.25)", // subtle glass border
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // slightly lifted shadow
              }}
              p={isMobile ? "10px" : "20px 50px"}
            >
              <Grid flex={1} align="stretch" gutter="xl">
                {data?.map((v) => {
                  const requirements =
                    v.requirements?.flatMap(
                      (rl: any) => rl.requirement || []
                    ) || [];
                  const completedCount = _.filter(requirements, (req) =>
                    _.some(req.userRequirements, { userId, isCompleted: true })
                  ).length;
                  const itemProgress = _.round(
                    (completedCount / (requirements.length || 1)) * 100
                  );

                  // filter depende sa active tab
                  if (activeTab === "apply" && itemProgress >= 100) return null;
                  if (activeTab === "completed" && itemProgress < 100)
                    return null;
                  return (
                    <GridCol
                      span={{ base: 6, md: 4 }}
                      key={v.label}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Paper
                        onClick={() => router.push(`/user/${v.code}`)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          maxWidth: 170,
                          padding: 20,
                          borderRadius: 40,
                          backgroundColor: "white",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",

                          // width: 110,
                          // height: 130,
                          flex: 1,
                          cursor: "pointer",
                          gap: 10,
                          justifyContent: "space-between",
                        }}
                        withBorder
                        radius="md"
                        p="md"
                        shadow="lg"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#d3e4f9";

                          console.log(v);
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#fff";
                        }}
                      >
                        <Flex
                          style={{ height: "100%" }}
                          justify={"center"}
                          align={"center"}
                          direction={"column"}
                          gap={20}
                        >
                          <Image
                            alt={v.label}
                            src={`${v.logoUrl}`}
                            width={80}
                            height={80}
                            style={{ borderRadius: 8, objectFit: "fill" }}
                          />
                          <Text
                            size="sm"
                            style={{
                              whiteSpace: "normal",
                              lineHeight: 1.2,
                              textAlign: "center",
                              color: "#043873",
                              fontWeight: 700,
                              fontSize: "14px",
                            }}
                          >
                            {v.label}
                          </Text>
                        </Flex>
                      </Paper>
                    </GridCol>
                  );
                })}
              </Grid>
            </Box>
          </Stack>

          <Box
            onClick={() => router.push("/user/progress")}
            style={{
              flex: "1 1 100px",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              minHeight: 120,
              // width: 280,
              // padding: 10,
              height: "40vh",

              margin: 10,
              borderRadius: "30px",
              cursor: "pointer",
            }}
            bg={"#FFFFFF"}
          >
            <Flex
              direction="column"
              w="100%"
              p={10}
              gap={15}
              bg={"rgba(4, 56, 115, 0.73)"}
              style={{ borderRadius: "30px 30px 0 0" }}
            >
              <Text ta={"center"} c={"white"} fw={700} fz={"lg"}>
                IN PROGRESS
              </Text>
            </Flex>
            <Flex
              direction="column"
              w="100%"
              p={20}
              gap={15}
              style={{
                overflowY: "auto",
                height: "30vh",
                scrollbarWidth: "thin",
              }}
            >
              {data?.map((v: any, index: number) => {
                const itemProgress = _.round(
                  (_.filter(
                    v.requirements?.flatMap((rl: any) => rl.requirement || []),
                    (req) =>
                      _.some(req.userRequirements, {
                        userId,
                        isCompleted: true,
                      })
                  ).length /
                    (v.requirements?.flatMap((rl: any) => rl.requirement || [])
                      .length || 1)) *
                  100
                );

                console.log({ itemProgress });

                return (
                  <Group key={index} style={{ width: "100%" }}>
                    <Text>{v.label}</Text>
                    <Progress value={itemProgress} style={{ flex: 1 }} />
                  </Group>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default Dashboard;
