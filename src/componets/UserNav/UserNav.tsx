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
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { PropsWithChildren, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { governmentIds } from "./govenmentIds";
import { signOut } from "next-auth/react";
import { IconMenu2 } from "@tabler/icons-react";

interface ResponsiveNavLayoutProps extends PropsWithChildren {}

export function UserNav({ children }: ResponsiveNavLayoutProps) {
  const [active, setActive] = useState("philid"); // default first ID
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const navItems = _.map(governmentIds, (value, id) => ({
    id,
    label: value.title,
    path: `/user/${id}`,
  }));

  const contentNav = () => (
    <Stack gap={5}>
      {navItems.map((item) => (
        <UnstyledButton
          key={item.id}
          onClick={() => {
            setActive(item.id);
            router.push(item.path);
            close(); // close drawer after navigating
          }}
          style={{
            width: "100%",
            textAlign: "left",
            padding: 10,
            borderRadius: 8,
            fontSize: "14px",
            backgroundColor: active === item.id ? "#e6f7ff" : "transparent",
            // fontWeight: active === item.id ? 600 : 400,
            color: active === item.id ? "#1890ff" : "#333",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              active === item.id ? "#e6f7ff" : "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              active === item.id ? "#e6f7ff" : "transparent";
          }}
        >
          {item.label}
        </UnstyledButton>
      ))}
    </Stack>
  );

  return (
    <>
      <Box
        style={{
          display: "flex",
          minHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Sidebar for desktop */}
        {!isMobile && (
          <Box
            component="nav"
            style={{
              width: 220,
              backgroundColor: "#fff",
              borderRight: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              padding: 20,
              boxSizing: "border-box",
            }}
          >
            <Text size="lg" fw={700} mb={20} ta="center">
              Government IDs
            </Text>
            <Divider mb={20} />

            <Box style={{ flex: 1 }}>{contentNav()}</Box>

            <Divider my="sm" />
            <Button
              color="red"
              variant="light"
              style={{
                flexShrink: 0,
                height: 40,
                minHeight: 40,
              }}
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
            title="Government IDs"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            padding="md"
            size="80%"
            styles={{
              body: {
                height: "90vh",
              },
            }}
          >
            <Flex direction="column" style={{ height: "100%" }}>
              <Divider my="sm" />
              {/* Nav items at top */}
              <Box style={{ flex: 1, overflowY: "auto" }}>{contentNav()}</Box>

              <Divider my="sm" />

              {/* Sign Out button at bottom */}
              <Button
                fullWidth
                color="red"
                variant="light"
                onClick={() => {
                  signOut();
                  close();
                }}
              >
                Sign Out
              </Button>
            </Flex>
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
