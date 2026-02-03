"use client";
import Footer from '@/componets/Footer/Footer';
import { Container, Divider, Flex, Grid, List, Paper, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const page = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <>
            <Flex
                direction={"column"}
                flex={1}
                style={{ zIndex: -1 }}
            >

                {/* 1st Section */}
                <Flex
                    direction="column"
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '100px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        gap={isMobile ? 40 : 60}
                        align="center"
                        justify="space-between"
                        direction={'column'}
                        style={{ flex: 1 }}


                    >
                        <Title c={'#043873'} style={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                            marginBottom: 20,
                        }}>About</Title>
                        <Title c={'#4F9CF9'} ta={'center'}>ID Mo, Karera Mo is a web-based guide and tracking
                            <br />
                            platform created to help first-time jobseekers prepare their
                            <br />
                            government ID requirements for employment.</Title>

                        <Text c={'#0A58BD'} ta={'center'}>Applying for government IDs can be confusing when information is scattered, and steps are unclear.
                            <br />
                            This platform brings everything together in one place to make the process easier to understand and manage.
                        </Text>
                    </Flex>

                </Flex>


                {/* 2nd Section */}
                <Flex direction={'column'} bg={'#E6F1FE'} gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '100px',
                    }}>

                </Flex>


                {/* 3rd Section */}
                <Flex
                    direction="column"
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '100px',
                    }}
                    bg={'#A7CEFC'}
                >
                    {/* Hero */}
                    <Flex
                        gap={isMobile ? 40 : 60}
                        align="center"
                        justify="space-between"
                        direction={'column'}
                        style={{ flex: 1 }}



                    >
                        <Title c={'#043873'} style={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                            marginBottom: 20,
                        }}>Disclaimer</Title>
                        <Text c={'#FFFFFF'} ta={'center'}>ID Mo, Karera Mo is an independent platform created by student developers. The developers and
                            <br />
                            owners of this website are not affiliated with any government agency. All applications and
                            <br />
                            certifications are completed through official government offices and websites.</Text>
                    </Flex>

                </Flex>


                {/* Footer */}
                <Flex flex={1}>
                    <Footer />
                </Flex>

            </Flex>
        </>
    )
}

export default page