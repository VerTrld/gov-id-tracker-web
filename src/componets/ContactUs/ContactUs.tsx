import {
  Box,
  Paper,
  Text,
  TextInput,
  Button,
  Grid,
  Group,
  Flex,
  Title,
} from "@mantine/core";
import { IconMail, IconMapPin } from "@tabler/icons-react";

export default function ContactSection() {
  return (
    <Box
      component="section"
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <Box
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <Text
          component="h2"
          style={{
            fontSize: 32,
            fontWeight: 700,
            textDecoration: "underline",
            textDecorationColor: "#1971c2",
            textDecorationThickness: 3,
          }}
        >
          Contact Us
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 10 }}>
          Have questions, suggestions, or feedback? We are happy to hear from
          you.
        </Text>
      </Box>

      <Grid justify="center">
        <Grid.Col>
          <Paper
            shadow="sm"
            radius="md"
            withBorder
            style={{
              display: "flex",
              flexDirection: "row",
              overflow: "hidden",
              width: "100%",
              maxWidth: "900px",
              height: "auto",

              // MOBILE
              "@media (max-width: 768px)": {
                flexDirection: "column",
              },
            }}
          >
            {/* LEFT / TOP (Blue) */}
            <Box
              style={{
                backgroundColor: "#1971c2",
                color: "#fff",
                flex: "1",
                padding: 40,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                minWidth: 300,
                borderRadius: "10px",
              }}
            >
              <Flex direction="column" gap={5}>
                <Title ta="start" order={3}>
                  Contact Information
                </Title>
                <Text ta="start">Send us message!</Text>
              </Flex>

              <Flex direction="column" justify="center" gap={10} mt={30}>
                <Group>
                  <IconMail />
                  <Text ta="start">idmokareramo@gmail.com</Text>
                </Group>
                <Group align="flex-start">
                  <IconMapPin />
                  <Text ta="start">
                    Created by <br />
                    Multimedia Arts and Design students
                    <br />
                    Iacademy
                  </Text>
                </Group>
              </Flex>

              {/* Decorative circles */}
              <Box
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 60,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
              />
            </Box>

            {/* RIGHT / BOTTOM (White) */}
            <Box
              style={{
                flex: "1",
                padding: 40,
                backgroundColor: "#fff",
                minWidth: 300,
              }}
            >
              <Group grow>
                <TextInput
                  label="First Name"
                  styles={{
                    input: {
                      border: "none",
                      borderBottom: "1px solid black",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                    },
                  }}
                />
                <TextInput
                  label="Last Name"
                  styles={{
                    input: {
                      border: "none",
                      borderBottom: "1px solid black",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                    },
                  }}
                />
              </Group>

              <TextInput mt="md" label="Email" />
              <TextInput
                mt="md"
                label="Message"
                placeholder="Write your message"
              />

              <Button mt="lg">Send Message</Button>
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
