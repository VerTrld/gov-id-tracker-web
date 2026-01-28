"use client";
import { Flex } from "@mantine/core";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const LoadingLayout = ({ children }: PropsWithChildren) => {
  const session = useSession();

  console.log({ session });
  if (session.status === "loading") {
    return <Flex style={{ flex: 1 }}>Loading</Flex>;
  }
  return children;
};

export default LoadingLayout;
