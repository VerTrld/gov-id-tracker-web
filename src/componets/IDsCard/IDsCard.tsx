import { Flex, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import React from 'react'

interface IIDsInfo {
    title: string
    desc?: string
    logo: string
    color?: string
}

const IDsCard = ({ desc, title, logo, color}: IIDsInfo) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Flex
            direction="column"
            justify="center"
            align={'center'}
            gap={isMobile ? 10 : 20} // smaller gap on mobile
            p={isMobile ? '15px 20px' : '20px 30px'}
            style={{
                borderRadius: '20px',
                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
                width: isMobile ? '75%' : '200px',
                height: isMobile ? 'auto' : '300px', // auto height on mobile
                backgroundColor: color ? color : '#FFFFFF'
            }}
        >
            <Image
                alt='saadds'
                src={logo}
                height={isMobile ? 40 : 80}
                width={isMobile ? 40 : 80}
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
            <Title c='#043873' fz={isMobile ? '16px' : '18px'}>{title}</Title>
            {desc ? 
            <Text fz={isMobile ? '12px' : '14px'} w={isMobile ? '80%' : '140px'} ta="center">
                {desc}
            </Text>
            : null
            }

        </Flex>
    );
};


export default IDsCard