"use client";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

import _ from "lodash";
import { useParams } from "next/navigation";
// import { governmentIds } from "@/componets/UserNav/govenmentIds";
import { ChecklistModule } from "@/componets/ChecklistModule/ChecklistModule";
import UploadModal from "@/componets/UploadModal/UploadModal";
import { IGovernmentIds } from "@/entities/IGovernmentIds";
import { get, patch, post } from "@/utils/http-api";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { IconMail, IconMapPin } from "@tabler/icons-react";

export default function GovernmentIds() {
  const params = useParams();
  const id = params.id;

  const { data, refetch: refetchGovernmentIds } = useQuery({
    queryKey: ["selected-government-id"],
    queryFn: async () => {
      const res = await get(`/government-ids/read/${id}`);
      console.log({ data: res.data });
      return res.data as IGovernmentIds;
    },
  });

  const handleApplyGovernmentIds = async (governmentIdsId: string) => {
    try {
      const res = await post(`/user-government-ids/create/one`, {
        isActive: true,
        governmentIdsId,
      });

      if (res.status === 200 || res.status === 201) {
        refetchGovernmentIds();
        alert(`Success Applying for ${data?.label}`);
      }
    } catch (error) {
      alert(`Error Applying for ${data?.label}: Try again later`);
    }
  };

  const handleCheckToggle = async (
    requirementsId: string,
    userRequirementId: string
  ) => {
    try {
      const res = await patch(`/user-requirement/update/toggle`, {
        requirementsId,
        id: userRequirementId || null,
      });
      if (res.status === 200 || res.status === 201) {
        refetchGovernmentIds();
        // alert('Success Updating Requirement')
      }
    } catch (error) {
      // alert('Error Updating Requirement: Try again later')
    }
  };

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
      align={"center"}
      justify={"center"}
      style={{
        flex: 1,
        padding: 24,
        gap: 24,
        // backgroundColor: "#fff",
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
      {/* <Box>
        <Title order={3} mb="xs" w={"90%"}>
          {data?.label}
        </Title>
        <Text size="sm">{data?.description || "No description indicated"}</Text>
      </Box> */}

      {/* <Divider my="sm" /> */}

      {/* Requirements checklist */}
      {!_.isEmpty(data.UserGovernmentIds) ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <ChecklistModule
            details={
              <>
                <Text fw={600} size="lg">
                  {data?.label}
                </Text>
                <Button color="#4F9CF9">OFFICIAL SITE</Button>
              </>
            }
            items={
              data?.RequirementLists?.[0]?.Requirements?.map((r) => {
                return {
                  id: r.id,
                  isActive: r.UserRequirements?.[0]?.isActive || false,
                  label: r.label,
                };
              }) || []
            }
            uploadImage={open}
            onComplete={() => {
              const total = data?.RequirementLists?.[0].Requirements.reduce(
                (sum: any, item: any) => sum + item.value,
                0
              );

              if (total === 100 && data?.officialUrls) {
                window.open(data?.officialUrls?.[0], "_blank");
              }
            }}
          >
            <Stack gap="lg" style={{ flex: 1 }}>
              {data.RequirementLists?.[0]?.Requirements.map((item, i) => (
                <Flex w={"100%"} gap={20} justify={"space-between"} key={i}>
                  <Checkbox
                    key={`${item.id + 34}`}
                    label={`${item.label}`}
                    size="lg"
                    // checked={item.UserRequirements?.[0]?.isActive || false}
                    defaultChecked={
                      item.UserRequirements?.[0]?.isActive || false
                    }
                    onChange={async (event) => {
                      console.log({
                        sta: item,
                        reqId: item.id,
                        userReq: item.UserRequirements?.[0]?.id || "",
                      });
                      handleCheckToggle(
                        item.id,
                        item?.UserRequirements?.[0]?.id
                      );
                    }}
                    styles={{
                      input: {
                        borderRadius: "50%", // 🔥 makes the box circular
                        width: 30,
                        height: 30,
                      },
                      icon: {
                        borderRadius: "50%", // makes the check mark fit inside circle
                      },
                    }}
                  />

                  <Button
                    size="xs"
                    variant="outline"
                    color="blue"
                    // onClick={uploadImage}
                    style={{ width: 80, flexShrink: 0 }}
                  >
                    Upload
                  </Button>
                </Flex>
              ))}
            </Stack>
          </ChecklistModule>
        </Box>
      ) : (
        <Flex>
          <Button onClick={() => handleApplyGovernmentIds(data.id)}>
            Apply
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
