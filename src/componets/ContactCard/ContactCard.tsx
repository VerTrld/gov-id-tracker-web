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
} from '@mantine/core';
import { IconCopy, IconCheck, IconUsers } from '@tabler/icons-react';

interface ContactCardProps {
  name: string;
  email: string;
  isActive?: boolean;
  onClick: () => void;
}

export function ContactCard({
  name,
  email,
  isActive = true,
  onClick,
}: ContactCardProps) {


  const colors = [
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
    'red',
    'pink',
    'grape',
  ];
  const avatarColor = colors[name.charCodeAt(0) % colors.length];

  return (
    <Card
      p="md"
      radius="md"
      withBorder
      shadow="sm"
      style={{ cursor: 'pointer', height: '100%' }}
      onClick={onClick}
      className="hover:shadow-md transition-shadow"
    >
      <Stack gap="md" h="100%">
        {/* Header with Avatar and Badge */}
        <Group justify="space-between" align="flex-start">
          <Avatar
            name={name}
            size="lg"
            radius="50%"
            color={avatarColor}
            fw={600}
          />
          <Badge
            variant="filled"
            color={isActive ? 'orange' : 'gray'}
            size="sm"
            px="xs"
          >
            {isActive ? 'ACTIVE' : 'INACTIVE'}
          </Badge>
        </Group>

        {/* Name */}
        <Stack gap={2}>
          <Text fw={600} size="sm" lineClamp={1}>
            {name}
          </Text>

          {/* Email with Copy Button */}
          <Group gap={4}>
            <Text size="xs" c="dimmed" style={{ flex: 1, overflow: 'hidden' }}>
              {email}
            </Text>
            <CopyButton value={email} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  withArrow
                  position="right"
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant="subtle"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      copy();
                    }}
                  >
                    {copied ? (
                      <IconCheck style={{ width: '14px', height: '14px' }} />
                    ) : (
                      <IconCopy style={{ width: '14px', height: '14px' }} />
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

export function ContactCardGrid({ contacts, onCardClick }: ContactCardGridProps) {
  return (
    <Grid gutter="lg">
      {contacts?.map((v, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 6 }}>
          <ContactCard
            email={v.email}
            name={v.name}
            key={`${index + 1}`}
            onClick={() => onCardClick?.(v)}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
