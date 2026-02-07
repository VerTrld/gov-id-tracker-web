import {
  Box,
  Burger,
  Button,
  Collapse,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface IDashboardNav extends PropsWithChildren { }

const DashboardNav = ({ children }: IDashboardNav) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width: 768px)");

  const activeColor = "#043873";
  const inactiveColor = "#4F9CF9";

  const navColor = (path: string) =>
    pathname === path ? activeColor : inactiveColor;

  return (
    <Flex style={{ flexDirection: "column", zIndex: 100 }} flex={1}>
      <Box style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)" }}>
        <Flex
          justify="space-between"
          align="center"
          fz={"32px"}
          style={{ padding: isMobile ? "20px" : "20px 50px" }}
        >
          <Title
            c={"#0A58BD"}
            style={{
              lineHeight: 1.15,
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            ID Mo, Karera Mo
          </Title>

          {!isMobile ? (
            // Desktop menu
            <Flex gap={80} align={"center"}>
              <Flex gap={15} align={"center"}>
                <Button variant="subtle" onClick={() => router.push("/")}>
                  <Text c={navColor("/")}>Home</Text>
                </Button>

                <Button variant="subtle" onClick={() => router.push("/about")}>
                  <Text c={navColor("/about")}>About</Text>
                </Button>

                <Button
                  variant="subtle"
                  onClick={() => router.push("/features")}
                >
                  <Text c={navColor("/features")}>Features</Text>
                </Button>

                <Button
                  variant="subtle"
                  onClick={() => router.push("/contact")}
                >
                  <Text c={navColor("/contact")}>Contact</Text>
                </Button>
              </Flex>

              {session.data?.user?.name ? (
                <Flex gap={15}>
                  <Button onClick={() => router.push("/user")}>
                    <Text c={"#4F9CF9"}>{session.data.user.name}</Text>
                  </Button>
                  <Button onClick={() => signOut()}>Logout</Button>
                </Flex>
              ) : (
                <Flex gap={15}>
                  <Button
                    onClick={() => router.push("?action=login")}
                    bg={"#A7CEFC"}
                    radius={5}
                  >
                    <Text c={"#043873"}>Log In</Text>
                  </Button>

                  <Button
                    onClick={() => router.push("?action=register")}
                    c="#4F9CF9"
                    radius={5}
                  >
                    <Flex gap={10} align={'center'}>
                      <Text c="#FFFFFF" ta={'center'}>Sign Up</Text>
                      <IconArrowNarrowRight color="#FFFFFF" />
                    </Flex>
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
              style={{
                padding: "0 20px 20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Button
                variant="subtle"
                fullWidth
                onClick={() => {
                  close();
                  router.push("/");
                }}
              >
                <Text c={navColor("/")}>Home</Text>
              </Button>

              <Button
                variant="subtle"
                fullWidth
                onClick={() => {
                  close();
                  router.push("/about");
                }}
              >
                <Text c={navColor("/about")}>About</Text>
              </Button>

              <Button
                variant="subtle"
                fullWidth
                onClick={() => {
                  close();
                  router.push("/features");
                }}
              >
                <Text c={navColor("/features")}>Features</Text>
              </Button>

              <Button
                variant="subtle"
                fullWidth
                onClick={() => {
                  close();
                  router.push("/contact");
                }}
              >
                <Text c={navColor("/contact")}>Contact</Text>
              </Button>

              {session.data?.user?.name ? (
                <Flex>
                  <Text>{session.data.user.name}</Text>
                </Flex>
              ) : (
                <Button
                  onClick={() => router.push("?action=login")}
                  fullWidth
                  bg={"#A7CEFC"}
                  radius={5}
                >
                  <Text c={"#043873"}>Log In</Text>
                </Button>
              )}

              <Button
                fullWidth
                onClick={() => {
                  close();
                  router.push("?action=register");
                }}
                c="#4F9CF9"
                radius={5}
              >
                <Flex gap={10}>
                  <Text c="#FFFFFF">Sign Up</Text>
                  <IconArrowNarrowRight color="#FFFFFF" />
                </Flex>
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
