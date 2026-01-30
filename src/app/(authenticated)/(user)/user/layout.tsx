"use client";
import { UserNav } from "@/componets/UserNav/UserNav";
import { Button, Flex } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <Flex w={"100%"} h={"100vh"}>
      <UserNav />
      {children}
    </Flex>
  );
}
