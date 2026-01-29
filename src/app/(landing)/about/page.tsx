"use client";
import { Container, Divider, Flex, Grid, List, Paper, Stack, Text, Title } from '@mantine/core';

const page = () => {
    return (
        <Flex>
            {/* ABOUT PAGE */}
            <Container size="lg" py="xl">
                {/* Header */}
                <Stack align="center" mb="xl">
                    <Title order={1}>ID Mo, Karera Mo</Title>
                    <Text c="dimmed" ta="center" maw={500}>
                        Your Guide to Government IDs, Your First Step to a Career
                    </Text>
                </Stack>

                <Grid gutter="md">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Paper shadow="sm" radius="md" p="lg">
                            <Title order={3} mb="sm">About the Website</Title>
                            <Text>
                                <strong>ID Mo, Karera Mo</strong> is a centralized web-based guide
                                designed to help fresh graduates and first-time jobseekers in the
                                Philippines navigate the process of acquiring government-issued
                                identification documents.
                            </Text>
                            <Text mt="sm">
                                The website organizes verified information from official
                                government sources into a clear and user-friendly platform.
                            </Text>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Paper shadow="sm" radius="md" p="lg">
                            <Title order={3} mb="sm">Purpose</Title>
                            <List spacing="xs">
                                <List.Item>Simplify government ID application processes</List.Item>
                                <List.Item>Provide clear requirements and procedures</List.Item>
                                <List.Item>Reduce confusion for first-time applicants</List.Item>
                                <List.Item>Support employment preparation</List.Item>
                            </List>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Paper shadow="sm" radius="md" p="lg">
                            <Title order={3} mb="sm">Research Background</Title>
                            <Text>
                                This website is the output of a capstone research project that
                                utilized descriptive and developmental research designs. The study
                                focused on identifying challenges experienced by fresh graduates
                                and translating verified data into a digital solution.
                            </Text>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Paper shadow="sm" radius="md" p="lg">
                            <Title order={3} mb="sm">Target Users</Title>
                            <Text>
                                The primary users of this website are fresh graduates and
                                first-time jobseekers aged 18–25 years old residing in the
                                Philippines.
                            </Text>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Paper shadow="sm" radius="md" p="lg">
                            <Title order={3} mb="sm">Government Agencies Covered</Title>
                            <Text>
                                Information provided on this website is sourced from official
                                government agencies including PSA, BIR, SSS, PhilHealth,
                                Pag-IBIG Fund, NBI, DFA, PHLPost, and LTO.
                            </Text>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Paper shadow="sm" radius="md" p="lg">
                            <Title order={3} mb="sm">Ethical Considerations</Title>
                            <Text>
                                This project strictly follows ethical research practices. Survey
                                participation was voluntary, no personal data are collected or
                                stored, and all information is used solely for academic purposes
                                and sourced from official platforms.
                            </Text>
                        </Paper>
                    </Grid.Col>
                </Grid>

                <Divider my="xl" />

                <Text ta="center" size="sm" c="dimmed">
                    © 2026 ID Mo, Karera Mo | Capstone Research Project
                </Text>
            </Container>
        </Flex>
    )
}

export default page