"use client";
import Footer from '@/componets/Footer/Footer';
import { Accordion, Flex, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { data } from './data';
import { IconPointFilled } from '@tabler/icons-react';


const page = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const items = data.map((item) => (
        <Accordion.Item key={item.value} value={item.value} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Accordion.Control icon={item.emoji} style={{}}> <Text c={'#0A58BD'}> {item.value}</Text> </Accordion.Control>
            {item.description.map((v, index) => {
                return (
                    <Accordion.Panel key={index}> <Flex align={'center'} gap={10}><IconPointFilled size={15} /> <Text ta={'center'}>{v}</Text></Flex></Accordion.Panel>
                )

            })}

        </Accordion.Item>
    ));
    return (
        <>
            <Flex direction={"column"}
                flex={1}
                style={{ zIndex: -1 }}>


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
                        gap={isMobile ? 40 : 20}
                        align="center"
                        // justify="space-between"
                        direction={'column'}
                        style={{ flex: 1 }}


                    >
                        <Title c={'#043873'} style={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                            // marginBottom: 20,
                        }}>Features
                        </Title>

                        <Text c={'#0A58BD'} ta={'center'}>
                            ID Mo, Karera Mo simplifies government ID and document preparation so first-time
                            <br />
                            jobseekers can focus on getting hired, not getting lost in requirements.
                        </Text>
                    </Flex>



                </Flex>

                {/* 2nd Section */}
                <Flex
                    direction="column"
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '60px 100px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        gap={40}
                        align="center"
                        direction={'column'}
                        style={{ flex: 1 }}
                    >
                        <Flex direction={'column'} flex={1} w={'100%'} style={{
                            borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                        >
                            <Accordion style={{ flex: 1, }}>
                                {items}
                            </Accordion>
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
                        }}>Disclaimer</Title>
                        <Text c={'#FFFFFF'} ta={'center'}>ID Mo, Karera Mo is an independent platform created by student developers. The developers and
                            <br />
                            owners of this website are not affiliated with any government agency. All applications and
                            <br />
                            certifications are completed through official government offices and websites.</Text>
                    </Flex>

                </Flex>

                <Flex flex={1}>
                    <Footer />
                </Flex>

            </Flex>
        </>
    )
}

export default page
