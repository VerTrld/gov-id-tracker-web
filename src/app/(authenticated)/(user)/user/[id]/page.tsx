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
import { governmentIds } from "@/componets/UserNav/govenmentIds";
import { ChecklistModule } from "@/componets/ChecklistModule/ChecklistModule";
import UploadModal from "@/componets/UploadModal/UploadModal";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";

export default function GovernmentIds() {
  const params = useParams();
  const id = params.id;

  const data = id ? _.get(governmentIds, id) : undefined;

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
        <Title order={3} mb="xs">
          {data.title}
        </Title>
        <Text size="sm">{data.description}</Text>
      </Box>

      <Divider my="sm" />

      {/* Requirements checklist */}
      <Box>
        <Title order={4} mb="sm">
          Requirements
        </Title>
        <Text color="dimmed" size="sm" mb="md">
          Complete the following items to proceed:
        </Text>

        <ChecklistModule items={data.requirements} uploadImage={open} />
      </Box>

      <Divider my="sm" />

      {/* How to Get */}
      {data.howToGet && data.howToGet.length > 0 && (
        <Box>
          <Title order={4} mb="sm">
            How to Get
          </Title>
          <List spacing="sm" size="sm" center>
            {data.howToGet.map((step: any, index: number) => (
              <List.Item key={index}>{step}</List.Item>
            ))}
          </List>
        </Box>
      )}

      {/* Official website */}
      {data.officialWebsite && (
        <Box>
          <Title order={4} mb="xs">
            Official Website
          </Title>
          <Anchor
            href={data.officialWebsite}
            target="_blank"
            size="sm"
            color="blue"
          >
            {data.officialWebsite}
          </Anchor>
        </Box>
      )}
    </Flex>
  );
}
