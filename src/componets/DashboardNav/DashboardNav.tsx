import { Box, Burger, Button, Collapse, Flex, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface IDashboardNav extends PropsWithChildren { }

const DashboardNav = ({ children }: IDashboardNav) => {
  const session = useSession();
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Flex style={{ flexDirection: "column", zIndex: 100 }} flex={1} >
      <Box style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ padding: "20px" }}
        >
          <Title>Logo</Title>

          {!isMobile ? (
            // Desktop menu
            <Flex gap={15} align={"center"}>
              <Button variant="subtle" onClick={() => router.push("/")}>
                <Text>Home</Text>
              </Button>
              <Button variant="subtle" onClick={() => router.push("/about")}>
                <Text>About</Text>
              </Button>
              {/* <Button variant="subtle">Features</Button> */}
              <Button variant="subtle" >
                <Text>Contact</Text>
              </Button>
              {session.data?.user?.name ? (
                <Flex gap={15}>
                  <Button onClick={() => router.push("/user")}>
                    <Text>{session.data.user.name}</Text>
                  </Button>
                  <Button onClick={() => signOut()}>Logout</Button>
                </Flex>
              ) : (
                <Flex gap={15}>
                  <Button onClick={() => router.push("?action=login")}
                    variant="subtle"
                  >
                    <Text>Log In</Text>
                  </Button>
                  <Button onClick={() => router.push("?action=register")}
                    color='#213379'
                    variant="outline"
                    style={{ borderRadius: 20 }}>
                    <Text>Register Now</Text>
                  </Button>
                </Flex>
              )}
            </Flex>
          ) : (
            // Mobile burger
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              style={{ color: "black" }}
            />
          )}
        </Flex>

        {/* Mobile menu */}
        {isMobile && (
          <Collapse in={opened}>
            <Flex
              direction="column"
              gap="md"
              style={{ padding: "0 20px 20px", backgroundColor: "#f9f9f9" }}
            >
              <Button variant="subtle" fullWidth onClick={close}>
                <Text>Home</Text>
              </Button>
              <Button variant="subtle" fullWidth onClick={close}>
                <Text>About</Text>
              </Button>
              <Button variant="subtle" fullWidth onClick={close}>
                <Text>Contact</Text>
              </Button>
              {session.data?.user?.name ? (
                <Flex>
                  <Text>{session.data.user.name}</Text>
                </Flex>
              ) : (
                <Flex>
                  <Button
                    variant="subtle"
                    fullWidth
                    onClick={() => {
                      // close();
                      // logIn();
                      router.push("?action=login");
                    }}
                  >
                    <Text>Contact</Text>
                  </Button>
                </Flex>
              )}
              <Button
                fullWidth
                onClick={() => {
                  // close();
                  // signUp();
                  router.push("?action=register");
                }}
                color='#213379'
                variant="outline"
                style={{ borderRadius: 20 }}

              >
                Register Now
              </Button>
            </Flex>
          </Collapse>
        )}
      </Box>
      {children}
    </Flex>
  );
};

export default DashboardNav;
