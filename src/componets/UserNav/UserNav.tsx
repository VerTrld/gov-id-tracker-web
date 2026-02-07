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
  IconHome,
  IconId,
  IconLogout,
  IconMenu2,
  IconSettings,
} from "@tabler/icons-react";
import Image from "next/image";

interface ResponsiveNavLayoutProps extends PropsWithChildren {}

export function UserNav({ children }: ResponsiveNavLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname?.split("/")[2] ?? "";
  const session = useSession();

  const navItems = _.map(governmentIds, (value, id) => ({
    id,
    label: value.title,
    path: `/user/${id}`,
  }));

  const isIdsActive =
    active &&
    active !== "home" &&
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
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "20px 0px 0px 20px",
          fontSize: 14,
          color: active === "home" ? "#0A58BD" : "#fff",
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
        <IconHome size={20} />
        <Text c="inherit" fw={700}>
          Home
        </Text>
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
            borderRadius: "10px 0px 0px 10px",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: isIdsActive ? "#0A58BD" : "#fff",
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
              icon: { margin: 0 },
              label: {
                padding: 0,
              },
            }}
            icon={<IconId size={20} />}
          >
            <Text c="inherit" fw={700}>
              List of IDs
            </Text>
          </Accordion.Control>

          <Accordion.Panel
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Stack pt={10} gap={10}>
              {navItems.map((item) => (
                <UnstyledButton
                  key={item.id}
                  onClick={() => {
                    router.push(item.path);
                    close();
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: 10,
                    borderRadius: "10px 0px 0px 10px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: active === item.id ? "#0A58BD" : "#fff",
                    backgroundColor:
                      active === item.id ? "#F8FBFE" : "transparent",
                    boxShadow:
                      active === item.id
                        ? "0 4px 6px rgba(0, 0, 0, 0.25)"
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== item.id)
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    if (active !== item.id)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </UnstyledButton>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* SETTINGS */}
      <UnstyledButton
        onClick={() => {
          router.push("/user/settings");
          close();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "10px 0px 0px 10px",
          fontSize: 14,
          color: active === "settings" ? "#0A58BD" : "#fff",
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
        <IconSettings size={20} />
        <Text c="inherit" fw={700}>
          Settings
        </Text>
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
          gap: 8,
          width: "100%",
          padding: 10,
          borderRadius: "10px 0px 0px 10px",
          fontSize: 14,
          color: active === "support" ? "#0A58BD" : "#fff",
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
        <IconHeadphones size={20} />
        <Text c="inherit" fw={700}>
          Help / Support
        </Text>
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
              width: 220,
              backgroundColor: "#4F9CF9",
              display: "flex",
              flexDirection: "column",
              // padding: 20,
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <Flex
              direction="column"
              align="center"
              style={{ margin: "20px 20px 10px 20px" }}
            >
              <Image
                alt="logo"
                width={70}
                height={70}
                src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
              />
              <Text size="lg" fw={700} c="white" ta="center">
                Government IDs
              </Text>
            </Flex>

            <Divider m={"0px 10px 20px 10px"} />
            <Box
              style={{
                flex: 1,
                paddingInlineEnd: 0,
                margin: "0 0 0 20px",
              }}
            >
              {contentNav()}
            </Box>
            <Divider my="sm" m={"0px 10px 20px 10px"} />

            <Button
              leftSection={<IconLogout />}
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
              Sign Out
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
            title={
              <Flex align={"center"} gap={20}>
                <Image
                  alt="logo"
                  width={50}
                  height={50}
                  src={`${process.env.NEXT_PUBLIC_KARERAMO_LOGO}`}
                />
                <Text fw={700} c={"#fff"}>
                  Government IDs
                </Text>
              </Flex>
            }
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            padding="md"
            size="70%"
            styles={{
              title: {
                fontWeight: "bold",
                fontSize: "20px",
              },
              header: {
                paddingTop: 10,
                paddingBottom: 10,
                background: "#4F9CF9",
                borderBottom: "1px solid white",
                margin: "0 10px 0 10px",
              },

              body: {
                height: "90dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingRight: 0,
                overflowY: "auto",
              },
              content: {
                background: "#4F9CF9",
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
