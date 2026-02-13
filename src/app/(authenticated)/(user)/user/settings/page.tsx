'use client'
import { Avatar, Box, Button, Flex, Group, Modal, Paper, Select, Stack, Switch, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React, { useState } from "react";

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

const timezones = [
  { value: 'gmt', label: 'GMT' },
  { value: 'est', label: 'EST' },
  { value: 'pst', label: 'PST' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function SettingsPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { colorScheme, setColorScheme } = useMantineColorScheme();


  const [opened, setOpened] = useState(false);

  const [user, setUser] = useState({
    fullName: 'Alexa Rawles',
    nickName: '',
    gender: 'female',
    country: 'us',
    language: 'en',
    timeZone: 'gmt',
    email: 'alexarawles@gmail.com',
  });

  const form = useForm({
    initialValues: {
      fullName: user.fullName,
      nickName: user.nickName,
      gender: user.gender,
      country: user.country,
      language: user.language,
      timeZone: user.timeZone,
    },

    validate: {
      fullName: (value) => (value.trim().length === 0 ? 'Full Name is required' : null),
      gender: (value) => (value ? null : 'Select a gender'),
      country: (value) => (value ? null : 'Select a country'),
      language: (value) => (value ? null : 'Select a language'),
      timeZone: (value) => (value ? null : 'Select a time zone'),
    },
  });

  const handleSubmit = (values: any) => {
    setUser((prev) => ({
      ...prev,
      ...values,
    }));
    setOpened(false);
  };

  return (
    <>

      <Flex
        direction="column"
        gap={80}
        style={{
          flex: 1,
          padding: isMobile ? "60px 20px" : "80px",
        }}
      >

        <Flex flex={1} direction={'column'} gap={30}  >
          <Paper
            shadow="xl"
            radius="md"
            withBorder
            style={{
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
              padding: '10px'
            }}
          >
            <Flex
              gap="md"
              align="center"
              justify="space-between"
              direction={isMobile ? 'column' : 'row'}
            >
              <Group >
                <Avatar
                  size={80}
                  radius="xl"
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                  alt={user.fullName}
                />
                <Box>
                  <Text fw={700} size="lg">
                    {user.fullName}
                  </Text>
                  <Text color="dimmed" size="sm" mt={2}>
                    {user.email}
                  </Text>
                </Box>
              </Group>

              <Button onClick={() => setOpened(true)} mt={isMobile ? 'md' : 0}>
                Edit
              </Button>
            </Flex>

            <Box
              mt="xl"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '20px 40px',
              }}
            >
              <Box>
                <Text size="xs" color="dimmed" mb={4}>
                  Full Name
                </Text>
                <Text>{user.fullName}</Text>
              </Box>

              <Box>
                <Text size="xs" color="dimmed" mb={4}>
                  Email
                </Text>
                <Text>{user.nickName || '-'}</Text>
              </Box>

              <Box>
                <Text size="xs" color="dimmed" mb={4}>
                  Language
                </Text>
                <Text>{languages.find((l) => l.value === user.language)?.label || '-'}</Text>
              </Box>

              <Box>
                <Text size="xs" color="dimmed" mb={4}>
                  Time Zone
                </Text>
                <Text>{timezones.find((t) => t.value === user.timeZone)?.label || '-'}</Text>
              </Box>
            </Box>
          </Paper>
        </Flex>

        {/* <Group align="center" gap="sm">
        
        <Switch
          size="xl"
          onLabel={<IconSun size={18} />}
          offLabel={<IconMoon size={18} />}
          checked={colorScheme === 'dark'}
          onChange={(event) =>
            setColorScheme(event.currentTarget.checked ? 'dark' : 'light')
          }
        />

      </Group> */}
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
              {...form.getInputProps('fullName')}
              required
            />

            <TextInput
              label="Nick Name"
              placeholder="Your Nick Name"
              {...form.getInputProps('nickName')}
            />

            <Select
              label="Gender"
              placeholder="Select Gender"
              data={genders}
              {...form.getInputProps('gender')}
              required
            />

            <Select
              label="Country"
              placeholder="Select Country"
              data={countries}
              {...form.getInputProps('country')}
              required
            />

            <Select
              label="Language"
              placeholder="Select Language"
              data={languages}
              {...form.getInputProps('language')}
              required
            />

            <Select
              label="Time Zone"
              placeholder="Select Time Zone"
              data={timezones}
              {...form.getInputProps('timeZone')}
              required
            />

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
