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
      }}
    >
      <ContactSection label="Need Help?" />
    </Flex>
  );
}
