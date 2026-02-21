import Dashboard from "@/componets/Dashboard/Dashboard";
import { Flex } from "@mantine/core";
import React from "react";

export default function HomeDashboard() {
  return (
    <Flex flex={1} justify={"center"} align={"center"}
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_DASH_1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Dashboard />
    </Flex>
  );
}
