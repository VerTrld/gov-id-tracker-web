"use client";

import { ContactCardGrid } from "@/componets/ContactCard/ContactCard";
import {
    Button,
    Flex,
    Title,
    Text,
    Card,
    Group,
    Stack,
    Menu,
    Avatar,
    Paper,
    Grid,
    Loader,
    Center,
} from "@mantine/core";
import {
    IconLogout,
    IconUsers,
    IconUserPlus,
    IconSettings,
    IconChevronDown,
    IconRefresh,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string | null>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["getUser"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/userAccount/users/list`
            );
            return res.data?.data;
        },
    });

    const filteredData = data?.filter((user: any) => {
        const matchesSearch = searchQuery
            ? user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesFilter = filterStatus ? user.status === filterStatus : true;
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <Flex direction="column" style={{ backgroundColor: "#f8f9fa" }} flex={1}>
                {/* Header */}
                <Flex
                    align="center"
                    justify="space-between"
                    px="xl"
                    py="sm"
                    style={{
                        height: 70,
                        backgroundColor: "white",
                        borderBottom: "1px solid #e9ecef",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                    }}
                // flex={1}
                >
                    <Group gap="xs" style={{ display: 'flex', flex: 1 }}>
                        <Title order={3} style={{ color: "#2d4b81" }}>
                            Admin Dashboard
                        </Title>
                    </Group>

                    <Group gap="md">
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Button
                                    variant="light"
                                    color="#2d4b81"
                                    rightSection={<IconChevronDown size={16} />}
                                    style={{ backgroundColor: "white", border: "1px solid #e9ecef" }}
                                >
                                    <Group gap="xs">
                                        <Avatar color="#2d4b81" size="sm" radius="xl">A</Avatar>
                                        <Text size="sm" fw={500}>Admin</Text>
                                    </Group>
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Account</Menu.Label>
                                <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                                <Menu.Divider />
                                <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={() => signOut()}>
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Flex>

                {/* Main Content */}
                <Flex flex={1} p={30} style={{ height: "75vh", }}>
                    <Flex gap="lg" flex={1} direction={'column'}>
                        {/* Page Header */}
                        <Paper
                            p="xl"
                            radius="md"
                            style={{
                                background: "linear-gradient(135deg, #2d4b81 0%, #3d5b91 100%)",
                            }}
                        >
                            <Stack gap="xs">
                                <Title order={2} style={{ color: "white" }}>
                                    User Management
                                </Title>
                                <Text style={{ color: "white", opacity: 0.9 }}>
                                    Manage and monitor all users in your system
                                </Text>
                            </Stack>
                        </Paper>

                        {/* Stats Cards */}
                        <Grid>
                            {/* Total Users */}
                            <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
                                <Card shadow="xs" padding="lg" radius="md">

                                    <Stack gap={4}>
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                            Total Users
                                        </Text>
                                        <Text size="xl" fw={700} style={{ color: "#2d4b81" }}>
                                            {data?.length || 0}
                                        </Text>
                                    </Stack>

                                </Card>
                            </Grid.Col>

                            {/* <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
                            <Card shadow="xs" padding="lg" radius="md">

                                <Stack gap={4}>
                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                        Active Users
                                    </Text>
                                    <Text size="xl" fw={700} style={{ color: "#2d4b81" }}>
                                        {data?.filter((u: any) => u.status === "active")?.length || 0}
                                    </Text>
                                </Stack>

                            </Card>
                        </Grid.Col> */}
                            {/* Filters and Actions */}
                            <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
                                <Card shadow="xs" padding="lg" radius="md">
                                    <Stack gap={4}>
                                        <Flex justify="space-between">
                                            <Text size="lg" fw={600} style={{ color: "#2d4b81", alignSelf: 'center' }}>
                                                Users List
                                            </Text>
                                            <Group gap="xs">
                                                <Button variant="light" color="#2d4b81" leftSection={<IconRefresh size={16} />} onClick={() => refetch()}>
                                                    Refresh
                                                </Button>
                                                <Button variant="filled" color="#2d4b81" leftSection={<IconUserPlus size={16} />}>
                                                    Add User
                                                </Button>
                                            </Group>
                                        </Flex>
                                    </Stack>
                                </Card>

                            </Grid.Col>
                        </Grid>



                        {/* Users Grid */}
                        {isLoading ? (
                            <Center py="xl">
                                <Loader color="#2d4b81" size="lg" />
                            </Center>
                        ) : filteredData && filteredData.length > 0 ? (
                            <ContactCardGrid contacts={filteredData} />
                        ) : (
                            <Card shadow="xs" padding="xl" radius="md">
                                <Center>
                                    <Stack align="center" gap="xs">
                                        <IconUsers size={48} color="#2d4b81" style={{ opacity: 0.3 }} />
                                        <Text c="dimmed" size="lg">
                                            No users found
                                        </Text>
                                        <Text c="dimmed" size="sm">
                                            Try adjusting your search or filters
                                        </Text>
                                    </Stack>
                                </Center>
                            </Card>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
