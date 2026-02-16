"use client";
import ContactSection from "@/componets/ContactUs/ContactUs";
import Footer from "@/componets/Footer/Footer";
import { Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

const page = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Flex direction={"column"} flex={1} style={{ zIndex: -1 }}>
        <Flex
          direction="column"
          gap={80}
          style={{
            flex: 1,
            padding: isMobile ? "60px 20px" : "100px",
          }}
        >
          <ContactSection label="Contact Us" />
        </Flex>

        <Flex flex={1}>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
};

export default page;
