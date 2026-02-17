import { IRequirement } from "@/entities/IRequirement";
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
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useMemo } from "react";

interface ChecklistModuleProps extends PropsWithChildren {
  items: IRequirement[];
  buttonLabel?: string;
  onComplete?: () => void;
  uploadImage?: () => void;
  details?: React.ReactNode;
}

export function ChecklistModule({
  items,
  buttonLabel = "Continue",
  onComplete,
  uploadImage,
  details,
  children,
}: ChecklistModuleProps) {
  // IMPORTANT: start empty, do NOT derive from items
  // const [checked, setChecked] = useState<Record<string, boolean>>({});

  // const progress = useMemo(() => {
  //   return Math.min(
  //     items.reduce(
  //       (sum, item) => (item.isActive ? sum + (1 / items.length) * 100 : sum),
  //       0
  //     ),
  //     100
  //   );
  // }, [items]);

  // console.log(items);

  // const isComplete = progress === 100;

  const session = useSession();

  const progress = useMemo(() => {
    const userId = session?.data?.user?.id;
    if (!items || !userId) return 0;

    const total = items.length;
    if (total === 0) return 0;

    const activeCount = _.filter(items, (item) =>
      _.some(item.userRequirements, {
        userId: userId,
        isCompleted: true,
      }),
    ).length;

    return _.round((activeCount / total) * 100);
  }, [items, session.data?.user?.id]);

  const isComplete = progress === 100;
  console.log(progress);

  console.log(progress);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Paper
      withBorder
      shadow="xl"
      radius="lg"
      w="90%"
      h="80dvh"
      style={{
        boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
        position: "relative",

        // overflow: "hidden",
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
              borderRadius: 12,
              overflow: "hidden",
              padding: isMobile ? 10 : 20,
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
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                padding: 40,
                gap: 30,
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
                }}
              >
                <RingProgress
                  size={220}
                  thickness={15}
                  roundCaps
                  sections={
                    progress > 0 ? [{ value: progress, color: "#4dabf7" }] : []
                  }
                  rootColor="#B4B4B4"
                  label={
                    <Center>
                      <Text fw={700} size="30px" c="#043873">
                        {progress}%
                      </Text>
                    </Center>
                  }
                />
              </Box>

              {/* Details / Optional content */}
              <Stack
                gap={10}
                justify="center"
                align="center"
                style={{ zIndex: 1 }}
              >
                {details}
              </Stack>

              {/* Decorative Circles */}
              <Box
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 80,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: -30,
                  right: -80,
                  width: 180,
                  height: 170,
                  borderRadius: "50%",
                  background: "#A7CEFC",
                  opacity: 0.6,
                }}
              />
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
              {children}
            </Box>

            <Flex w="100%" justify="flex-end" mt="md">
              <Button
                disabled={!isComplete}
                color="#0A58BD"
                px={40}
                size="md"
                onClick={onComplete}
              >
                Confirm
              </Button>
            </Flex>
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
