import { IUserAccount } from "@/entities/IUserAccount";
import { del } from "@/utils/http-api";
import {
  Card,
  Group,
  Avatar,
  Stack,
  Text,
  Badge,
  CopyButton,
  Tooltip,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCopy, IconCheck, IconUsers, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

interface ContactCardProps {
  user: IUserAccount;
  isActive?: boolean;
  onRemove?: () => void;
  onClick: () => void;
}

export function ContactCard({
  user,
  isActive = true,
  onClick,
  onRemove,
}: ContactCardProps) {
  const colors = [
    "violet",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "green",
    "lime",
    "yellow",
    "orange",
    "red",
    "pink",
    "grape",
  ];
  const avatarColor = colors[user?.name?.charCodeAt(0) % colors.length];

  console.log({ user });
  return (
    <Card
      p="md"
      radius="md"
      withBorder
      shadow="sm"
      style={{ cursor: "pointer", height: "100%" }}
      onClick={onClick}
      className="hover:shadow-md transition-shadow"
    >
      <Stack gap="md" h="100%">
        {/* Header with Avatar and Badge */}
        <Group justify="space-between" align="flex-start">
          <Avatar
            name={user?.name}
            size="lg"
            radius="50%"
            color={avatarColor}
            fw={600}
          />
          <Badge
            variant="filled"
            color={isActive ? "orange" : "gray"}
            size="sm"
            px="xs"
          >
            {isActive ? "ACTIVE" : "INACTIVE"}
          </Badge>
        </Group>

        {/* Name */}
        <Stack gap={2}>
          <Text fw={600} size="sm" lineClamp={1}>
            {user?.name}
          </Text>

          {/* Email with Copy Button */}
          <Group gap={4}>
            <Text size="xs" c="dimmed" style={{ flex: 1, overflow: "hidden" }}>
              {user?.email}
            </Text>
            <ActionIcon
              size={"xs"}
              variant="light"
              c={"red"}
              onClick={() => onRemove?.()}
            >
              <IconTrash />
            </ActionIcon>
            <CopyButton value={user?.email} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied" : "Copy"}
                  withArrow
                  position="right"
                >
                  <ActionIcon
                    color={copied ? "teal" : "gray"}
                    variant="subtle"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      copy();
                    }}
                  >
                    {copied ? (
                      <IconCheck style={{ width: "14px", height: "14px" }} />
                    ) : (
                      <IconCopy style={{ width: "14px", height: "14px" }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}

interface ContactCardGridProps {
  contacts: ContactCardProps[];
  onCardClick?: (contact: ContactCardProps) => void;
}

export function ContactCardGrid({
  contacts,
  onCardClick,
}: ContactCardGridProps) {
  const queryClient = useQueryClient();
  const handleDeleteUserAccount = (user: IUserAccount) => {
    openConfirmModal({
      centered: true,
      title: `Confirming will delete User: ${user.name}`,
      labels: {
        cancel: "Cancel",
        confirm: "Confirm",
      },
      onConfirm: async () => {
        try {
          const res = await del(`/user-account/delete/${user.id}`);

          if (res.status === 200 || res.status === 201) {
            notifications.show({
              title: "Deletion Successful",
              message: `${user.name} has been deleted!`,
              color: "green",
            });
            queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
          }
        } catch (error) {
          console.log({ error });
        }
      },
      // confirmProps
    });
  };
  return (
    <Grid gutter="lg">
      {contacts?.map((v, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
          <ContactCard
            user={v.user}
            key={`${index + 1}`}
            onClick={() => onCardClick?.(v)}
            onRemove={() => handleDeleteUserAccount(v.user)}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
