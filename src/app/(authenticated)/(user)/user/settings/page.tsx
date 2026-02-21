"use client";
import { put } from "@/utils/http-api";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconMoon, IconSun, IconYinYang } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import * as y from "yup";

const userSchema = y
  .object({
    name: y.string().required(),
    email: y.string().email().required(),
    currentPassword: y.string().required(),
    newPassword: y.string().required("New password is required"),
    confirmPassword: y
      .string()
      .required("Confirm password is required")
      .oneOf([y.ref("newPassword")], "Passwords must match"),
  })
  .required();

type IUserForm = y.InferType<typeof userSchema>;

export default function SettingsPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const action = params.get("action");
  const baseUrl = usePathname();

  const userForm = useForm<IUserForm>({
    initialValues: {
      name: session?.data?.user?.name || "",
      email: session?.data?.user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: yupResolver(userSchema),
  });

  const handleSubmit = userForm.onSubmit(async (values) => {
    try {
      const res = await put("/user-account/update", {
        name: values.name,
        email: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (res.status === 200 || res.status === 201) {
        notifications.show({
          title: "Update",
          message: "Update Successfully",
          color: "green",
        });
        userForm.reset();
        router.replace(baseUrl);
        signOut();
      }
    } catch (error) {
      notifications.show({
        title: "Update",
        message: "Update Failed",
        color: "red",
      });
      console.log({ error });
    }
  });

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
  const avatarColor =
    colors[userForm.values.name.charCodeAt(0) % colors.length];

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          flex: 1,
          padding: isMobile ? "40px 16px" : "80px",
          backgroundImage: `url(${process.env.NEXT_PUBLIC_DASH_2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Flex direction="column" gap={30} w={isMobile ? "100%" : "70%"}>
          <Paper shadow="xl" radius="md" withBorder p={isMobile ? "md" : "xl"}>
            <Flex direction="column" gap={30}>
              {/* Profile Header */}
              <Flex
                gap="md"
                align={isMobile ? "center" : "center"}
                justify="space-between"
                direction={isMobile ? "column" : "row"}
              >
                <Group justify={isMobile ? "center" : "flex-start"}>
                  <Avatar
                    size={isMobile ? 60 : 80}
                    name={session?.data?.user?.name || ""}
                    radius="50%"
                    color={avatarColor}
                    fw={600}
                  />

                  <Box ta={isMobile ? "center" : "left"}>
                    <Text fw={700} size="lg">
                      {session?.data?.user?.name || ""}
                    </Text>
                    <Text c="dimmed" size="sm" mt={2}>
                      {session?.data?.user?.email || ""}
                    </Text>
                  </Box>
                </Group>

                <Button
                  onClick={() => router.push(`?action=edit`)}
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
                  <Text>{session.data?.user?.name || ""}</Text>
                </Box>

                <Box>
                  <Text size="xs" c="dimmed" mb={4}>
                    Email
                  </Text>
                  <Text>{session.data?.user?.email || "-"}</Text>
                </Box>

                {/* <TextInput
                  label="Password"
                  type="password"
                  disabled
                  // value={userForm.values.newPassword}
                  {...userForm.getInputProps("newPassword")}
                /> */}
              </Flex>

              <Divider color="rgb(4, 56, 115)" size="md" />

              {/* Dark Mode Switch */}
              <Flex justify={isMobile ? "center" : "flex-start"}>
                <Switch
                  size="lg"
                  onLabel={<IconSun size={16} />}
                  offLabel={<IconMoon size={16} />}
                  checked={colorScheme === "dark"}
                  onChange={(event) =>
                    setColorScheme(
                      event.currentTarget.checked ? "dark" : "light",
                    )
                  }
                />
              </Flex>
            </Flex>
          </Paper>
        </Flex>
      </Flex>

      <Modal
        opened={action === "edit"}
        onClose={() => router.replace(baseUrl)}
        title="Edit Profile"
        centered
        size={isMobile ? "90%" : 600}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Full Name"
              placeholder="Your Full Name"
              {...userForm.getInputProps("name")}
            />

            <TextInput
              label="Email"
              placeholder="Email"
              {...userForm.getInputProps("email")}
            />

            <TextInput
              label="Current Password"
              placeholder="Enter you New Password"
              type="password"
              {...userForm.getInputProps("currentPassword")}
            />
            <TextInput
              label="New Password"
              placeholder="Enter you New Password"
              type="password"
              {...userForm.getInputProps("newPassword")}
            />

            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              {...userForm.getInputProps("confirmPassword")}
            />

            {/* <Select
              label="Gender"
              placeholder="Select Gender"
              data={genders}
              {...form.getInputProps('gender')}
              required
            /> */}

            <Group mt="md">
              <Button variant="default" onClick={() => router.replace(baseUrl)}>
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
