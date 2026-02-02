"use client";

import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';


export default function Login() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const autoplay = useRef(Autoplay({ delay: 3000 }));


    return (

        <>
            <Flex
                direction={"column"}
                flex={1}
                style={{ zIndex: -1 }}
            >

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
                >
                    {/* First Slide: Full-screen Hero */}
                    <Carousel.Slide>
                        <Flex
                            direction="column"
                            style={{
                                flex: 1,
                                height: '90.8vh', // Full screen
                                background: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                            }}
                        >
                            <Flex
                                style={{
                                    flex: 1,
                                    padding: isMobile ? '60px 20px' : '100px',
                                }}
                            >
                                <Flex
                                    gap={isMobile ? 40 : 60}
                                    align="center"
                                    justify="space-between"
                                    direction={isMobile ? 'column' : 'row'}
                                    style={{ flex: 1 }}
                                >
                                    {/* Left content */}
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
                                            }}
                                        >
                                            Your One-Stop Guide to
                                            <br />
                                            Government IDs for
                                            <br />
                                            <span style={{ color: '#1c7ed6' }}>
                                                First-Time Jobseekers
                                            </span>
                                        </Title>

                                        <Text
                                            size={isMobile ? 'md' : 'lg'}
                                            c="dimmed"
                                            style={{
                                                maxWidth: 520,
                                                margin: isMobile ? '0 auto 28px' : '0 0 36px',
                                            }}
                                        >
                                            Learn what IDs you need, where to apply, and how to complete
                                            government requirements—step by step, all in one place.
                                        </Text>

                                        <Flex
                                            gap="md"
                                            justify={isMobile ? 'center' : 'flex-start'}
                                            wrap="wrap"
                                        >
                                            <Button size="md" radius="md">
                                                Get Started
                                            </Button>

                                            <Button size="md" radius="md" variant="light">
                                                Learn More
                                            </Button>
                                        </Flex>
                                    </Box>

                                    {/* Right visual */}
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
                                </Flex>
                            </Flex>
                        </Flex>
                    </Carousel.Slide>

                    {/* Second Slide: Full screen */}
                    <Carousel.Slide>
                        <Flex
                            style={{
                                flex: 1,
                                background: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                                height: '90.8vh',
                            }}
                        >
                            <Flex
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
                            </Flex>

                        </Flex>
                    </Carousel.Slide>
                </Carousel>


            </Flex>
        </>

    );
}
