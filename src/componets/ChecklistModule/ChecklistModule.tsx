import {
    Button,
    Card,
    Center,
    Checkbox,
    Group,
    RingProgress,
    Stack,
    Text,
} from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

export type ChecklistItem = {
    id: string;
    label: string;
    value: number; // percentage value
};

type ChecklistModuleProps = {
    items: ChecklistItem[];
    buttonLabel?: string;
    onComplete?: () => void;
};

export function ChecklistModule({
    items,
    buttonLabel = 'Continue',
    onComplete,
}: ChecklistModuleProps) {
    // IMPORTANT: start empty, do NOT derive from items
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const progress = useMemo(() => {
        return Math.min(
            items.reduce(
                (sum, item) => (checked[item.id] ? sum + item.value : sum),
                0
            ),
            100
        );
    }, [checked, items]);

    useEffect(() => {
        checked

    }, [checked])


    const isComplete = progress === 100;

    return (
        <Card withBorder radius="lg" p="lg" maw={420}>
            <Group align="center" gap="lg">
                {/* FIX: prevent RingProgress from blocking clicks */}
                <div style={{ pointerEvents: 'none' }}>
                    <RingProgress
                        size={120}
                        thickness={10}
                        sections={[{ value: progress, color: isComplete ? 'green' : 'blue' }]}
                        label={
                            <Center style={{ height: '100%' }}>
                                <Text fw={700}>{progress}%</Text>
                            </Center>
                        }
                    />
                </div>

                <Stack gap="xs" style={{ flex: 1 }}>
                    {items.map((item, i) => (
                        <Checkbox
                            key={`${item.id + 34}`}
                            label={`${item.label} (${item.value}%)`}
                            checked={checked[item.id] ?? false}
                            onChange={(event) => {
                                const isChecked = event.currentTarget.checked; // capture now
                                setChecked((prev) => ({
                                    ...prev,
                                    [item.id]: isChecked,
                                }));
                            }}

                        />
                    ))}
                </Stack>
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
