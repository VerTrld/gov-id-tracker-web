import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  RingProgress,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { PropsWithChildren, useMemo } from "react";

export type ChecklistItem = {
  id: string;
  label: string;
  isActive: boolean;
};

interface ChecklistModuleProps extends PropsWithChildren {
  items: ChecklistItem[];
  buttonLabel?: string;
  onComplete?: () => void;
  uploadImage?: () => void;
}

export function ChecklistModule({
  items,
  buttonLabel = "Continue",
  onComplete,
  uploadImage,
  children,
}: ChecklistModuleProps) {
  // IMPORTANT: start empty, do NOT derive from items
  // const [checked, setChecked] = useState<Record<string, boolean>>({});

  const progress = useMemo(() => {
    return Math.min(
      items.reduce(
        (sum, item) => (item.isActive ? sum + (1 / items.length) * 100 : sum),
        0
      ),
      100
    );
  }, [items]);

  const isComplete = progress === 100;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Paper
      withBorder
      shadow="xl"
      radius="md"
      w="75%"
      maw={1200}
      style={{
        boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
        overflow: "hidden",
      }}
    >
      <Grid gutter={0}>
        {/* LEFT / BLUE PANEL */}
        <GridCol span={{ base: 12, md: 5 }} p={{ base: 10, md: 20 }}>
          <Box
            style={{
              borderRadius: 12,
              overflow: "hidden", // para hindi lumabas ang decorative circles
              border: "1px solid red",
              padding: 10,
            }}
          >
            <Box
              h="100%"
              bg="#0b5ed7"
              c="white"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 12,
                padding: 40,
                gap: 15,
              }}
            >
              {/* Ring Progress with White Center */}
              {/* <Box style={{ position: "relative", width: 160, height: 160 }}>
                <RingProgress
                  size={160}
                  thickness={18}
                  roundCaps
                  sections={[{ value: progress, color: "#4dabf7" }]}
                />
                <Box
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 124,
                    height: 124,
                    background: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text fw={700} size="xl" c="dark">
                    {progress}%
                  </Text>
                </Box>
              </Box> */}

              <RingProgress
                size={150}
                thickness={15}
                roundCaps
                sections={[{ value: progress, color: "#4dabf7" }]}
                label={
                  <Center>
                    {" "}
                    <Text fw={700} size="xl">
                      {" "}
                      {progress}%{" "}
                    </Text>{" "}
                  </Center>
                }
              />

              <Text fw={600} size="md">
                National ID
              </Text>

              <Button variant="light" color="white">
                Official Site
              </Button>

              {/* Decorative Circles */}
              <Box
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 20,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: -70,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "#A7CEFC",
                  opacity: "60%",
                }}
              />
            </Box>
          </Box>
        </GridCol>

        {/* RIGHT / FORM PANEL */}
        <GridCol span={{ base: 12, md: 7 }}>
          <Box
            h="100%"
            p={{ base: 20, md: 40 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#f8f9fa",
            }}
          >
            <Box>{children}</Box>

            <Flex w="100%" justify="flex-end" mt="md">
              <Button
                disabled={!isComplete}
                color="green"
                px={40}
                onClick={onComplete}
              >
                {buttonLabel}
              </Button>
            </Flex>
          </Box>
        </GridCol>
      </Grid>
    </Paper>
  );
}
