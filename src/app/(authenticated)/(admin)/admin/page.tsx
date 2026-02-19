"use client";

import { ContactCardGrid } from "@/componets/ContactCard/ContactCard";
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal";
import { LoginType } from "@/enum/dashboard.enum";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { del, get, post } from "@/utils/http-api";
import { ActionIcon, Avatar, Button, Card, Center, Flex, Group, Loader, Menu, Paper, ScrollArea, Stack, Tabs, Text, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconChevronDown, IconLogout, IconRefresh, IconSettings, IconTrash, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// --- ID types ---
import { GovernmentIdModal } from "@/componets/GovernmentIdModal/GovernmentIdModal";
import { IdTypes } from "@/entities/IdTypes";
import { IUserAccount } from "@/entities/IUserAccount";
import IGovernmentIdsForm, { governmentIdsFormSchema } from "@/schema/GovIds";
import { openConfirmModal } from "@mantine/modals";

export default function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const router = useRouter();
    const params = useSearchParams();
    const action = params.get("action");

    const queryClient = useQueryClient();

    // ---------------- USER QUERY ----------------
    const { data: users, isLoading: usersLoading, refetch: refetchUsers } = useQuery({
        queryKey: ["user-accounts"],
        queryFn: async () => {
            const res = await get(`/user-account/users/list`);
            return (res.data.data || []) as IUserAccount[];
        },
    });

    // const filteredUsers = users?.filter((user: any) => {
    //     const matchesSearch = searchQuery
    //         ? user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    //         : true;
    //     const matchesFilter = filterStatus ? user.status === filterStatus : true;
    //     return matchesSearch && matchesFilter;
    // });


    // ---------------- GOVERNMENT IDS QUERY ----------------
    const { data: idTypes, isLoading: idsLoading, refetch: refetchIds } = useQuery({
        queryKey: ["id-types"],
        queryFn: async () => {
            const res = await get(`/id-types/read/all`);
            return res.data || [];
        },
    });

    // ---------------- USER FORM ----------------
    const registerForm = useForm<IPersonShcema>({
        validate: yupResolver(PersonSchema),
        initialValues: {
            action: "register",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isTerms: true,
        },
        mode: "controlled",
        name: "register",
    });

    const handleDeleteIdTypes = (idType: IdTypes) => {
        openConfirmModal({
            centered: true,
            title: `Confirming will delete Id Type: ${idType.label}`,
            labels: {
                cancel: "Cancel",
                confirm: 'Confirm'
            },
            onConfirm: async () => {
                try {
                    const res = await del(`/id-types/delete/${idType.id}`)

                    if (res.status === 200 || res.status === 201) {
                        notifications.show({
                            title: "Deletion Successful",
                            message: `${idType.label} has been deleted!`,
                            color: 'green'
                        })
                        refetchIds()
                    }
                } catch (error) {
                    console.log({ error })
                }
            },
            // confirmProps
        })
    }




    const handleRegister = registerForm.onSubmit(async () => {
        try {
            const res = await post(`/user-account/create/one`, {
                name: `${registerForm.values.firstName} ${registerForm.values.lastName}`,
                email: registerForm.values.email,
                password: registerForm.values.password,
            });

            if (res.status === 200 || res.status === 201) {
                notifications.show({
                    title: "Registration Successful",
                    message: "Your account has been created! You can now log in.",
                    color: "green",
                });
                refetchUsers();
                registerForm.reset();
                router.push("/admin");
            } else {
                notifications.show({
                    title: "Registration Failed",
                    message: "Something went wrong. Please try again.",
                    color: "red",
                });
                console.error("Unexpected response:", res);
            }
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Registration failed. Please try again later.",
                color: "red",
            });
            console.error("Registration error:", error);
        }
    });

    const govIdForm = useForm<IGovernmentIdsForm>({
        validate: yupResolver(governmentIdsFormSchema),
        initialValues: {
            label: "",
            code: "",
            officialUrls: "",
            description: "",
            requirementIds: [{ label: "" }],
            file: null,
        },
    });


    const handleIds = govIdForm.onSubmit(async () => {
        let formData = new FormData();
        formData.append("label", govIdForm.values.label);
        formData.append("code", govIdForm.values.code);
        [govIdForm.values.officialUrls].forEach((url, index) => {
            formData.append(`officialUrls[${index}]`, url);
        });
        formData.append("description", govIdForm.values.description || '');
        govIdForm.values.requirementIds?.forEach((r, index) => {
            formData.append(`requirementIds[${index}][id]`, r.id || "");
            formData.append(`requirementIds[${index}][label]`, r.label || "");
        });
        formData.append("file", govIdForm.values.file || '');
        try {
            const res = await post(`/id-types/create/one`,
                formData
            );

            if (res.status === 200 || res.status === 201) {
                notifications.show({
                    title: "Government ID Created",
                    message: "The Government ID has been successfully created.",
                    color: "green",
                });

                // Reset form and refresh query
                refetchIds();
                govIdForm.reset();
                queryClient.invalidateQueries({ queryKey: ["governmentIds"] });

                // Optional redirect if you want
                router.push("/admin");
            } else {
                notifications.show({
                    title: "Creation Failed",
                    message: "Something went wrong. Please try again.",
                    color: "red",
                });
                console.error("Unexpected response:", res);
            }
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "Failed to create Government ID. Please try again later.",
                color: "red",
            });
            console.error("Creation error:", error);
        }
    });


    return (
        <>
            <RegisterUserModal
                opened={action === LoginType.ADMIN_REGISTER}
                onClose={() => {
                    router.replace("/admin");
                    registerForm.reset();
                }}
                form={registerForm}
                onSubmit={() => handleRegister()}
            />

            <GovernmentIdModal
                opened={action === LoginType.CREATE_ID}
                onClose={() => {
                    router.replace("/admin");
                    govIdForm.reset();
                }}
                form={govIdForm}
                onSubmit={() => handleIds()}
            />

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
                >
                    <Group gap="xs" style={{ flex: 1 }}>
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
                                        <Avatar color="#2d4b81" size="sm" radius="xl">
                                            A
                                        </Avatar>
                                        <Text size="sm" fw={500}>
                                            Admin
                                        </Text>
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
                <Flex flex={1} p={30} direction="column">
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
                                User & IDs Management
                            </Title>
                            <Text style={{ color: "white", opacity: 0.9 }}>
                                Manage users and government IDs from one dashboard
                            </Text>
                        </Stack>
                    </Paper>

                    {/* Tabs for Users / IDs */}
                    <Tabs defaultValue="users" mt="md">
                        <Tabs.List>
                            <Tabs.Tab value="users">Users</Tabs.Tab>
                            <Tabs.Tab value="ids">Government IDs</Tabs.Tab>
                        </Tabs.List>

                        {/* --- USERS TAB --- */}
                        <Tabs.Panel value="users" pt="md">
                            <Flex justify="space-between" mb="md">
                                <Text size="lg" fw={600} style={{ color: "#2d4b81" }}>
                                    Users List
                                </Text>
                                <Group>
                                    <Button variant="light" color="#2d4b81" leftSection={<IconRefresh size={16} />} onClick={() => refetchUsers()}>
                                        Refresh
                                    </Button>
                                    <Button
                                        variant="filled"
                                        color="#2d4b81"
                                        leftSection={<IconUserPlus size={16} />}
                                        onClick={() => router.replace("/admin?action=admin_register")}
                                    >
                                        Add User
                                    </Button>
                                </Group>
                            </Flex>

                            {usersLoading ? (
                                <Center py="xl">
                                    <Loader color="#2d4b81" size="lg" />
                                </Center>
                            ) : users?.length ? (
                                <ContactCardGrid contacts={users.map(u => {
                                    return {
                                        user: u,
                                        onClick: () => { }
                                    }
                                })} />
                            ) : (
                                <Card shadow="xs" padding="xl" radius="md">
                                    <Center>
                                        <Stack align="center" gap="xs">
                                            <IconUsers size={48} color="#2d4b81" style={{ opacity: 0.3 }} />
                                            <Text c="dimmed" size="lg">
                                                No users found
                                            </Text>
                                        </Stack>
                                    </Center>
                                </Card>
                            )}
                        </Tabs.Panel>

                        {/* --- GOVERNMENT IDS TAB --- */}
                        <Tabs.Panel value="ids" pt="md" style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
                            {/* Header */}
                            <Flex justify="space-between" mb="md">
                                <Text size="lg" fw={600} style={{ color: "#2d4b81" }}>
                                    ID List
                                </Text>
                                <Group>
                                    <Button
                                        variant="light"
                                        color="#2d4b81"
                                        leftSection={<IconRefresh size={16} />}
                                        onClick={() => refetchIds()}
                                    >
                                        Refresh
                                    </Button>
                                    <Button
                                        variant="filled"
                                        color="#2d4b81"
                                        leftSection={<IconUserPlus size={16} />}
                                        onClick={() => router.replace("/admin?action=create_id")}
                                    >
                                        Create New Government ID
                                    </Button>
                                </Group>
                            </Flex>

                            {/* List */}
                            {idsLoading ? (
                                <Center py="xl">
                                    <Loader color="#2d4b81" size="lg" />
                                </Center>
                            ) : idTypes?.length ? (
                                <ScrollArea style={{ minHeight: 400, maxHeight: 500 }}>
                                    <Stack gap="sm">
                                        {idTypes.map((id: IdTypes, index: number) => (
                                            <Card key={index} shadow="sm" padding="md" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Flex style={{ flexDirection: 'column' }}>
                                                    <Text fw={600}>{id.label}</Text>
                                                    <Text size="sm" c="dimmed">
                                                        Code: {id.code}
                                                    </Text>
                                                    <Text size="sm" c="dimmed">
                                                        URL: {id.officialUrls?.[0]}
                                                    </Text>
                                                </Flex>
                                                <Flex>
                                                    <ActionIcon variant="light" c={'red'} onClick={() => { handleDeleteIdTypes(id) }}>
                                                        <IconTrash />
                                                    </ActionIcon>
                                                </Flex>
                                            </Card>
                                        ))}
                                    </Stack>
                                </ScrollArea>
                            ) : (
                                <Text>No Government IDs found.</Text>
                            )}
                        </Tabs.Panel>

                    </Tabs>
                </Flex>
            </Flex>
        </>
    );
}
