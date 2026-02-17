"use client";
import DocumentCard from '@/componets/DocomentCard/DocumentCard';
import Footer from '@/componets/Footer/Footer';
import IDsCard from '@/componets/IDsCard/IDsCard';
import { govRequirements, IGovRequirements } from '@/componets/UserNav/govenmentIds';
import { Carousel } from '@mantine/carousel';
import { Box, Button, Container, Divider, Flex, Grid, Group, List, Paper, Stack, Stepper, Text, Title, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconNumber1 } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { chunk } from 'lodash';
import Image from 'next/image';
import { useRef } from 'react';

const page = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const autoplay = useRef(Autoplay({ delay: 3000 }));

    const data: IGovRequirements[] = govRequirements;

    const aboutStep = [
        {
            logo: `${process.env.NEXT_PUBLIC_STEP_1}`,
            desc: 'Know which government IDs you need'
        },
        {
            logo: `${process.env.NEXT_PUBLIC_STEP_2}`,
            desc: 'Understand required documents'
        },
        {
            logo: `${process.env.NEXT_PUBLIC_STEP_3}`,
            desc: 'Find the right websites'
        },
        {
            logo: `${process.env.NEXT_PUBLIC_STEP_4}`,
            desc: 'Track the progress'
        }
    ]

    const steps = [
        'Overview of RA 11261 and eligible users',
        'Covered government IDs and documents',
        'Required supporting documents, e.g., Barangay Certification',
        'Official government websites for accurate information',
    ];


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
                        <Title c={'#4F9CF9'} ta={'center'}>
                            ID Mo, Karera Mo is a web-based guide and tracking
                            platform created to help first-time jobseekers prepare their
                            government ID requirements for employment.</Title>

                        <Text c={'#0A58BD'} ta={'center'}>
                            Applying for government IDs can be confusing when information is scattered, and steps are unclear.
                            This platform brings everything together in one place to make the process easier to understand and manage.
                        </Text>
                    </Flex>



                </Flex>

                {/* 2nd Section */}
                <Flex
                    direction="column"
                    gap={isMobile ? 40 : 80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '40px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        gap={isMobile ? 30 : 40}
                        align="center"
                        justify="center"
                        direction="column"
                        style={{ flex: 1 }}
                    >
                        <Title
                            c="#043873"
                            style={{
                                lineHeight: 1.15,
                                fontSize: isMobile ? 32 : 48,
                                textAlign: 'center',
                            }}
                        >
                            What We Help With
                        </Title>

                        <Flex
                            justify="center"
                            gap={isMobile ? 20 : 40}
                            wrap="wrap"
                        >
                            {aboutStep?.map((a, index) => (
                                <Flex
                                    key={index}
                                    direction="column"
                                    gap={10}
                                    align="center"
                                    style={{
                                        width: isMobile ? '140px' : '200px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Image
                                        alt={a.desc}
                                        src={`${a.logo}`}
                                        height={isMobile ? 40 : 80}
                                        width={isMobile ? 40 : 80}
                                    />

                                    <Text c="#4F9CF9" size={isMobile ? 'sm' : 'md'} ta={'center'}>
                                        {a.desc}
                                    </Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>

                {/* 3rd Section */}
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
                        }}
                            ta={'center'}>
                            First-Time Jobseeker Support
                        </Title>


                        <Text c={'#0A58BD'} ta={'center'}>
                            ID Mo, Karera Mo supports RA 11261 by promoting awareness and understanding of
                            the law among first-time jobseekers and fresh graduates. Many eligible individuals
                            remain unaware of the benefits provided by the Act, which often results in unnecessary
                            expenses during the job application process. Through this platform, users are guided on:
                        </Text>



                        <Box w="100%" mx="auto" p={'20px 90px'}>
                            <Stepper
                                active={0}
                                orientation="horizontal"
                                iconSize={36}
                                w="100%"
                                styles={{
                                    steps: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                        gap: 16, // spacing between steps
                                        justifyItems: 'center', // center each step in its grid cell
                                    },

                                    step: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    },

                                    stepIcon: {
                                        backgroundColor: '#0986FF',
                                        color: '#FFFFFF',
                                    },

                                    stepLabel: {
                                        marginTop: 8,
                                        minHeight: 56,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 8px',
                                    },

                                    separator: {
                                        display: 'none', // hide line separators for grid
                                    },
                                }}
                            >
                                {steps.map((label, index) => (
                                    <Stepper.Step
                                        key={index}
                                        label={
                                            <Tooltip label={label} multiline w={220}>
                                                <Text
                                                    lineClamp={2}
                                                    size="sm"
                                                    c="#4F9CF9"
                                                    ta="center"
                                                >
                                                    {label}
                                                </Text>
                                            </Tooltip>
                                        }
                                    />
                                ))}
                            </Stepper>
                        </Box>

                    </Flex>
                </Flex>

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
                <Flex
                    direction={"column"}
                    // bg={"#E6F1FE"}
                    gap={20}
                    style={{
                        // flex: 1,
                        padding: isMobile ? "60px 20px" : "100px",
                    }}
                >
                    <Title
                        // c="#043873"
                        ta={"center"}
                        style={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                            color: "#043873",
                        }}
                    >
                        Documents Covered Under
                        <br />
                        RA 11261
                    </Title>

                    <Flex align={'center'} justify={'center'}>
                        <Image
                            alt='saadds'
                            src={`${process.env.NEXT_PUBLIC_UMID_CARD_3}`}
                            height={isMobile ? 60 : 90}
                            width={isMobile ? 60 : 90}
                            style={{
                                // flex: 1,
                                //   width: "100%",
                                //   height: isMobile ? 220 : 340,
                                // background: "linear-gradient(135deg, #f1f3f5, #e9ecef)",
                                // borderRadius: 16,
                                // display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                                color: "#868e96",
                            }}
                        />
                    </Flex>


                    <Flex wrap="wrap" gap="md" pb={20} justify={'center'} align={'center'}>
                        {data.map((v, index) => (
                            <Flex
                                align={'center'}
                                justify={'center'}
                                key={index}
                                flex="0 0 calc(33.333% - var(--mantine-spacing-md))"
                            >
                                <DocumentCard img={v.logo} title={v.title} />
                            </Flex>
                        ))}
                    </Flex>

                    <Flex direction={'column'} gap={10} >
                        <Text ta={'center'} fz={'20px'} style={{ color: '#4F9CF9' }}>
                            View full information and other Government requirements covered by RA 11261
                        </Text>

                        <Flex direction={'row'} justify={'center'} align={'center'}>
                            <Button
                                style={{ backgroundColor: '#0A58BD', color: '#FFFF' }}
                                component="a"
                                href="https://issuances-library.senate.gov.ph/sites/default/files/2021-08/RA%2011261%20IRR.pdf"
                                download="https://issuances-library.senate.gov.ph/sites/default/files/2021-08/RA%2011261%20IRR.pdf"
                            >
                                Download PDF
                            </Button>
                        </Flex>
                    </Flex>



                </Flex>

                {/* 6th Section */}
                <Flex
                    direction="column"
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '50px 100px',
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
                        <Text c={'#FFFFFF'} ta={'center'}>ID Mo Karera Mo is an independent website created by student developers to help first-time job seekers organize and monitor their employment requirements. The platform functions solely as a reference and tracking tool. It is not affiliated with any government agency. All official applications, registrations, and certifications must be
                            processed directly through the appropriate government offices and their authorized websites.</Text>
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