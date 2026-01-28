import { Box, Burger, Button, Collapse, Flex, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IDashboardNav {
  signUp: () => void;
  logIn: () => void;
}

const DashboardNav = ({ signUp, logIn }: IDashboardNav) => {
  const session = useSession();
  console.log({ session });
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.19)" }}>
      <Flex justify="space-between" align="center" style={{ padding: "20px" }}>
        <Box>Logo</Box>

        {!isMobile ? (
          // Desktop menu
          <Flex gap={15} align={"center"}>
            <Button variant="subtle">Home</Button>
            <Button variant="subtle">About</Button>
            <Button variant="subtle">Features</Button>
            <Button variant="subtle">Contact</Button>
            {session.data?.user?.name ? (
              <Flex gap={15}>
                <Button onClick={() => router.push("/user")}>
                  <Text>{session.data.user.name}</Text>
                </Button>
                <Button onClick={() => signOut()}>Logout</Button>
              </Flex>
            ) : (
              <Flex gap={15}>
                <Button onClick={logIn}>Log In</Button>
                <Button onClick={signUp}>Sign Up</Button>
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
              Home
            </Button>
            <Button variant="subtle" fullWidth onClick={close}>
              About
            </Button>
            <Button variant="subtle" fullWidth onClick={close}>
              Features
            </Button>
            <Button variant="subtle" fullWidth onClick={close}>
              Contact
            </Button>
            {session.data?.user?.name ? (
              <Flex>
                <Text>{session.data.user.name}</Text>
              </Flex>
            ) : (
              <Flex>
                <Button
                  fullWidth
                  onClick={() => {
                    close();
                    logIn();
                  }}
                >
                  Log In
                </Button>
              </Flex>
            )}
            <Button
              fullWidth
              onClick={() => {
                close();
                signUp();
              }}
            >
              Sign Up
            </Button>
          </Flex>
        </Collapse>
      )}
    </Box>
  );
};

export default DashboardNav;
