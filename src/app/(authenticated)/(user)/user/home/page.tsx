import Dashboard from "@/componets/Dashboard/Dashboard";
import { Flex } from "@mantine/core";
import React from "react";

export default function HomeDashboard() {
  return (
    <Flex flex={1} justify={"center"} align={"center"}>
      <Dashboard />
    </Flex>
  );
}
