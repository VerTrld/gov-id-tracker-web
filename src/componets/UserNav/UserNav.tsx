"use client";

import {
  Box,
  UnstyledButton,
  Stack,
  Text,
  Divider,
  Button,
  Drawer,
  Flex,
  Accordion,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { governmentIds } from "./govenmentIds";
import { signOut, useSession } from "next-auth/react";
import {
  IconHeadphones,
  IconHelp,
  IconHome,
  IconId,
  IconLogout,
  IconMenu2,
  IconProgressCheck,
  IconSettings,
} from "@tabler/icons-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/http-api";
import { IdTypes } from "@/entities/IdTypes";

interface ResponsiveNavLayoutProps extends PropsWithChildren {}

export function UserNav({ children }: ResponsiveNavLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname?.split("/")[2] ?? "";
  const session = useSession();

  const { data } = useQuery({
    queryKey: ["id-types"],
    queryFn: async () => {
      const res = await get(`/id-types/read/all`);
      return res.data as IdTypes[];
    },
  });

  // const navItems = _.map(governmentIds, (value, id) => ({
  //   id,
  //   label: value.title,
  //   path: `/user/${id}`,
  // }));

  const isIdsActive =
    active &&
    active !== "home" &&
    active !== "progress" &&
    active !== "settings" &&
    active !== "support";

  const contentNav = () => (
    <Stack gap={20}>
      {/* HOME */}
      <UnstyledButton
        onClick={() => {
          router.push("/user/home");
          close();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "20px",
          fontSize: 14,
          color: active === "home" ? "#043873" : "#fff",
          backgroundColor: active === "home" ? "#F8FBFE" : "transparent",
          boxShadow:
            active === "home" ? "0 4px 6px rgba(0, 0, 0, 0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          if (active !== "home")
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          if (active !== "home")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <IconHome size={35} />
        {/* <Text c="inherit">Home</Text> */}
      </UnstyledButton>

      {/* LIST OF IDS */}
      <Accordion
        variant="filled"
        radius="md"
        defaultValue={isIdsActive ? "ids" : null}
        styles={{
          item: {
            backgroundColor: "transparent",
            border: "none",
          },
          content: { padding: 0 },
          control: {
            padding: 10,
            borderRadius: "20px",
            fontSize: 14,
            display: "flex",
            // gap: 8,
            color: isIdsActive ? "#043873" : "#fff",
            backgroundColor: isIdsActive ? "#F8FBFE" : "transparent",
            boxShadow: isIdsActive ? "0 4px 6px rgba(0, 0, 0, 0.25)" : "none", // <-- Shadow added here
            "&:hover": {
              backgroundColor: isIdsActive
                ? "#F8FBFE"
                : "rgba(255,255,255,0.15)",
            },
          },

          label: {
            color: "inherit",
          },
          panel: {
            paddingLeft: 16,
          },
        }}
      >
        <Accordion.Item value="ids">
          <Accordion.Control
            styles={{
              icon: {
                margin: 0,
                width: "100%",
                paddingLeft: 15,
              },
              label: {
                padding: 0,
              },
            }}
            icon={<IconId size={30} />}
          >
            {/* <Text c="inherit" fw={700}>
              List of IDs
            </Text> */}
          </Accordion.Control>

          <Accordion.Panel>
            <Stack pt={10} gap={10}>
              {data?.map((gi) => {
                const isActive = active === gi.code.toLowerCase();

                return (
                  <UnstyledButton
                    key={gi.id}
                    onClick={() => {
                      router.push(`/user/${gi.code.toLowerCase()}`);
                      close();
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: 10,
                      borderRadius: "20px",
                      fontSize: 14,
                      fontWeight: 500,
                      color: isActive ? "#043873" : "#fff",
                      backgroundColor: isActive ? "#F8FBFE" : "transparent",
                      boxShadow: isActive
                        ? "0 4px 6px rgba(0, 0, 0, 0.25)"
                        : "none",
                    }}
                  >
                    {gi.label}
                  </UnstyledButton>
                );
              })}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* PROGRESS */}
      <UnstyledButton
        onClick={() => {
          router.push("/user/progress");
          close();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "20px",
          fontSize: 14,
          color: active === "progress" ? "#043873" : "#fff",
          backgroundColor: active === "progress" ? "#F8FBFE" : "transparent",
          boxShadow:
            active === "progress" ? "0 4px 6px rgba(0, 0, 0, 0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          if (active !== "progress")
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          if (active !== "progress")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <IconProgressCheck size={30} />
        {/* <Text c="inherit">Support</Text> */}
      </UnstyledButton>

      {/* SETTINGS */}
      <UnstyledButton
        onClick={() => {
          router.push("/user/settings");
          close();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "20px",
          fontSize: 14,
          color: active === "settings" ? "#043873" : "#fff",
          backgroundColor: active === "settings" ? "#F8FBFE" : "transparent",
          boxShadow:
            active === "settings" ? "0 4px 6px rgba(0, 0, 0, 0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          if (active !== "settings")
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          if (active !== "settings")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <IconSettings size={30} />
        {/* <Text c="inherit">Settings</Text> */}
      </UnstyledButton>

      {/* HELP */}
      <UnstyledButton
        onClick={() => {
          router.push("/user/support");
          close();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "20px",
          fontSize: 14,
          color: active === "support" ? "#043873" : "#fff",
          backgroundColor: active === "support" ? "#F8FBFE" : "transparent",
          boxShadow:
            active === "support" ? "0 4px 6px rgba(0, 0, 0, 0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          if (active !== "support")
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          if (active !== "support")
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <IconHelp size={30} />
        {/* <Text c="inherit">Support</Text> */}
      </UnstyledButton>
    </Stack>
  );

  return (
    <>
      <Box style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && (
          <Box
            component="nav"
            style={{
              width: 150,
              backgroundColor: "#043873",
              display: "flex",
              flexDirection: "column",
              padding: 10,
              overflowY: "auto",
              scrollbarWidth: "thin",
              margin: 3,

              borderRadius: 20,
            }}
          >
            <Flex
              direction="column"
              align="center"
              style={{ margin: "20px 20px 10px 20px" }}
            >
              {/* <Flex
                style={{
                  borderRadius: "50%",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                <Image
                  alt="logo"
                  width={70}
                  height={70}
                  src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
                />
              </Flex> */}

              <Image
                alt="logo"
                width={90}
                height={90}
                src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
              />
              {/* <Text size="lg" fw={700} c="white" ta="center">
                Government IDs
              </Text> */}
            </Flex>

            <Divider m={"0px 10px 20px 10px"} />
            <Box
              style={{
                flex: 1,
                // paddingInlineEnd: 0,
                // margin: "0 0 0 20px",
              }}
            >
              {contentNav()}
            </Box>
            <Divider my="sm" m={"0px 10px 20px 10px"} />

            <Button
              // leftSection={<IconLogout />}
              color="#fff"
              style={{
                flexShrink: 0,
                margin: "0 20px 10px 20px",
              }}
              fw={700}
              variant="light"
              onClick={() => {
                signOut();
                close();
              }}
            >
              <IconLogout />
            </Button>
          </Box>
        )}
      </Box>

      {/* Mobile drawer */}
      {isMobile && (
        <>
          <Drawer
            opened={opened}
            onClose={close}
            withCloseButton={false}
            title={
              <Flex justify={"center"} align={"center"} gap={20}>
                {/* <Flex
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "white",
                    padding: "10px",
                  }}
                >
                  <Image
                    alt="logo"
                    width={60}
                    height={60}
                    src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
                  />
                </Flex> */}
                <Image
                  alt="logo"
                  width={85}
                  height={85}
                  src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
                />
              </Flex>
            }
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            padding="md"
            size="60%"
            styles={{
              title: {
                fontWeight: "bold",
                fontSize: "20px",
              },
              header: {
                paddingTop: 10,
                paddingBottom: 10,
                background: "#043873",
                borderBottom: "1px solid white",
                margin: "0 10px 0 10px",
                justifyContent: "center", // 👈 ito ang importante
                alignItems: "center",
              },

              body: {
                height: "90dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflowY: "auto",
              },
              content: {
                background: "#043873",
              },
            }}
          >
            {/* MAIN CONTENT — no right padding */}
            <Box pt={20}>{contentNav()}</Box>

            {/* FOOTER — keep padding */}
            <div style={{ marginRight: 10 }}>
              <Divider my="sm" />
              <Button
                fullWidth
                color="#fff"
                variant="light"
                onClick={() => {
                  signOut();
                  close();
                }}
                c={"#fff"}
                fw={700}
              >
                Sign Out
              </Button>
            </div>
          </Drawer>

          {/* Drawer toggle button */}
          <Button
            variant="default"
            onClick={open}
            style={{
              position: "fixed",
              top: 15,
              right: 15,
              zIndex: 200,
              padding: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              minWidth: 40,
              minHeight: 40,
              borderRadius: 50,
              flexShrink: 0,
            }}
          >
            <IconMenu2 size={20} />
          </Button>
        </>
      )}
    </>
  );
}
