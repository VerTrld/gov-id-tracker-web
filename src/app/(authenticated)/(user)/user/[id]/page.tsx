"use client";

import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";

import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
// import { governmentIds } from "@/componets/UserNav/govenmentIds";
import { ChecklistModule } from "@/componets/ChecklistModule/ChecklistModule";
import UploadModal from "@/componets/UploadModal/UploadModal";
import { IdTypes } from "@/entities/IdTypes";
import { del, get, patch, post } from "@/utils/http-api";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  IconMail,
  IconMapPin,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import ViewImageModal from "@/componets/ViewImageModal/ViiewImageMoldal";
import Image from "next/image";
import { IViewImage } from "@/entities/IViewImage";
import { useSession } from "next-auth/react";
import { modals } from "@mantine/modals";

export default function GovernmentIds() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [userRequirementId, setUserRequirementId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const session = useSession();

  console.log(session);

  const { data, refetch: refetchGovernmentIds } = useQuery({
    queryKey: ["selected-id-type"],
    queryFn: async () => {
      const res = await get(`/id-types/read/${id}`);
      console.log({ data: res.data });
      return res.data as IdTypes;
    },
  });
  const { data: imageView, refetch: refetchImageView } = useQuery<IViewImage[]>(
    {
      queryKey: ["upload", userRequirementId],
      queryFn: async () => {
        const res = await get(`/upload/view/${userRequirementId}`);
        return res.data;
      },
    }
  );

  const handleApplyGovernmentIds = async (governmentIdsId: string) => {
    try {
      const res = await post(`/applications/create/${governmentIdsId}`);

      if (res.status === 200 || res.status === 201) {
        refetchGovernmentIds();

        // await Promise.all(
        //   data?.RequirementLists?.[0]?.Requirements?.map(async (v) => {
        //     return await post("/user-requirement", {
        //       requirementsId: v.id,
        //     });
        //   }) || [],
        // );
      }
    } catch (error) {
      alert(`Error Applying for ${data?.label}: Try again later`);
    } finally {
      notifications.show({
        title: "Success",
        message: `Success Applying for ${data?.label}`,
        color: "green",
      });
    }
  };

  // const handleCheckToggle = async (requirementsId: string) => {
  //   try {
  //     const res = await patch(`/user-requirement/update/toggle`, {
  //       requirementsId,
  //       id: userRequirementId || null,
  //     });
  //     if (res.status === 200 || res.status === 201) {
  //       refetchGovernmentIds();
  //       // alert('Success Updating Requirement')
  //     }
  //   } catch (error) {
  //     // alert('Error Updating Requirement: Try again later')
  //   }
  // };

  const handleCheckToggle = async (useRequirementId: string) => {
    try {
      const res = await patch(`/user-requirements/update/${useRequirementId}`);
      if (res.status === 200 || res.status === 201) {
        refetchGovernmentIds();
      }
    } catch (error) { }
  };
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);
  const [viewOpened, { open: openView, close: closeView }] =
    useDisclosure(false);

  if (!data) {
    return (
      <Flex justify="center" align="center" style={{ flex: 1, height: "100%" }}>
        <Text>No data found for this ID.</Text>
      </Flex>
    );
  }

  console.log(data, imageView);

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      size: "sm",
      radius: "15px",
      withCloseButton: false,
      groupProps: {
        align: "center",
        justify: "center",
        p: "md",
      },
      styles: {
        title: {
          width: "100%",
          textAlign: "center",
        },
      },
      title: (
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          ta={"center"}
          gap={10}
          p={"15px"}
        >
          <Image
            alt="Logo"
            style={{ padding: "5px" }}
            src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
            width={60}
            height={60}
          />
          <Text ta={"center"} c="#0B69A3">
            You’re all set!
          </Text>
        </Flex>
      ),
      children: (
        <Text size="sm" ta={"center"} c="#4F9CF9" p={"20px"}>
          You have completed the required documents. You are now ready to apply
          for this ID.
        </Text>
      ),
      labels: { confirm: "Apply for other ID", cancel: "Back to Home" },
      cancelProps: {
        radius: "10px",
        style: {
          color: "white",
          backgroundColor: "#0A58BD",
        },
      },
      onCancel: () => router.push("/user/home"),

      confirmProps: {
        radius: "10px",
        style: {
          color: "white",
          backgroundColor: "#4F9CF9",
        },
      },
      onConfirm: () => router.push("/user/home"),
    });

  return (
    <Flex
      direction="column"
      align={"center"}
      justify={"center"}
      style={{
        flex: 1,
        // padding: 24,
        gap: 24,
        // backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minHeight: "100%",
        overflowY: "auto",
        backgroundImage: `url(${process.env.NEXT_PUBLIC_DASH_2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Upload Modal */}
      <UploadModal
        opened={uploadOpened} // separate state for upload modal
        onClose={closeUpload}
        onUpload={async (files) => {
          if (!userRequirementId) return;

          const formData = new FormData();
          files.forEach((file) => formData.append("file", file));

          try {
            const res = await post(
              `/upload/image/${userRequirementId}`,
              formData
            );

            notifications.show({
              title: res.status < 300 ? "Success" : "Error",
              message:
                res.status < 300 ? "Upload Successfully" : "Upload failed",
              color: res.status < 300 ? "green" : "red",
            });

            // Refresh images after upload
            await refetchImageView?.();
            closeUpload();
          } catch (err) {
            console.error("Upload error:", err);
            notifications.show({
              title: "Error",
              message: "Upload failed",
              color: "red",
            });
          }
        }}
      />

      {/* View Modal */}
      <ViewImageModal opened={viewOpened} onClose={closeView}>
        <Stack gap="md">
          {imageView?.[0]?.fileUrl ? (
            <>
              <Flex justify="center">
                <Paper
                  shadow="md"
                  radius="md"
                  p="xs"
                  withBorder
                  style={{ maxWidth: 320 }}
                >
                  <Image
                    src={imageView[0].fileUrl}
                    alt="image-view"
                    width={300}
                    height={400}
                    style={{ objectFit: "contain", cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        imageView[0].fileUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  />
                </Paper>
              </Flex>

              <Divider />

              <Flex justify="end" align="center">
                <Button
                  color="red"
                  variant="light"
                  leftSection={<IconX size={16} />}
                  loading={deleting}
                  disabled={deleting}
                  onClick={async () => {
                    try {
                      setDeleting(true);

                      const res = await del(`/upload/${imageView[0].id}`);

                      if (res.status === 200 || res.status === 201) {
                        notifications.show({
                          title: "Deleted",
                          message: "Image deleted successfully",
                          color: "green",
                        });

                        await refetchImageView?.();
                        closeView();
                      }
                    } catch (error) {
                      notifications.show({
                        title: "Error",
                        message: "Failed to delete image",
                        color: "red",
                      });
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  Delete
                </Button>
              </Flex>
            </>
          ) : (
            <Center h={300}>
              <Stack align="center" gap="xs">
                <IconPhoto size={48} stroke={1.2} color="gray" />
                <Text c="dimmed">No image uploaded</Text>
              </Stack>
            </Center>
          )}
        </Stack>
      </ViewImageModal>

      {/* Title and description */}
      {/* <Box>
        <Title order={3} mb="xs" w={"90%"}>
          {data?.label}
        </Title>
        <Text size="sm">{data?.description || "No description indicated"}</Text>
      </Box> */}

      {/* <Divider my="sm" /> */}

      {/* Requirements checklist */}
      {!_.isEmpty(data.applications) ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "81%",
            justifyContent: "center",
          }}
        >
          <ChecklistModule
            details={
              <>
                <Text fw={600} size="lg">
                  {data?.label}
                </Text>
                <Button
                  color="#4F9CF9"
                  onClick={() => {
                    router.push(data?.officialUrls?.[0]);
                  }}
                >
                  OFFICIAL SITE
                </Button>
              </>
            }
            items={data?.requirements.map((r) => {
              return {
                ...r.requirement,
              };
            })}
            uploadImage={open}
            onComplete={() => {
              const total = data?.requirements?.reduce(
                (sum: any, item: any) => sum + item.value,
                0
              );

              if (total === 100 && data?.officialUrls) {
                window.open(data?.officialUrls?.[0], "_blank");
              }

              openModal();
            }}
          >
            <Stack gap="lg" style={{ flex: 1 }}>
              {data.requirements?.map((r) => (
                <Flex w="100%" gap={20} align="center" key={r.id}>
                  {/* LEFT SIDE (Checkbox + Label) */}
                  <Flex style={{ flex: 1, minWidth: 0 }}>
                    <Checkbox
                      label={r.requirement.label}
                      size="lg"
                      // defaultChecked={
                      //   item.UserRequirements?.[0]?.isActive || false
                      // }
                      onChange={async () => {
                        handleCheckToggle(r.requirement.id);
                      }}
                      defaultChecked={
                        r.requirement.userRequirements?.find(
                          (v) => v.userId === session.data?.user?.id
                        )?.isCompleted || false
                      }
                      // onChange={() => {
                      //   const userReq = item.UserRequirements?.find(
                      //     (v) => v.userAccountId === session.data?.user?.id
                      //   );
                      //   handleCheckToggle(item.id, String(userReq?.id));
                      // }}
                      styles={{
                        input: {
                          borderRadius: "50%",
                          width: 30,
                          height: 30,
                        },
                        icon: {
                          borderRadius: "50%",
                        },
                      }}
                    />
                  </Flex>

                  {/* RIGHT SIDE (Buttons) */}
                  <Flex gap={10}>

                    <Button
                      variant="outline"
                      onClick={() => {
                        // const userReq = r.userRequirements.find(
                        //   (v) => v.userId === session.data?.user?.id,
                        // );
                        // if (!userReq) return;
                        setUserRequirementId(
                          r.requirement.userRequirements?.[0]?.id
                        );

                        openUpload();

                        console.log(r.userRequirements?.[0].id);
                      }}
                    >
                      <IconUpload color="#4F9CF9" size={20} />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        // const userReq = r.userRequirements.find(
                        //   (v) => v.userId === session.data?.user?.id
                        // );
                        // if (!userReq) return;
                        setUserRequirementId(
                          r.requirement.userRequirements?.[0]?.id
                        );
                        openView();
                      }}
                    >
                      <IconPhoto color="#4F9CF9" size={20} />
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </ChecklistModule>
        </Box>
      ) : (
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          gap={10}
          w={"80%"}
          style={{
            padding: '40px',
            borderRadius: 20,
            border: '1px solid white',
            backdropFilter: 'blur(7px) saturate(200%)',
            WebkitBackdropFilter: 'blur(7px) saturate(200%)',
            backgroundColor: 'rgba(118, 118, 119, 0.48)',
          }}
        >
          <Title
            c={"#043873"}
            style={{
              fontWeight: 900,
              lineHeight: 1.15,
              fontSize: 32,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Are you sure you want to proceed with this ID application?
          </Title>
          <Button onClick={() => handleApplyGovernmentIds(data.id)}>
            Apply
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
