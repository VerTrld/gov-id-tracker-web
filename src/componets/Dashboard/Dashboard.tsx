"use client";
import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Calendar } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

const Dashboard = () => {
  const images = [
    process.env.NEXT_PUBLIC_UMID_CARD_3,
    process.env.NEXT_PUBLIC_UMID_CARD_4,
    process.env.NEXT_PUBLIC_UMID_CARD_5,
    process.env.NEXT_PUBLIC_UMID_CARD_6,
    process.env.NEXT_PUBLIC_UMID_CARD_7,
    process.env.NEXT_PUBLIC_UMID_CARD_8,
    process.env.NEXT_PUBLIC_UMID_CARD_9,
    process.env.NEXT_PUBLIC_UMID_CARD_10,
    process.env.NEXT_PUBLIC_UMID_CARD_11,
    process.env.NEXT_PUBLIC_UMID_CARD_12,
  ];

  const isMobile = useMediaQuery("(max-width: 768px)");

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
              Hello, Ver!
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
                  <Text>Don't forget to complete your</Text>
                  <Text>SSS ID Application</Text>
                </div>

                <div>
                  <Text>Have a nice day!</Text>
                </div>

                <div>
                  <Button
                    bg="#fff"
                    c="#043873"
                    radius="lg"
                    style={{ boxShadow: "rgba(0,0,0,0.25)" }}
                  >
                    Complete Application
                  </Button>
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
              justifyContent: "start",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: 10,
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
            }}
          >
            <Text c="#043873" fw={700} size="sm" lh={1.3}>
              OVERALL APPLICATION ID
            </Text>
            <Text c="#043873" fw={700} size="sm" mb={4}>
              PERCENTAGE:
            </Text>
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
              margin: 10,
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
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
              <Flex
                direction="row"
                gap={10}
                wrap="wrap"
                mb={10}
                justify="space-evenly"
              >
                {images.slice(0, 5).map((src, index) => (
                  <Image
                    key={index}
                    alt={`UMID Image ${index + 1}`}
                    src={`${src}`}
                    width={100}
                    height={100}
                    style={{ borderRadius: 8 }}
                  />
                ))}
              </Flex>

              <Flex direction="row" gap={10} wrap="wrap" justify="space-evenly">
                {images.slice(5, 10).map((src, index) => (
                  <Image
                    key={index + 5}
                    alt={`UMID Image ${index + 6}`}
                    src={`${src}`}
                    width={100}
                    height={100}
                    style={{ borderRadius: 8 }}
                  />
                ))}
              </Flex>
            </Box>
          </Stack>

          <Box
            style={{
              flex: "1 1 200px",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              minHeight: 120,
              padding: 10,
              margin: 10,
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
