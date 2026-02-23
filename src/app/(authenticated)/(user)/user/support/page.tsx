"use client";
import ContactSection from "@/componets/ContactUs/ContactUs";
import { Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

export default function Help() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Flex
      direction="column"
      gap={80}
      style={{
        flex: 1,
        padding: isMobile ? "60px 20px" : "100px",
        backgroundImage: `url(${process.env.NEXT_PUBLIC_DASH_1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

      }}
    >
      {/* <Flex align={'center'} justify={'center'}
        style={{
          padding: '80px 40px',
          borderRadius: 20,
          border: '1px solid white',
          backdropFilter: 'blur(7px) saturate(200%)',
          WebkitBackdropFilter: 'blur(7px) saturate(200%)',
          backgroundColor: 'rgba(143, 142, 142, 0.48)',
        }}> */}
        <ContactSection label="Need Help?" />
      {/* </Flex> */}

    </Flex>
  );
}
