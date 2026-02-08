"use client";

import React, { useState } from "react";
import {
  Box,
  Title,
  Text,
  Flex,
  Divider,
  Button,
  Anchor,
  List,
  ThemeIcon,
} from "@mantine/core";

import { useParams } from "next/navigation";
import _ from "lodash";
// import { governmentIds } from "@/componets/UserNav/govenmentIds";
import { ChecklistModule } from "@/componets/ChecklistModule/ChecklistModule";
import UploadModal from "@/componets/UploadModal/UploadModal";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/http-api";
import { IGovernmentIds } from "@/entities/IGovernmentIds";

export default function GovernmentIds() {
  const params = useParams();
  const id = params.id;

  const { data } = useQuery({
    queryKey: ["selected-government-id"],
    queryFn: async () => {
      const res = await get(`/government-ids/read/${id}`);
      console.log({ res: res.data });
      return res.data as IGovernmentIds;
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  if (!data) {
    return (
      <Flex justify="center" align="center" style={{ flex: 1, height: "100%" }}>
        <Text>No data found for this ID.</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      style={{
        flex: 1,
        padding: 24,
        gap: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minHeight: "100%",
        overflowY: "auto",
      }}
    >
      {/* Upload modal */}
      <UploadModal
        onSubmit={() => {}}
        opened={opened}
        onClose={close}
        dropzoneProps={{
          onDrop: (files) => console.log("Accepted files:", files),
          onReject: (files) => console.log("Rejected files:", files),
          maxSize: 5 * 1024 ** 2,
        }}
      />

      {/* Title and description */}
      <Box>
        <Title order={3} mb="xs" w={"90%"}>
          {data?.label}
        </Title>
        <Text size="sm">{data?.description || "No description indicated"}</Text>
      </Box>

      <Divider my="sm" />

      {/* Requirements checklist */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title order={4} mb="sm">
          Requirements
        </Title>
        <Text c="dimmed" size="sm" mb="md">
          Complete the following items to proceed:
        </Text>

        <ChecklistModule
          items={
            data?.requirements.map((r) => {
              return {
                id: r.id,
                isActive: false,
                label: r.label,
              };
            }) || []
          }
          uploadImage={open}
          onComplete={() => {
            const total = data?.requirements.reduce(
              (sum: any, item: any) => sum + item.value,
              0,
            );

            if (total === 100 && data?.officialUrls) {
              window.open(data?.officialUrls?.[0], "_blank");
            }
          }}
        />
      </Box>
    </Flex>
  );
}
