import {
  Button,
  Card,
  Center,
  Flex,
  Group,
  RingProgress,
  Text
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
        0,
      ),
      100,
    );
  }, [items]);

  const isComplete = progress === 100;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Card withBorder radius="lg" p="lg" maw={700}>
      <Group align="center" gap="lg">
        {/* FIX: prevent RingProgress from blocking clicks */}
        <Flex
          w={isMobile ? "100%" : undefined}
          justify={"center"}
          style={{
            pointerEvents: "none",
          }}
        >
          <RingProgress
            size={120}
            thickness={10}
            sections={[
              { value: progress, color: isComplete ? "green" : "blue" },
            ]}
            label={
              <Center style={{ height: "100%" }}>
                <Text fw={700}>{progress}%</Text>
              </Center>
            }
          />
        </Flex>

        {children}
      </Group>

      <Button
        mt="md"
        fullWidth
        disabled={!isComplete}
        color="green"
        onClick={onComplete}
      >
        {buttonLabel}
      </Button>
    </Card>
  );
}
