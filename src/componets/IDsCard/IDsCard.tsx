import { Flex, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React from 'react'

interface IIDsInfo {
    title: string
    desc: string
}

const IDsCard = ({ desc, title }: IIDsInfo) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            gap={isMobile ? 10 : 20} // smaller gap on mobile
            p={isMobile ? '15px 20px' : '20px 30px'}
            style={{
                borderRadius: '10px',
                boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.19)',
                width: isMobile ? '75%' : '200px',
                height: isMobile ? 'auto' : '300px', // auto height on mobile
            }}
        >
            <Text>Logo</Text>
            <Title c='#043873' fz={isMobile ? '16px' : '18px'}>{title}</Title>
            <Text fz={isMobile ? '12px' : '14px'} w={isMobile ? '80%' : '140px'} ta="center">
                {desc}
            </Text>
        </Flex>
    );
};


export default IDsCard