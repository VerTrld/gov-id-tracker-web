"use client";

import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Footer from "@/componets/Footer/Footer";
import { useRouter } from "next/navigation";


export default function Login() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const router = useRouter();


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
                        direction={isMobile ? 'column' : 'row'}
                        style={{ flex: 1 }}
                    >
                        {/* Left Content */}
                        <Box
                            style={{
                                flex: 1,
                                textAlign: isMobile ? 'center' : 'left',
                            }}
                        >
                            <Title
                                order={1}
                                style={{
                                    fontWeight: 900,
                                    lineHeight: 1.15,
                                    fontSize: isMobile ? 32 : 48,
                                    marginBottom: 20,
                                    // color: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                                }}
                                
                            >
                                Your One-Stop Guide to
                                <br />
                                Government IDs for
                                <br />
                                <span >
                                    First-Time Jobseekers
                                </span>
                            </Title>

                            <Text
                                size={isMobile ? 'md' : 'lg'}
                                c="dimmed"
                                style={{
                                    maxWidth: 520,
                                    margin: isMobile
                                        ? '0 auto 28px'
                                        : '0 0 36px',
                                }}
                            >
                                Understand what documents you need, track your progress,
                                and prepare for employment with confidence.
                            </Text>

                            <Flex
                                gap="md"
                                justify={isMobile ? 'center' : 'flex-start'}
                                wrap="wrap"
                            >
                                <Button size="md" radius="md" onClick={() => router.push("?action=register")}>
                                    <Flex gap={10}>
                                        <Text>Sign Up</Text>
                                        <IconArrowNarrowRight />
                                    </Flex>
                                </Button>

                            </Flex>
                        </Box>

                        {/* Right Visual */}
                        <Box
                            style={{
                                flex: 1,
                                width: '100%',
                                height: isMobile ? 220 : 340,
                                background:
                                    'linear-gradient(135deg, #f1f3f5, #e9ecef)',
                                borderRadius: 16,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                color: '#868e96',
                            }}
                        >
                            Image / Illustration
                        </Box>
                    </Flex>

                    {/* Info Section */}
                    <Flex align="center" direction="column" gap={50}>
                        <Title
                            c="#043873"
                            ta={'center'}
                            style={{
                                fontWeight: 900,
                                lineHeight: 1.15,
                                fontSize: isMobile ? 32 : 48,
                            }}
                        >
                            What ID Mo, Karera Mo Does
                        </Title>

                        <Text
                            ta="center"
                            c="#0A58BD"
                            style={{ maxWidth: 700 }}
                        >
                            ID Mo, Karera Mo helps first-time jobseekers organize and track
                            the government IDs needed for employment. We guide you
                            through the process and connect you to official government
                            websites for application.
                        </Text>

                        <Button>How it Works</Button>
                    </Flex>
                </Flex>


                {/* 2nd Section */}
                <Flex direction={'column'} bg={'#E6F1FE'} gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '100px',
                    }}>
                    <Title c="#043873"
                        ta={'center'}
                        style={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                        }}>Commonly  Required Government IDs</Title>
                    <Carousel
                        slideSize="100%"       // full width
                        slideGap={0}           // no gap between slides
                        loop
                        align="start"
                        withIndicators
                        flex={1}
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                        style={{ border: '1px solid black' }}
                    >
                        {/* First Slide: Full-screen Hero */}
                        <Carousel.Slide>
                            <Flex
                                direction="column"
                                style={{
                                    flex: 1,
                                    height: '50vh', // Full screen
                                    // background: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                                }}
                            >
                                111111111111111111111111
                            </Flex>
                        </Carousel.Slide>

                        {/* Second Slide: Full screen */}
                        <Carousel.Slide>
                            <Flex
                                style={{
                                    flex: 1,
                                    // background: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                                    height: '50vh',
                                }}
                            >
                                22222222222222
                                {/* <Flex
                                style={{
                                    flex: 1,
                                    padding: isMobile ? '60px 20px' : '100px',
                                }}
                            >
                                <Flex
                                    gap={isMobile ? 40 : 60}
                                    align="center"
                                    direction={isMobile ? 'column' : 'row'}
                                    style={{ backgroundColor: '#ccc', borderRadius: 10, flex: 1 }}
                                >
                                    <Flex
                                        justify={'space-evenly'}
                                        direction={'column'}
                                        style={{
                                            padding: isMobile ? 24 : 48,
                                            textAlign: 'center',
                                            flex: 1

                                        }}
                                    >
                                        <Title
                                            order={2}
                                            style={{
                                                fontWeight: 700,
                                                marginBottom: isMobile ? 16 : 24,
                                                fontSize: isMobile ? 24 : 32,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            Your One-Stop Guide to Government IDs for First-Time Jobseekers
                                        </Title>

                                        <Text
                                            size={isMobile ? 'sm' : 'md'}
                                            color="black"
                                            style={{ marginBottom: isMobile ? 20 : 32 }}
                                        >
                                            Designed to help first-time jobseekers understand ID requirements, access official
                                            government websites, track and complete government ID applications with ease.
                                        </Text>

                                        <Flex justify="center" gap={12} wrap="wrap">
                                            <Button size={isMobile ? 'sm' : 'md'}>Button</Button>
                                            <Button size={isMobile ? 'sm' : 'md'} variant="outline">
                                                Learn more
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex> */}

                            </Flex>
                        </Carousel.Slide>
                    </Carousel>
                </Flex>


                {/* 3rd Section */}
                <Flex
                    gap={isMobile ? 40 : 60}
                    align="center"
                    justify="space-between"
                    direction={isMobile ? 'column' : 'row'}
                    style={{ flex: 1, padding: isMobile ? '60px 20px' : '100px', }}
                >
                    {/* Left Visual */}
                    <Box
                        style={{
                            flex: 1,
                            width: '100%',
                            height: isMobile ? 220 : 340,
                            background: 'linear-gradient(135deg, #f1f3f5, #e9ecef)',
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            color: '#868e96',
                        }}
                    >
                        Image / Illustration
                    </Box>

                    {/* Right Content */}
                    <Box
                        style={{
                            flex: 1,
                            textAlign: isMobile ? 'center' : 'left',
                        }}
                    >
                        <Title
                            order={1}
                            style={{
                                fontWeight: 900,
                                lineHeight: 1.15,
                                fontSize: isMobile ? 32 : 48,
                                marginBottom: 20,
                                color: '#043873'
                            }}
                        >
                            First Time Jobseekers
                            <br />
                            Assistance Act
                        </Title>

                        <Text
                            size={isMobile ? 'md' : 'lg'}
                            c="dimmed"
                            style={{
                                maxWidth: 520,
                                margin: isMobile ? '0 auto 28px' : '0 0 36px',
                            }}
                        >
                            Qualified first time jobseekers may use a First Time Jobseeker Certification from their Barangay to request free copies of certain employment-related documents under RA 11261.
                        </Text>

                        <Text
                            size={isMobile ? 'md' : 'lg'}
                            c="dimmed"
                            style={{
                                maxWidth: 520,
                                margin: isMobile ? '0 auto 28px' : '0 0 36px',
                            }}
                        >
                            ID Mo, Karera Mo helps you understand how this certificate works and how to use it properly.
                        </Text>

                        <Flex
                            gap="md"
                            justify={isMobile ? 'center' : 'flex-start'}
                            wrap="wrap"
                        >
                            <Button size="md" radius="md" onClick={() => router.push("/about")}>
                                <Flex gap={10}>
                                    <Text>Learn About the Certificate </Text>
                                    <IconArrowNarrowRight />
                                </Flex>
                            </Button>

                        </Flex>
                    </Box>
                </Flex>


                {/* Footer */}
                <Flex flex={1}>
                    <Footer />
                </Flex>

            </Flex>
        </>

    );
}
