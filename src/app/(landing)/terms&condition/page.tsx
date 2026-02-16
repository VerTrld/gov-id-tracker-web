"use client";
import Footer from '@/componets/Footer/Footer';
import { Accordion, Divider, Flex, Paper, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { data } from '../features/data';
import { privacyPolicy, term } from './termsCondition';



const page = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const terms = term.map((t) => (
        <Accordion.Item key={t.value} value={t.value} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Accordion.Control style={{}}>
                <Text c={'#0A58BD'}> {t.value}</Text>
            </Accordion.Control>
            <Accordion.Panel >
                <Text ta={'center'}>{t.description}</Text>
            </Accordion.Panel>
        </Accordion.Item>
    ));

    const policy = privacyPolicy.map((v) => (
        <Accordion.Item key={v.value} value={v.value} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Accordion.Control style={{}}>
                <Text c={'#0A58BD'}> {v.value}</Text>
            </Accordion.Control>
            <Accordion.Panel >
                <Text ta={'center'}>{v.description}</Text>
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <>
            <Flex direction={"column"}
                flex={1}
                style={{ zIndex: -1 }}
            >

                {/* 1st Section */}
                <Flex
                    direction="column"
                    bg={'#E6F1FE'}
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '30px' : '100px 100px 40px 100px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        align="center"
                        direction={'column'}
                        style={{ flex: 1 }}


                    >
                        <Title c={'#043873'}
                            ta={'center'}
                            style={{
                                fontWeight: 900,
                                lineHeight: 1.15,
                                fontSize: isMobile ? 32 : 48,
                                // marginBottom: 20,
                            }}>
                            TERMS AND CONDITIONS
                        </Title>
                        {/* <Divider size="lg" style={{ color: '#043873', zIndex: 2 }}  my="md" /> */}
                    </Flex>
                </Flex>


                {/* 2nd Section */}
                <Flex
                    direction="column"
                    bg={'#E6F1FE'}
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '30px' : '20px 100px 40px 100px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        align="center"
                        direction={'column'}
                        style={{ flex: 1 }}
                    >
                        <Paper
                            shadow="xl"
                            radius="md"
                            withBorder
                            style={{
                                maxWidth: 1000,
                                width: "100%",
                                margin: "auto",
                                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)"
                            }}
                        >
                            <Accordion style={{ flex: 1, }}>
                                {terms}
                            </Accordion>
                        </Paper>

                    </Flex>
                </Flex>

                {/* 3rd Section */}
                <Flex
                    direction="column"
                    bg={'#E6F1FE'}
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '30px' : '20px 100px 40px 100px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        align="center"
                        direction={'column'}
                        style={{ flex: 1 }}


                    >
                        <Title c={'#043873'}
                            ta={'center'}
                            style={{
                                fontWeight: 900,
                                lineHeight: 1.15,
                                fontSize: isMobile ? 32 : 48,
                                // marginBottom: 20,
                            }}>
                            PRIVACY POLICY
                        </Title>
                        {/* <Divider size="lg" style={{ color: '#043873', zIndex: 2 }}  my="md" /> */}
                    </Flex>
                </Flex>


                {/* 4th Section */}
                <Flex
                    direction="column"
                    bg={'#E6F1FE'}
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '30px' : '20px 100px 40px 100px',
                    }}
                >
                    {/* Hero */}
                    <Flex
                        align="center"
                        direction={'column'}
                        style={{ flex: 1 }}
                    >
                        <Paper
                            shadow="xl"
                            radius="md"
                            withBorder
                            style={{
                                maxWidth: 1000,
                                width: "100%",
                                margin: "auto",
                                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)"
                            }}
                        >
                            <Accordion style={{ flex: 1, }}>
                                {policy}
                            </Accordion>
                        </Paper>

                    </Flex>
                </Flex>

                {/* 5th Section */}
                <Flex
                    direction={"column"}
                    gap={50}
                    style={{

                        padding: isMobile ? "60px 20px" : "100px",
                    }}
                >
                    <Title
                        ta={"center"}
                        style={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontSize: isMobile ? 32 : 48,
                            color: "#043873",
                        }}>
                        Contact Information
                    </Title>

                    <Flex direction={'column'} >
                        <Text ta={'center'} fz={'20px'} style={{ color: '#043873', fontWeight: 700 }}>
                            For legal or privacy-related concerns,
                        </Text>
                        <Text ta={'center'} fz={'20px'} style={{ color: '#4F9CF9' }}>
                            you may contact:
                            idmokareramo@gmail.com
                        </Text>

                    </Flex>



                </Flex>


                {/* 6th Section */}
                <Flex
                    direction="column"
                    gap={80}
                    style={{
                        flex: 1,
                        padding: isMobile ? '60px 20px' : '50px',
                    }}
                    bg={'#A7CEFC'}
                >
                    {/* Hero */}
                    <Flex
                        gap={20}
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
                        }}>
                            Disclaimer
                        </Title>

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

            </Flex >
        </>
    )
}

export default page
