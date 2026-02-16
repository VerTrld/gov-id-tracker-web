'use client'
import { Avatar, Box, Button, Divider, Flex, Group, Modal, Paper, Select, Stack, Switch, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function SettingsPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const session = useSession();

  const [opened, setOpened] = useState(false);


  const [user, setUser] = useState({
    name: session.data?.user?.name || '',
    email: session.data?.user?.email,
    newPassword: 'sample',
    confirmPassword: 'sample'
  });

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      newPassword: user.newPassword,
      confirmPassword: user.confirmPassword

    },

    // validate: {
    //   fullName: (value) => (value.trim().length === 0 ? 'Full Name is required' : null),
    //   gender: (value) => (value ? null : 'Select a gender'),
    //   country: (value) => (value ? null : 'Select a country'),
    //   language: (value) => (value ? null : 'Select a language'),
    //   timeZone: (value) => (value ? null : 'Select a time zone'),
    // },
  });

  const handleSubmit = (values: any) => {
    setUser((prev) => ({
      ...prev,
      ...values,
    }));
    setOpened(false);
  };


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
  const avatarColor = colors[user?.name.charCodeAt(0) % colors.length];

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          flex: 1,
          padding: isMobile ? '40px 16px' : '80px',
        }}
      >
        <Flex direction="column" gap={30} w={isMobile ? '100%' : '70%'}>
          <Paper
            shadow="xl"
            radius="md"
            withBorder
            p={isMobile ? 'md' : 'xl'}
          >
            <Flex direction="column" gap={30}>

              {/* Profile Header */}
              <Flex
                gap="md"
                align={isMobile ? 'center' : 'center'}
                justify="space-between"
                direction={isMobile ? 'column' : 'row'}
              >
                <Group justify={isMobile ? 'center' : 'flex-start'}>
                  <Avatar
                    size={isMobile ? 60 : 80}
                    name={user?.name}
                    radius="50%"
                    color={avatarColor}
                    fw={600}
                  />

                  <Box ta={isMobile ? 'center' : 'left'}>
                    <Text fw={700} size="lg">
                      {user.name}
                    </Text>
                    <Text c="dimmed" size="sm" mt={2}>
                      {user.email}
                    </Text>
                  </Box>
                </Group>

                <Button
                  onClick={() => setOpened(true)}
                  fullWidth={isMobile}
                >
                  Edit
                </Button>
              </Flex>

              {/* User Info */}
              <Flex direction="column" gap={20}>
                <Box>
                  <Text size="xs" c="dimmed" mb={4}>
                    Full Name
                  </Text>
                  <Text>{user.name}</Text>
                </Box>

                <Box>
                  <Text size="xs" c="dimmed" mb={4}>
                    Email
                  </Text>
                  <Text>{user.email || '-'}</Text>
                </Box>

                <TextInput
                  label="Password"
                  type="password"
                  disabled
                  value={user.newPassword}
                />
              </Flex>

              <Divider color="rgb(4, 56, 115)" size="md" />

              {/* Dark Mode Switch */}
              <Flex justify={isMobile ? 'center' : 'flex-start'}>
                <Switch
                  size="lg"
                  onLabel={<IconSun size={16} />}
                  offLabel={<IconMoon size={16} />}
                  checked={colorScheme === 'dark'}
                  onChange={(event) =>
                    setColorScheme(
                      event.currentTarget.checked ? 'dark' : 'light'
                    )
                  }
                />
              </Flex>

            </Flex>
          </Paper>
        </Flex>
      </Flex>


      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Profile"
        centered

        size={isMobile ? '90%' : 600}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Full Name"
              placeholder="Your Full Name"
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
            />

            <TextInput
              label="Password"
              placeholder="Enter you New Password"
              {...form.getInputProps('newPassword')}
            />

            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              {...form.getInputProps('confirmPassword')}
            />


            {/* <Select
              label="Gender"
              placeholder="Select Gender"
              data={genders}
              {...form.getInputProps('gender')}
              required
            /> */}



            <Group mt="md">
              <Button variant="default" onClick={() => setOpened(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
