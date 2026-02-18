import { Flex, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import React from 'react'

interface IDocumentCard {
    img: string
    title: string
}

const DocumentCard = ({ img, title }: IDocumentCard) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <Flex
            gap={10}
            align={'center'}
            p={20}
            justify={'space-evenly'}
            style={{
                borderRadius: "20px",
                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)",
                width: "250px",
                height: '115px',
                backgroundColor: "#FFFFFF",
            }}
        >
            <Image
                alt='saadds'
                src={img}
                height={isMobile ? 40 : 70}
                width={isMobile ? 40 : 70}
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

            <Text 
            // ta={"center"}
                style={{
                    fontWeight: 600,
                    width: '130px',
                    // lineHeight: 1.15,
                    fontSize: 24,
                    color: "#043873",
                }}
            >
                {title}
            </Text>
        </Flex>
    )
}

export default DocumentCard