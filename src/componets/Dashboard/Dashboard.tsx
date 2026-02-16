"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Indicator,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import _ from "lodash";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const images = [
    {
      image: process.env.NEXT_PUBLIC_PHILID_ICON,
      label: "Philippine National (PhilSys ID)",
    },
    {
      image: process.env.NEXT_PUBLIC_TIN_ICON,
      label: "Tax Identification Number (TIN)",
    },
    {
      image: process.env.NEXT_PUBLIC_SSS_ICON,
      label: "Social Security System (SSS)",
    },
    {
      image: process.env.NEXT_PUBLIC_PASSPORT_ICON,
      label: "Philippine Passport",
    },
    { image: process.env.NEXT_PUBLIC_POSTAL_ICON, label: "Postal ID" },
    {
      image: process.env.NEXT_PUBLIC_UMID_ICON,
      label: "Unified Multi-Purpose ID (UMID)",
    },
    { image: process.env.NEXT_PUBLIC_PHILHEALTH_ICON, label: "PhilHealth ID" },
    { image: process.env.NEXT_PUBLIC_PAGIBIG_ICON, label: "Pag-IBIG ID" },
    { image: process.env.NEXT_PUBLIC_NBI_ICON, label: "NBI Clearance" },
    {
      image: process.env.NEXT_PUBLIC_DRIVERLICENSE_ICON,
      label: "Driver's License",
    },
  ];

  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const session = useSession();

  console.log(session.data?.user?.name);

  return (
    <Paper
      withBorder
      shadow="xl"
      radius="lg"
      w="95%"
      h={isMobile ? "98vh" : "95vh"}
      style={{
        position: "relative",
        overflowY: "auto",
      }}
    >
      <Flex direction={"column"} h={"100%"} p={30} gap={20}>
        <Flex direction="row" gap={10} wrap="wrap">
          {/* Left Stack */}
          <Stack flex={1} gap={5}>
            <Title size={isMobile ? "10vw" : "5vw"} c="#043873">
              Hello, {_.upperCase(String(session.data?.user?.name)?.split(' ')[0])}!
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
          <Box
            bg={"#d3e4f9"}
            style={{
              width: 250,
              borderRadius: 30,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: 10,
              gap: 20,
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
          </Box>

          <Calendar
            style={{
              borderRadius: 20,
              padding: 10,
              margin: 10,
              height: "320px",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
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
        <Flex direction="row" gap={10} wrap="wrap" flex={1}>
          <Stack gap={5} style={{ flex: "1 1 60%", minWidth: 280 }}>
            <Group gap={0} style={{ width: "fit-content" }}>
              <Button
                size="xs"
                bg="#0A58BD"
                c="white"
                fw={600}
                style={{
                  borderRadius: "8px 0 0 8px",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                Apply
              </Button>
              <Button
                size="xs"
                bg="#A7CEFC"
                c="#043873"
                fw={600}
                style={{
                  borderRadius: "0 8px 8px 0",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                Completed
              </Button>
            </Group>

            <Box
              bg="#8ea5c0"
              flex={1}
              style={{
                borderRadius: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 10,
                minHeight: 200,
                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              }}
              p={10}
            >
              {isMobile ? (
                <>
                  <Grid justify="center" gutter="xl" p={10}>
                    {images.map((src) => (
                      <GridCol key={src.label} span={{ base: 6, sm: 4, md: 3 }}>
                        <Paper
                          withBorder
                          radius="md"
                          shadow="sm"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 20,
                            height: 130,
                            gap: 10,
                          }}
                        >
                          <Image
                            alt={src.label}
                            src={`${src.image}`}
                            width={70}
                            height={60}
                            style={{
                              objectFit: "contain",
                            }}
                          />

                          <Text
                            ta="center"
                            fw={700}
                            c="#043873"
                            size="xs"
                            style={{
                              width: 100,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {src.label}
                          </Text>
                        </Paper>
                      </GridCol>
                    ))}
                  </Grid>
                </>
              ) : (
                <>
                  <Flex
                    direction="row"
                    gap={30}
                    wrap="wrap"
                    mb={10}
                    justify="center"
                  >
                    {images.slice(0, 5).map((src) => (
                      <Paper
                        key={src.label}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 20,
                          borderRadius: 12,
                          backgroundColor: "white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          width: 110,
                          height: 130,
                          cursor: "default",
                          gap: 10,
                          justifyContent: "space-between",
                        }}
                        withBorder
                        radius="md"
                        p="md"
                        shadow="sm"
                      >
                        <Image
                          alt={src.label}
                          src={`${src.image}`}
                          width={70}
                          height={60}
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
                            fontSize: "10px",
                          }}
                        >
                          {src.label}
                        </Text>
                      </Paper>
                    ))}
                  </Flex>

                  <Flex direction="row" gap={30} wrap="wrap" justify="center">
                    {images.slice(5, 10).map((src) => (
                      <Paper
                        key={src.label}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 20,
                          borderRadius: 12,
                          backgroundColor: "white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          width: 110,
                          height: 130,
                          cursor: "default",
                          gap: 10,
                          justifyContent: "space-between",
                        }}
                        withBorder
                        radius="md"
                        p="md"
                        shadow="sm"
                      >
                        <Image
                          alt={src.label}
                          src={`${src.image}`}
                          width={70}
                          height={60}
                          style={{ borderRadius: 8 }}
                        />
                        <Text
                          size="sm"
                          style={{
                            whiteSpace: "normal",
                            lineHeight: 1.2,
                            textAlign: "center",
                            color: "#043873",
                            fontWeight: 700,
                            fontSize: "10px",
                          }}
                        >
                          {src.label}
                        </Text>
                      </Paper>
                    ))}
                  </Flex>
                </>
              )}
            </Box>
          </Stack>

          <Box
            onClick={() => router.push("/user/progress")}
            style={{
              flex: "1 1 200px",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              minHeight: 120,
              padding: 10,
              margin: 10,
              borderRadius: 30,
              cursor: "pointer",
            }}
          >
            <Text>In Progress</Text>

            <Group style={{ width: "100%" }}>
              <Text>Id</Text>
              <Progress value={50} style={{ flex: 1 }} />
            </Group>
            <Group style={{ width: "100%" }}>
              <Text>Id</Text>
              <Progress value={50} style={{ flex: 1 }} />
            </Group>
            <Group style={{ width: "100%" }}>
              <Text>Id</Text>
              <Progress value={50} style={{ flex: 1 }} />
            </Group>
            <Group style={{ width: "100%" }}>
              <Text>Id</Text>
              <Progress value={50} style={{ flex: 1 }} />
            </Group>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default Dashboard;
