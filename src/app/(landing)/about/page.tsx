"use client";
import Footer from '@/componets/Footer/Footer';
import { Container, Divider, Flex, Grid, Group, List, Paper, Stack, Text, Title } from '@mantine/core';
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

                {/* 3rd Section */}

                {/* 4th Section */}
                <Flex direction={'column'} bg={'#E6F1FE'} gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '100px',
                    }}>

                    <Flex
                        direction={'column'}
                        gap={isMobile ? 40 : 80}

                    >
                        <Flex
                            gap={40}
                            align="center"
                            justify="space-between"
                            direction={'column'}
                            style={{ flex: 1 }}
                        >
                            <Title c={'#043873'} style={{
                                lineHeight: 1.15,
                                fontSize: isMobile ? 32 : 48,
                                textAlign: 'center'
                            }}>
                                First-Time Jobseekers Assistance Act (RA 11261)
                            </Title>
                            <Text c={'#4F9CF9'} ta={'center'}>
                                The First-Time Jobseekers Assistance Act (Republic Act No. 11261) is a Philippine law enacted to support individuals who are applying for
                                {/* <br /> */}
                                employment for the first time. Its primary goal is to reduce the financial burden faced by first-time jobseekers by waiving fees for selected
                                {/* <br /> */}
                                government documents that are commonly required during job applications.
                            </Text>

                            <Text c={'#4F9CF9'} ta={'center'}>
                                Under RA 11261, qualified first-time jobseekers may avail of the free issuance of employment-related government documents, subject to
                                {/* <br /> */}
                                the rules and guidelines of the issuing agencies. To qualify for these benefits, applicants are required to present a Barangay Certification
                                {/* <br /> */}
                                confirming their status as a first-time jobseeker:

                            </Text>
                        </Flex>
                    </Flex>



                </Flex>

                {/* 5th Section */}

                {/* 6th Section */}
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
                        gap={40}
                        align="center"
                        justify="space-between"
                        direction={'column'}
                        style={{ flex: 1 }}



                    >
                        <Title c={'#043873'} style={{
                            // fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                            // marginBottom: 20,
                        }}>Disclaimer
                        </Title>
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