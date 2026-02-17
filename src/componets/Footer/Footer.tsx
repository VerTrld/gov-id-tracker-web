import {
    Button,
    Divider,
    Flex,
    Text,
    Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
    IconBrandFacebookFilled,
    IconBrandLinkedinFilled,
    IconBrandTwitterFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();

    return (
        <Flex
            direction="column"
            bg="#043873"
            style={{
                flex: 1,
                padding: isMobile ? '20px 20px' : '40px 100px',
                height: isMobile ? 'auto' : '30vh', // 🔑 fix overflow
            }}
            justify="space-between"
            gap={20}
        >
            {/* Top Section */}
            <Flex
                justify="space-between"
                direction={isMobile ? 'column' : 'row'}
                gap={isMobile ? 20 : 0}
            >
                <Flex align="center" gap={10} justify={'center'} direction={isMobile ? 'column' : "row"}>
                    <Flex style={{ borderRadius: "50%", backgroundColor: 'white', padding: '10px' }}>
                        <Image alt="Logo"
                            src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
                            width={isMobile ? 40 : 80}
                            height={isMobile ? 40 : 80}
                        /></Flex>

                    <Title c="#FFFFFF" style={{
                        lineHeight: 1.15,
                    }}>ID Mo, Karera Mo</Title>
                </Flex>

                <Flex justify={'center'} align={'center'}>
                    <Text
                        style={{
                            textAlign: isMobile ? 'center' : 'right',
                            color: '#FFFFFF',
                            maxWidth: isMobile ? '100%' : 600,
                        }}
                    >
                        ID Mo, Karera Mo is an independent platform created to guide first time job seekers. The developers and owners of this website are not affiliated with any government agency. All applications are completed through official government websites and offices.
                    </Text>
                </Flex>
            </Flex>

            {/* Bottom Section */}
            <Flex direction="column" gap={10}>
                <Flex
                    justify="space-between"
                    direction={isMobile ? 'column' : 'row'}
                    gap={isMobile ? 16 : 0}
                >
                    <Flex
                        gap={20}
                        wrap="wrap"
                        direction={isMobile ? 'column' : 'row'}
                        align={'center'}
                    >
                        <Button variant="subtle" onClick={() => router.push("/terms&condition")}>
                            <Text c="#FFFFFF">Terms & Privacy</Text>
                        </Button>

                        <Text c="#FFFFFF" ta={'center'}>
                            © 2026 ID Mo, Karera Mo | Capstone Research Project
                        </Text>
                    </Flex>

                    {/* <Flex gap={5} align={'center'} justify={'center'}>
                        <IconBrandFacebookFilled color="#FFFFFF" />
                        <IconBrandTwitterFilled color="#FFFFFF" />
                        <IconBrandLinkedinFilled color="#FFFFFF" />
                    </Flex> */}
                </Flex>

                <Divider color='#FFFFFF' />
            </Flex>
        </Flex>
    );
};

export default Footer;
