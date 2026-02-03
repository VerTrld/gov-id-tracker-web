"use client";
import ContactUs from "@/componets/ContactUs/ContactUs";
import { Box, Flex, Paper } from "@mantine/core";

export default function page() {
  return (
    <Flex flex={1} justify={"center"} align={"center"}>
      <ContactUs />
    </Flex>
  );
}
