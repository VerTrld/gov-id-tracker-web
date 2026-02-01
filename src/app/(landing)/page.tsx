"use client";

import LoginUserModal from "@/componets/LoginUserModal/LoginUserModal";
import RegisterUserModal from "@/componets/RegisterUserModal/RegisterUserModal";
import { LoginType } from "@/enum/dashboard.enum";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Login() {



    const [modalOpen, setModalOpen] = useState('')

    const isMobile = useMediaQuery('(max-width: 768px)');









    return (

        <>

            <Flex
                direction={"column"}
                flex={1}
            >
              


                {/* Sample Data and Call
                <ChecklistModule
          items={[
            { id: 'profile', label: 'Complete profile', value: 25 },
            { id: 'email', label: 'Verify email', value: 25 },
            { id: 'photo', label: 'Upload photo', value: 25 },
            { id: 'terms', label: 'Accept terms', value: 25 },
          ]}
          onComplete={() => console.log('All done!')}
        /> */}


                <Flex
                    // flex={1}
                    py={isMobile ? 60 : 100}
                    px={isMobile ? 20 : 100}
                    style={{
                    zIndex: -1,
                    background: 'linear-gradient(180deg, #FFFFFF, #FFFFFF, #3386e4)',
                    // borderRadius: 16,
                    flex: 1
                }}
                >
                    <Flex flex={1} >
                        <Flex
                            gap={isMobile ? 40 : 60}
                            align="center"
                            justify="space-between"
                            direction={isMobile ? 'column' : 'row'}
                            flex={1}
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
                    </Flex>



                </Flex>

            </Flex>
        </>

    );
}
