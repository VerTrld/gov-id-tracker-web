"use client";
import Footer from '@/componets/Footer/Footer';
import IDsCard from '@/componets/IDsCard/IDsCard';
import { govRequirements, IGovRequirements } from '@/componets/UserNav/govenmentIds';
import { Carousel } from '@mantine/carousel';
import { Box, Container, Divider, Flex, Grid, Group, List, Paper, Stack, Stepper, Text, Title, Tooltip } from '@mantine/core';
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
    const chunkedData = chunk(data, 4);


    const aboutStep = [
        {
            logo: '',
            desc: 'Know which government IDs you need'
        },
        {
            logo: '',
            desc: 'Understand required documents'
        },
        {
            logo: '',
            desc: 'Find the right websites'
        },
        {
            logo: '',
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
                                        src={`${process.env.NEXT_PUBLIC_NATIONAL_ID}`}
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
                    gap={50}
                    style={{
                        flex: 1,
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
                    <Carousel
                        slideSize="100%" // full width
                        slideGap={0} // no gap between slides
                        loop
                        align="start"
                        withIndicators
                        flex={1}
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                    // style={{ border: "1px solid black" }}
                    >
                        {/* First Slide: Full-screen Hero */}
                        {chunkedData.map((slideItems, slideIndex) => (
                            <Carousel.Slide key={slideIndex}>
                                <Flex
                                    direction="column"
                                    style={{
                                        flex: 1,
                                        height: isMobile ? '100vh' : '50vh',
                                    }}
                                >
                                    <Flex
                                        style={{
                                            flex: 1,
                                            padding: isMobile ? '40px 10px' : '80px',
                                            flexDirection: isMobile ? 'column' : 'row',
                                            flexWrap: isMobile ? 'nowrap' : 'wrap',
                                        }}
                                        gap={isMobile ? 10 : 20}
                                        justify={isMobile ? 'center' : 'space-evenly'}
                                        align={isMobile ? 'center' : 'stretch'}
                                    >
                                        {slideItems.map((v, index) => (
                                            <IDsCard
                                                // color='#D9EAFE'
                                                key={index} // stable key\
                                                logo={v.logo || ''}
                                                title={v.title}
                                            // desc={v.description}
                                            />
                                        ))}
                                    </Flex>
                                </Flex>
                            </Carousel.Slide>
                        ))}


                    </Carousel>
                </Flex>

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